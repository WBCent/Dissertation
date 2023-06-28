// Taken from Xu's Staff side; its a function that get the access token which should be called each time we do an API request:
import { loginRequest } from "./authConfig";
import { useMsal } from "@azure/msal-react";

const { instance, accounts } = useMsal();

const getAccessToken = useCallback(async () => {
  const request = {
    ...loginRequest,
    account: accounts[0],
  };

  try {
    return await instance.acquireTokenSilent(request);
  } catch (error) {
    return await instance.acquireTokenRedirect(request);
  }
}, [instance, accounts]);

export default getAccessToken;
