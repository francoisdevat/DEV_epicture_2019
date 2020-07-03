import { authorize } from 'react-native-app-auth';

export async function getAlbumImages(loginfo, albumId) {
  return fetch("https://api.imgur.com/3/album/" + albumId + "/images", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + loginfo.accessToken
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.data;
  })
  .catch((error) => {
    console.error(error);
  });
}

export async function getImage(loginfo, imageHash) {
  return fetch("https://api.imgur.com/3/image/" + imageHash, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + loginfo.accessToken
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.data;
  })
  .catch((error) => {
    console.error(error);
  });
}

export async function getUserImages(loginfo) {
  return fetch("https://api.imgur.com/3/account/me/images", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + loginfo.accessToken
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.data;
  })
  .catch((error) => {
    console.error(error);
  });
}

export async function getUserAlbums(loginfo) {
  return fetch("https://api.imgur.com/3/account/me/albums", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + loginfo.accessToken
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson.data);
    return responseJson.data;
  })
  .catch((error) => {
    console.error(error);
  });
}

export async function login() {
  const config = {
    clientId: "32488b63ec99316",
    clientSecret: "28021c0320872dcfcb1d4140a5ee19471b148510",
    serviceConfiguration: {
      authorizationEndpoint: "https://api.imgur.com/oauth2/authorize",
      tokenEndpoint: "https://api.imgur.com/oauth2/token"
    },
    redirectUrl: "com.epitcture://imgur/oauth"
  }
  let retval = {
    accessToken: "",
    accessTokenExpirationDate: "",
    accountUsername: "",
    error: "",
    refreshToken: ""
  }
  try {
    const result = await authorize(config);
    console.log(result);
    retval.accessToken = result.accessToken;
    retval.accessTokenExpirationDate = result.accessTokenExpirationDate;
    retval.accountUsername = result.tokenAdditionalParameters.accountUsername;
    retval.refreshToken = result.refreshToken;
  } catch (error) {
    console.log(error);
    retval.error = error;
  }
  return retval;
}
