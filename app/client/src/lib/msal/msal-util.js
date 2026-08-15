import { PublicClientApplication, EventType, InteractionRequiredAuthError } from '@azure/msal-browser';
import { msalConfig } from './authConfig';

export const createMSALInstance = () => {
  const msalInstance = new PublicClientApplication(msalConfig);
  // Default to using the first account if no account is active on page load
  if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  // Listen for sign-in event and set active account
  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      const account = event.payload.account;
      msalInstance.setActiveAccount(account);
    }
  });

  // Listen for sign-in event and set active account
  msalInstance.addEventCallback(async (event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      const account = event.payload.account;
      msalInstance.setActiveAccount(account);
    }
  });

  return msalInstance;
}

export const acquireAccessToken = async (msalInstance, account) => {
  const accessTokenRequest = {
    scopes: ['6ad4a7f8-9383-461e-bf00-9155de40b24d/.default'],
    account: account,
  };

  if (!accessTokenRequest.account) {
    console.log('can not retrieve access token, no active account set for msalInstance');
    return null;
  }

  try {
    if (!msalInstance.initialized) {

      await msalInstance.initialize();
      console.log('msalInstance initialized');
    }

    const accessTokenResponse = await msalInstance.acquireTokenSilent(accessTokenRequest);
    return accessTokenResponse.accessToken;
  }
  catch (err) {
    if (err instanceof InteractionRequiredAuthError) {
      const accessTokenResponse = await msalInstance.acquireTokenPopup(accessTokenRequest);
      return accessTokenResponse.accessToken;
    }
    else {
      throw err;
    }
  }
}
