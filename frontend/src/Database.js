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

class MessageDB extends Database {
  components = [];
  id_array = [];
  constructor() {
    super("messages");
    this.syncState();
  }
  syncState = () => {
    let a = this;
    let components = this.components;
    this.collection
      .orderBy("created_at")

      // TODO: fix messages by users

      .onSnapshot(querySnapshot => {
        let data = [];
        querySnapshot.forEach(doc => data.push({ ...doc.data() }));
        let d = [];

        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          if (this.id_array[i] === item.id) {
            d.push(item);
          }
        }

        components.forEach((component, index) => component(d));
      });
  };

  syncSubscribe = (component, id) => {
    this.components.push(component);
    this.id_array.push(id);
  };

  unsubscribe = component => {
    this.components = this.components.filter(item => component !== item);
  };

  fetch_by_id = id =>
    this.collection.where("id", "==", id).where("private", "==", false);

  fetch_private_by_id = id =>
    this.collection.where("id", "==", id).where("private", "==", true);
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
        querySnapshot.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
        components.forEach(component => component(data));
      });
  };

  fetch_by_id = id => {
    return this.collection.doc(id).get();
  };

  syncSubscribe = component => this.components.push(component);

  unsubscribe = component => {
    this.components = this.components.filter(item => component !== item);
  };

  fetch_verified_only = () => this.collection.where("status", "==", "verified");
  
  fetch_unverified_only = () => this.collection;
}

export const incidents = new IncidentsDB();
export const messages = new MessageDB();
