import firebase, { firestore } from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDzY77UPCkh9LYcNJNw3HFYnv5roYpKP8A",
  authDomain: "finance-app-cas21.firebaseapp.com",
  projectId: "finance-app-cas21",
  storageBucket: "finance-app-cas21.appspot.com",
  messagingSenderId: "624102838911",
  appId: "1:624102838911:web:bcec26cc1636cde066a54a",
};

export default class Firebase {
  static db;

  static init() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }
    Firebase.db = firebase.firestore();
  }
}
