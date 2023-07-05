// Taken from the following page: https://learn.microsoft.com/en-us/azure/active-directory/develop/single-page-app-tutorial-02-prepare-spa?tabs=visual-studio-code
export const msalConfig = {
    auth: {
      clientId: "041e1a23-f172-465f-84b8-ddbac8e792b9",
      authority:
        "https://login.microsoftonline.com/480d70a5-6f67-4a15-9383-cd0130423aa6", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: window.location.hostname.includes("localhost")
        ? "http://localhost:5000/cslabs/"
        : "https://xz32.host.cs.st-andrews.ac.uk/cslabs/",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
    scopes: ["User.Read"],
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  };