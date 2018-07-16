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

class IncidentsDB extends Database {
  components = [];
  constructor() {
    super("incidents");
    this.syncState();
    this.components = [];
  }
  syncState = () => {
    this.collection.where("status", "==", "verified").onSnapshot(function(doc) {
      let source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      this.components && this.components.map(item => item(doc.data()));
    });
  };

  syncSubscribe = component => this.components.push(component);

  fetch_verified_only = () => this.collection.where("status", "==", "verified");
}

export const incidents = new IncidentsDB();
