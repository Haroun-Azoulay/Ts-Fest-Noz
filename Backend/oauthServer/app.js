const csrf = require("csurf");
require("dotenv").config();
const cookieParser = require("cookie-parser");
var express = require("express"),
  bodyParser = require("body-parser"),
  OAuth2Server = require("oauth2-server"),
  Request = OAuth2Server.Request,
  Response = OAuth2Server.Response;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let csrfProtection = csrf({ cookie: true });
let parseForm = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");

app.use(cookieParser());

app.oauth = new OAuth2Server({
  model: require("./model.js"),
  accessTokenLifetime: 60 * 60,
  allowBearerTokensInQueryString: true,
});

app.get("/form", csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  res.render("login", { csrfToken: req.csrfToken() });
});

app.post("/process", parseForm, csrfProtection, function (req, res) {
  res.send("Successfully Validated!!");
});

app.all("/oauth/token", obtainToken);

app.get("/", authenticateRequest, function (req, res) {
  res.send("Congratulations, you are in a secret area!");
});

function obtainToken(req, res) {
  req.body.client_id = process.env.CLIENT_ID;
  req.body.client_secret = process.env.CLIENT_SECRET;

  var request = new Request({
    headers: req.headers,
    method: req.method,
    query: req.query,
    body: req.body,
  });
  var response = new Response(res);

  return app.oauth
    .token(request, response)
    .then(function (token) {
      res.json(token);
    })
    .catch(function (err) {
      res.status(err.code || 500).json(err);
    });
}

function authenticateRequest(req, res, next) {
  var request = new Request(req);
  var response = new Response(res);

  return app.oauth
    .authenticate(request, response)
    .then(function (token) {
      next();
    })
    .catch(function (err) {
      res.status(err.code || 500).json(err);
    });
}

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
