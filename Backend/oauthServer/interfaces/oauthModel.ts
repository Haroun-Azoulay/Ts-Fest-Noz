import {
  AuthorizationCodeModel,
  ClientCredentialsModel,
  RefreshTokenModel,
  PasswordModel,
  ExtensionModel,
} from "oauth2-server";

export interface OAuthModel
  extends AuthorizationCodeModel,
    ClientCredentialsModel,
    RefreshTokenModel,
    PasswordModel,
    ExtensionModel {}
