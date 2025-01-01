/**
 * Configuration.
 */

require("dotenv").config();

var config = {
  clients: [
    {
      id: process.env.CLIENT_ID, // TODO: Needed by refresh_token grant
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      grants: ["password", "refresh_token"],
      redirectUris: [],
    },
  ],
  confidentialClients: [
    {
      clientId: process.env.CLIENT_ID_CONFIDENTIAL,
      clientSecret: process.env.CLIENT_SECRET_CONFIDENTIAL,
      grants: ["password", "client_credentials"],
      redirectUris: [],
    },
  ],
  tokens: [],
  users: [
    {
      username: "guard",
      password: "password",
    },
  ],
};

/**
 * Dump the memory storage content (for debug).
 */

var dump = function () {
  console.log("clients", config.clients);
  console.log("confidentialClients", config.confidentialClients);
  console.log("tokens", config.tokens);
  console.log("users", config.users);
};

dump;
/*
 * Methods used by all grant types.
 */

var getAccessToken = function (token) {
  var tokens = config.tokens.filter(function (savedToken) {
    return savedToken.accessToken === token;
  });

  return tokens[0];
};

var getClient = function (clientId, clientSecret) {
  var clients = config.clients.filter(function (client) {
    return client.clientId === clientId && client.clientSecret === clientSecret;
  });

  var confidentialClients = config.confidentialClients.filter(
    function (client) {
      return (
        client.clientId === clientId && client.clientSecret === clientSecret
      );
    },
  );

  return clients[0] || confidentialClients[0];
};

var saveToken = function (token, client, user) {
  token.client = {
    id: client.clientId,
  };

  token.user = {
    username: user.username,
    state: user.state, // Ajout du state ici
  };

  config.tokens.push(token);

  dump(); // Affiche les tokens actuels dans la console

  return token;
};

/*
 * Method used only by password grant type.
 */

var getUser = function (username, password) {
  var users = config.users.filter(function (user) {
    return user.username === username && user.password === password;
  });

  return users[0];
};

/*
 * Method used only by client_credentials grant type.
 */

var getUserFromClient = function (client) {
  var clients = config.confidentialClients.filter(function (savedClient) {
    return (
      savedClient.clientId === client.clientId &&
      savedClient.clientSecret === client.clientSecret
    );
  });

  return clients.length;
};

/*
 * Methods used only by refresh_token grant type.
 */

var getRefreshToken = function (refreshToken) {
  var tokens = config.tokens.filter(function (savedToken) {
    return savedToken.refreshToken === refreshToken;
  });

  if (!tokens.length) {
    return;
  }

  return tokens[0];
};

var revokeToken = function (token) {
  config.tokens = config.tokens.filter(function (savedToken) {
    return savedToken.refreshToken !== token.refreshToken;
  });

  var revokedTokensFound = config.tokens.filter(function (savedToken) {
    return savedToken.refreshToken === token.refreshToken;
  });

  return !revokedTokensFound.length;
};

/**
 * Export model definition object.
 */

module.exports = {
  getAccessToken: getAccessToken,
  getClient: getClient,
  saveToken: saveToken,
  getUser: getUser,
  getUserFromClient: getUserFromClient,
  getRefreshToken: getRefreshToken,
  revokeToken: revokeToken,
};
