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
  }

  syncState = () => {
    let components = this.components;
    this.collection
      .where("status", "==", "verified")
      .onSnapshot(function(querySnapshot) {
        let data = [];
        querySnapshot.forEach(doc => data.push(doc.data()));
        components.forEach(component => component(data));
      });
  };

  syncSubscribe = component => this.components.push(component);

  unsubscribe = component => {
    this.components = this.components.filter(item => component !== item);
  };

  fetch_verified_only = () => this.collection.where("status", "==", "verified");
}

export const incidents = new IncidentsDB();
