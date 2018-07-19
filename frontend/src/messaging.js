import firebase from "firebase";

const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "BLAFdc10AYuiiEFrJEhHZPGnoDFGHfhwGqdd_17A-R9lL2Nn_o0LM3Tyl9ppfpbWVInAJA6TrpT0xV_ox_oaXDY"
);

messaging.onTokenRefresh(function() {
  messaging
    .getToken()
    .then(function(refreshedToken) {
      console.log("Token refreshed.");
      setTokenSentToServer(false);
      sendTokenToServer(refreshedToken);
      resetUI();
    })
    .catch(function(err) {
      console.log("Unable to retrieve refreshed token.", err);
    });
});

export default messaging;

messaging.onMessage(function(payload) {
  console.log("Message received.", payload);
});

export function resetUI() {
  messaging
    .getToken()
    .then(function(currentToken) {
      if (currentToken) {
        sendTokenToServer(currentToken);
      } else {
        console.log(
          "No instance id token available. Request permission to generate one."
        );
        setTokenSentToServer(false);
      }
    })
    .catch(function(err) {
      console.log("An error occurred while retreiving token", err);
      setTokenSentToServer(false);
    });
}

export function sendTokenToServer(currentToken) {
  if (!isTokenSentToServer()) {
    console.log("Sending token to server");
    setTokenSentToServer(true);
  } else {
    console.log(
      "Token already sent to server so wont send it again unless it changes."
    );
  }
}

export function isTokenSentToServer() {
  return window.localStorage.getItem("sentToServer") === "1";
}

export function setTokenSentToServer(sent) {
  window.localStorage.setItem("sentToServer", sent ? "1" : "0");
}

export function deleteToken() {
  messaging.getToken().then(function(currentToken) {
    messaging
      .deleteToken(currentToken)
      .then(function() {
        console.log("Token deleted.");
        setTokenSentToServer(false);
        resetUI();
      })
      .catch(function(err) {
        console.log("Error retrieving Instance ID token", err);
      });
  });
}

export const requestPermissionForNotification = () =>
  messaging
    .requestPermission()
    .then(function() {
      console.log("Notification permission granted.");
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
      resetUI();
    })
    .catch(function(err) {
      console.log("Unable to get permission to notify.", err);
    });

export const getTokenFromUser = () => {
  messaging
    .getToken()
    .then(function(currentToken) {
      if (currentToken) {
        sendTokenToServer(currentToken);
      } else {
        // Show permission request.
        console.log(
          "No Instance ID token available. Request permission to generate one."
        );
        // Show permission UI.
        // updateUIForPushPermissionRequired();
        setTokenSentToServer(false);
      }
    })
    .catch(function(err) {
      console.log("An error occurred while retrieving token. ", err);
      setTokenSentToServer(false);
    });
};

requestPermissionForNotification();
