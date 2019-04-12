import {
  AuthenticationContext,
  adalFetch,
  withAdalLogin
} from "react-adal";

export const adalConfig = {
  tenant: "72f988bf-86f1-41af-91ab-2d7cd011db47",
  clientId: "4595abb4-08dc-4115-ab0a-46965d334a57",
  endpoints: {
    api: 'https://microsoft.onmicrosoft.com/bf9bd303-6141-4d3b-92f5-652600d47043'
    // api: '4595abb4-08dc-4115-ab0a-46965d334a57'
  },
  cacheLocation: "localStorage"
};

export const authContext = new AuthenticationContext(adalConfig);

export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(
  authContext,
  adalConfig.endpoints.api
);
