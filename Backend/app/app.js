require('dotenv').config();

const express = require('express');
const session = require('express-session');
const { AuthorizationCode } = require('simple-oauth2');
const axios = require('axios');
const crypto = require('crypto');

const app = express();

app.use(session({
  secret: 'your_secret_here',
  resave: false,
  saveUninitialized: true
}));


const config = {
  client: {
    id: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET
  },
  auth: {
    tokenHost: process.env.TOKEN_HOST
  }
};

const client = new AuthorizationCode(config);



app.get('/login', (req, res) => {
  const state = crypto.randomBytes(20).toString('hex');
  req.session.oauthState = state;

  const authorizationUri = client.authorizeURL({
    redirect_uri: process.env.REDIRECT_URI,
    scope: 'openid profile email',
    state: state,
    response_type: 'code'
  });

  res.redirect(authorizationUri);
});


app.get('/callback', async (req, res) => {
  const { code, state } = req.query;


  if (state !== req.session.oauthState) {
    return res.status(400).send('Invalid state parameter');
  }
  
  const tokenParams = {
    code: code,
    redirect_uri: process.env.REDIRECT_URI,
    scope: 'openid profile email'
  };

  try {
    const accessToken = await client.getToken(tokenParams);

    req.session.accessToken = accessToken.token.access_token;
    req.session.refreshToken = accessToken.token.refresh_token;

    res.redirect('/user');
  } catch (error) {
    console.log('Access Token Error', error.message);
    res.send('Error retrieving access token');
  }
});


app.get('/user', async (req, res) => {
  if (!req.session.accessToken) {
    return res.redirect('/login');
  }

  const userEndpoint = `${process.env.TOKEN_HOST}/user`;

  try {
    const response = await axios.get(userEndpoint, {
      headers: {
        Authorization: `Bearer ${req.session.accessToken}`
      }
    });
    res.send(response.data);
  } catch (err) {
    res.send('Error retrieving user info');
  }
});

app.listen(5000, () => {
  console.log('Client app listening on http://localhost:5000');
});
