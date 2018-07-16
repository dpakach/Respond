import firebase from "firebase";
import config from "./config";

firebase.initializeApp(config);

export class Database {
  db = null;
  constructor(name) {
    this.db = firebase.firestore();
    this.collection = this.db.collection(name);
    this.name = name;
  }

  create = object =>
    this.collection
      .add(object)
      .then(docRef => console.log(`Document written with ID: ${docRef.id}`))
      .catch(error => console.error(`Error adding document: ${error}`));

  fetch_all = () => this.collection.get();
}

export class IncidentsDB extends Database {
  constructor() {
    super("incidents");
  }
  fetch_verified_only = () => this.collection.where("status", "==", "verified");
}
