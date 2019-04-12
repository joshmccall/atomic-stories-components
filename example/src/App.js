import React, { Component } from "react";
import { authContext, adalApiFetch } from "./adalConfig";
import ExampleComponent from "atomic-stories-components";
import axios from "axios";
// import { fetch } from "fetch";

export default class App extends Component {
  render() {
    console.log({ authContext });
    return (
      <div>
        <ExampleComponent text="Modern React component module" />
        <div
          onClick={() => {
            const options = {
              method: "GET", // *GET, POST, PUT, DELETE, etc.
              // mode: "no-cors", // no-cors, cors, *same-origin
              // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              // credentials: "include", // include, *same-origin, omit
              headers: {
                "Content-Type": "application/json" // "Content-Type": "application/x-www-form-urlencoded",
                // Authorization: `Bearer ${"token"}`
              },
              url:
                "https://cors-anywhere.herokuapp.com/fyc-dev.azurewebsites.net/api/search/users/josh"
            };
            adalApiFetch(
              axios,
              "https://cors-anywhere.herokuapp.com/fyc-dev.azurewebsites.net/api/search/users/josh",
              // "https://fyc-dev.azurewebsites.net/api/search/users/josh",
              options
            )
              //   .then(function(response) {
              //     console.log(response);
              //   })
              //   .catch(function(error) {
              //     console.log(error);
              //   });
              // axios
              //   .get(
              //     "https://cors-anywhere.herokuapp.com/fyc-dev.azurewebsites.net/api/search/users/josh",
              //     // "https://fyc-dev.azurewebsites.net/api/search/users/j",
              //     options
              //   )
              // async populateWeatherData() {
              //   const token = await authService.getAccessToken(); const response =
              //     await
              //   fetch(
              //     'api/SampleData/WeatherForecasts',
              //     { headers: !token ? {} : { 'Authorization': `Bearer ${token}` } }
              //   )
              // }

              // fetch(
              //   "https://fyc-dev.azurewebsites.net/api/search/users/josh",
              //   options
              // )
              .then(function(response) {
                console.log(response);
              })
              .catch(function(error) {
                console.log(error);
              });
            console.log("click div");
          }}
        >
          Click me!!
        </div>
      </div>
    );
  }
}
