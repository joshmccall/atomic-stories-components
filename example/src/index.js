import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
const App: React.FunctionComponent = () => {
  const azureAdSettings: IAzureAdSettings = {
    clientId: "54dce033-442e-4b62-b3ca-1556f3a4b058",
    scopes: ["User.Read"]
  };

  const telemetryClient: ITelemetryClient = new TelemetryClient();
  const httpClient: IHttpClient = new HttpClient(telemetryClient);

  return (
    <Auth azureAdSettings={azureAdSettings}>
      {(authContext: IAuthContext) => (
        <Shell
          dependencies={{
            authContext,
            telemetryClient,
            httpClient
          }}
        >
          <Header />
          <SideNav />
          <Content>
            <Hello />
          </Content>
        </Shell>
      )}
    </Auth>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
