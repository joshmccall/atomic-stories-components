import React, { Component } from "react";
import { authContext, adalApiFetch } from "./adalConfig";
import { adalGetToken } from "react-adal";
import ExampleComponent from "atomic-stories-components";
import axios from "axios";
// import { fetch } from "fetch";

export default class App extends Component {
  render() {
    console.log({
      authContext
    });
    return (
      <div>
        <ExampleComponent text="Modern React component module" />
        <div
          onClick={() => {
            const options = {
              method: "GET", // *GET, POST, PUT, DELETE, etc.
              // mode: "no-cors", // no-cors, cors, *same-origin
              // credentials: "include", // include, *same-origin, omit
              headers: {
                "Content-Type": "application/json" // "Content-Type": "application/x-www-form-urlencoded",
                // "Access-Control-Allow-Origin": "*",
                // Host: "fyc-dev.azurewebsites.net"
                // Origin: ""
              }

              // url: "https://fyc-dev.azurewebsites.net/api/search/users/josh"
            };
            adalApiFetch(
              axios,
              // "https://cors-anywhere.herokuapp.com/fyc-dev.azurewebsites.net/api/search/users/josh",
              "https://fyc-dev.azurewebsites.net/api/search/users/josh",
              options
            )
              .then(function(response) {
                console.log(response);
              })
              .catch(function(error) {
                console.log(error);
              });

            const url =
              "https://fyc-dev.azurewebsites.net/api/search/users/josh";

            // "https://cors-anywhere.herokuapp.com/https://fyc-dev.azurewebsites.net/api/search/users/josh";
            // const resourceGuiId = "748957cb-2ecf-48ee-a937-2303a37d20ab";
            // // const resourceGuiId = "bf9bd303-6141-4d3b-92f5-652600d47043";
            // adalGetToken(authContext, resourceGuiId)
            //   .then(token => {
            //     const o = options || {};
            //     if (!o.headers) o.headers = {};
            //     o.headers.authorization = `Bearer ${token}`;
            //     // o.headers.authorization = `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkhCeGw5bUFlNmd4YXZDa2NvT1UyVEhzRE5hMCIsImtpZCI6IkhCeGw5bUFlNmd4YXZDa2NvT1UyVEhzRE5hMCJ9.eyJhdWQiOiIzMmQ1NjllMy1hZTI4LTRkYzctOWEzZC0yNTQ1MzMxMzAwMjQiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwiaWF0IjoxNTU1MzU2MTQzLCJuYmYiOjE1NTUzNTYxNDMsImV4cCI6MTU1NTM2MDA0MywiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhMQUFBQURjVUs3RVdaWmRlRmRzTWZrMmFTdncxUUhtcWd6SkY1SCtQdWoxOTZJQW1zSERjVThPS3BXdEh0bU9EVm9CSTNMZkVIamIxSDBNc3pFMVBVVzVDWi9kZ1NlWmhUMDlpZXM0OUd2aS9VWEhrPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwaWQiOiI0NTk1YWJiNC0wOGRjLTQxMTUtYWIwYS00Njk2NWQzMzRhNTciLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6Ik1jQ2FsbCIsImdpdmVuX25hbWUiOiJKb3NoIiwiaW5fY29ycCI6InRydWUiLCJpcGFkZHIiOiIxNjcuMjIwLjk4LjIyIiwibmFtZSI6Ikpvc2ggTWNDYWxsIiwib2lkIjoiOTZlNzQxZTgtMTdmYS00ODA4LWI1MGItZDNmYzZmYmJkYWJlIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTIxMjc1MjExODQtMTYwNDAxMjkyMC0xODg3OTI3NTI3LTMyMjk1MjkzIiwic2NwIjoiUGVvcGxlLlJlYWQuQWxsIiwic3ViIjoiM2loZDhReEpfR3VmTU5PT3ZUZ1A0a3VxdFJ5a0VBVldEbVViR0xMQzdNOCIsInRpZCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsInVuaXF1ZV9uYW1lIjoiam9tY2NhbEBtaWNyb3NvZnQuY29tIiwidXBuIjoiam9tY2NhbEBtaWNyb3NvZnQuY29tIiwidXRpIjoiM2F6YkFMREpYRUdlZ3ZiNHFobG1BQSIsInZlciI6IjEuMCJ9.KLt6_hq3tbCtVBJIUs4fwgKHB7js5d9CL2dEZeFt0LVpjyF841EwIo1pLbjKKKFOpVvsWbiD8AX_h9gY8zug9n0zJcWpXgn5pl4B5k3Gn5maoqDGxAn5hwF78HKvs8aube5hT0L2d9Pg3-vUtj7iFxMSCq16pjjoACJEZJNYL9OI-hd7Jvr5Q4gxXY0UqbtLA5TM8Mpb6Tafqzuo387eKxfjd0foVQE-m4XpyDxoR40nmu1HLqUHKRFNvYbuUp67OoWz4t4fqOmSaw_YEazQslQrbuSWVtxaA7gC-I0GT6aEN6KGO0GxmyCfA_dt-Jn3AmX1pBGitIWlV0cnzGJ6iQ"}`;
            //     console.log("fetch", { url, o, token });
            //     return axios(url, o);
            //   })
            //   .then(function(response) {
            //     console.log(response);
            //   })
            //   .catch(function(error) {
            //     console.log(error);
            //   });

            // const options = {
            //   method: "GET", // *GET, POST, PUT, DELETE, etc.
            //   // mode: "no-cors", // no-cors, cors, *same-origin
            //   // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            //   // credentials: "include", // include, *same-origin, omit
            //   headers: {
            //     "Content-Type": "application/json" // "Content-Type": "application/x-www-form-urlencoded",
            //     // Authorization: `Bearer ${"token"}`
            //   },
            //   url:
            //     "https://cors-anywhere.herokuapp.com/fyc-dev.azurewebsites.net/api/search/users/josh"
            // };
            // adalApiFetch(
            //   axios,
            //   // "https://cors-anywhere.herokuapp.com/fyc-dev.azurewebsites.net/api/search/users/josh",
            //   "https://fyc-dev.azurewebsites.net/api/search/users/josh",
            //   options
            // )
            //   //   .then(function(response) {
            //   //     console.log(response);
            //   //   })
            //   //   .catch(function(error) {
            //   //     console.log(error);
            //   //   });
            //   // axios
            //   //   .get(
            //   //     "https://cors-anywhere.herokuapp.com/fyc-dev.azurewebsites.net/api/search/users/josh",
            //   //     // "https://fyc-dev.azurewebsites.net/api/search/users/j",
            //   //     options
            //   //   )
            //   // async populateWeatherData() {
            //   //   const token = await authService.getAccessToken(); const response =
            //   //     await
            //   //   fetch(
            //   //     'api/SampleData/WeatherForecasts',
            //   //     { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }
            //   //   )
            //   // }

            //   // fetch(
            //   //   "https://fyc-dev.azurewebsites.net/api/search/users/josh",
            //   //   options
            //   // )
            //   .then(function(response) {
            //     console.log(response);
            //   })
            //   .catch(function(error) {
            //     console.log(error);
            //   });
            console.log("click div");
          }}
        >
          Click me!!
        </div>{" "}
      </div>
    );
  }
}
