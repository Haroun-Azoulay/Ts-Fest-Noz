import csrf from "csurf";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import OAuth2Server, {
  Request as OAuthRequest,
  Response as OAuthResponse,
} from "oauth2-server";
import logger from "node-color-log";
const oauthModel = require("./model").default;

dotenv.config();

const app = express();

app.use(cors());

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// CSRF protection
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

// View engine setup
app.set("view engine", "ejs");

// OAuth2 server setup
const oauth = new OAuth2Server({
  model: oauthModel,
  accessTokenLifetime: 60 * 60,
  allowBearerTokensInQueryString: true,
});

app.oauth = oauth;

app.get("/form", csrfProtection, (req: Request, res: Response) => {
  res.render("login", { csrfToken: req.csrfToken() });
});

app.post(
  "/process",
  parseForm,
  csrfProtection,
  (req: Request, res: Response) => {
    res.send("Successfully Validated!!");
  },
);

import { Token } from "oauth2-server";

let storedAccessToken: string | null = null;

app.all("/oauth/token", async (req: Request, res: Response) => {
  try {
    const token: Token = await obtainToken(req, res);

    if (token && token.accessToken) {
      storedAccessToken = token.accessToken;
      res.redirect(`http://localhost:5173/event/token/${token.accessToken}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

async function obtainToken(req: Request, res: Response): Promise<Token> {
  req.body.client_id = process.env.CLIENT_ID || "";
  req.body.client_secret = process.env.CLIENT_SECRET || "";

  const request = new OAuthRequest({
    headers: req.headers,
    method: req.method,
    query: req.query,
    body: req.body,
  });

  const response = new OAuthResponse(res);

  try {
    const token: Token = await app.oauth.token(request, response);
    return token;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

app.get("/", authenticateRequest, (req: Request, res: Response) => {
  res.send("Congratulations, you are in a secret area!");
});

function authenticateRequest(req: Request, res: Response, next: NextFunction) {
  const request = new OAuthRequest({
    headers: req.headers,
    method: req.method,
    query: req.query,
    body: req.body,
  });

  const response = new OAuthResponse(res);

  return app.oauth
    .authenticate(request, response)
    .then((token) => {
      next();
    })
    .catch((err) => {
      res.status(err.code || 500).json(err);
    });
}

const PORT = 3001;
app.listen(PORT, () => {
  logger.success(
    `[server]: Server OAUTH2 is running on http://localhost:${PORT}`,
  );
});
