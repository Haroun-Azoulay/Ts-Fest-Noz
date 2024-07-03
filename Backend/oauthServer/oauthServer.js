const express = require('express'); 
const bodyParser = require('body-parser');
const OAuth2Server = require('oauth2-server');

const app = express(); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
console.log("ok let's go")

const oauth = new OAuth2Server({
  model: require('./model'), 
  grants: ['authorization_code', 'password', 'client_credentials'],
  accessTokenLifetime: 3600,
  allowBearerTokensInQueryString: true
});


app.use((req, res, next) => {
  req.oauth = oauth;
  next();
});


app.all('/oauth/token', (req, res, next) => {
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);

  return oauth.token(request, response)
    .then((token) => {
      res.json(token); 
    }).catch((err) => {
      res.status(err.code || 500).json(err);
    });
});


app.get('/oauth/authorize', (req, res) => {
  const clientId = req.query.client_id;
  const redirectUri = req.query.redirect_uri;
  const state = req.query.state;
  const responseType = req.query.response_type;
  if (!clientId || !redirectUri || !state || !responseType) {
    return res.status(400).json({ error: 'Missing client_id, redirect_uri, state, or response_type' });
  }

  res.send(`
    <form method="post" action="/oauth/authorize">
      <input type="hidden" name="client_id" value="${clientId}">
      <input type="hidden" name="redirect_uri" value="${redirectUri}">
      <input type="hidden" name="state" value="${state}">
      <input type="hidden" name="response_type" value="${responseType}">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username">
      <label for="password">Password:</label>
      <input type="password" id="password" name="password">
      <button type="submit">Authorize</button>
    </form>
  `);
});


app.post('/oauth/authorize', (req, res) => {
  const { client_id, redirect_uri, username, password, state, response_type } = req.body;


  if (username !== 'user' || password !== 'pass') {
    return res.status(401).send('Invalid credentials'); 
  }

  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);

  return oauth.authorize(request, response, { authenticateHandler: { handle: () => ({ id: username }) } })
    .then((authorizationCode) => {
      res.redirect(`http://localhost:5173/event/token/3AGZEYG&1386SFAFTFDA`);
    }).catch((err) => {
      res.status(err.code || 500).json(err);
    });
});


app.get('/user', (req, res) => {
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);

  return oauth.authenticate(request, response).then((token) => {
    res.json({
      id: '123',
      name: 'John Doe',
      email: 'john.doe@example.com'
    }); 
  }).catch((err) => {
    res.status(err.code || 500).json(err);
  });
});


app.listen(4000, () => {
  console.log('OAuth2 server listening on http://localhost:4000');
});
