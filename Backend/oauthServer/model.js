module.exports = {
  getClient: function (clientId, clientSecret, callback) {
    const client = {
      clientId: 'your_client_id_here',
      clientSecret: 'your_client_secret_here',
      grants: ['authorization_code', 'password', 'client_credentials'],
      redirectUris: ['http://localhost:4001/callback']
    };
    callback(null, client);
  },
  saveToken: function (token, client, user, callback) {
    const accessToken = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      client: client,
      user: user
    };
    callback(null, accessToken);
  },
  getAccessToken: function (accessToken, callback) {
    const token = {
      accessToken: accessToken,
      accessTokenExpiresAt: new Date(new Date().getTime() + 3600 * 1000),
      client: { id: 'your_client_id_here' },
      user: { id: '123' }
    };
    callback(null, token);
  },
  getAuthorizationCode: function (authorizationCode, callback) {
    const authCode = {
      code: authorizationCode,
      expiresAt: new Date(new Date().getTime() + 60000),
      client: { id: 'your_client_id_here' },
      user: { id: '123' }
    };
    callback(null, authCode);
  },
  saveAuthorizationCode: function (code, client, user, callback) {
    const authCode = {
      authorizationCode: code.authorizationCode,
      expiresAt: code.expiresAt,
      client: client,
      user: user,
      redirectUri: code.redirectUri
    };
    callback(null, authCode);
  },
  revokeAuthorizationCode: function (code, callback) {
    callback(null, true);
  },
  verifyScope: function (token, scope, callback) {
    callback(null, true);
  },
  getUser: function (username, password, callback) {
    const user = {
      id: '123',
      username: username
    };
    callback(null, user);
  }
};
