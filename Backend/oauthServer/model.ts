import dotenv from "dotenv";

dotenv.config();

const config = {
  clients: [
    {
      clientId: process.env.CLIENT_ID || "defaultClientId",
      clientSecret: process.env.CLIENT_SECRET || "defaultClientSecret",
      grants: ["password", "refresh_token", "client_credentials"],
      redirectUris: [],
    },
  ],
  users: [
    {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
  ],
  tokens: [] as any[],
};

export const oauthModel: OAuthModel = {
  async getAccessToken(accessToken: string) {
    const token = config.tokens.find((t) => t.accessToken === accessToken);
    if (!token) return null;

    return {
      accessToken: token.accessToken,
      client: token.client,
      user: token.user,
      accessTokenExpiresAt: new Date(Date.now() + 3600 * 1000),
    };
  },

  async getClient(clientId: string, clientSecret: string) {
    return (
      config.clients.find(
        (client) =>
          client.clientId === clientId && client.clientSecret === clientSecret,
      ) || null
    );
  },

  async saveToken(token, client, user) {
    const savedToken = { ...token, client, user };
    config.tokens.push(savedToken);
    return savedToken;
  },

  async getUser(username: string, password: string) {
    return (
      config.users.find(
        (user) => user.username === username && user.password === password,
      ) || null
    );
  },

  async getRefreshToken(refreshToken: string) {
    const token = config.tokens.find((t) => t.refreshToken === refreshToken);
    return token || null;
  },

  async revokeToken(token) {
    const initialLength = config.tokens.length;
    config.tokens = config.tokens.filter(
      (t) => t.refreshToken !== token.refreshToken,
    );
    return config.tokens.length < initialLength;
  },

  async verifyScope(token, scope: string) {
    // Example: return true for all scopes
    return true;
  },
};

export interface OAuthModel {
  getAccessToken: (accessToken: string) => Promise<any>;
  getClient: (clientId: string, clientSecret: string) => Promise<any>;
  saveToken: (token: any, client: any, user: any) => Promise<any>;
  getUser: (username: string, password: string) => Promise<any>;
  getRefreshToken?: (
    refreshToken: string,
    callback?: (err: any, token?: any) => void,
  ) => Promise<any>;
  revokeToken?: (token: any) => Promise<boolean>;
  verifyScope?: (token: any, scope: string) => Promise<boolean>;
}

export default oauthModel;
