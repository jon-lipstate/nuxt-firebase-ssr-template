import Vue from 'vue';
//import { firestorePlugin } from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/functions';

var firebaseConfig = {
  apiKey: 'AIzaSyCzi4_8s_7e_-wKG5OdAzuNZLHh90OGT88',
  authDomain: 'ssr-test-afbfd.firebaseapp.com',
  databaseURL: 'https://ssr-test-afbfd.firebaseio.com',
  projectId: 'ssr-test-afbfd',
  storageBucket: 'ssr-test-afbfd.appspot.com',
  messagingSenderId: '1097127418472',
  appId: '1:1097127418472:web:140f306c2fbe3ff60539dd'
};
export let app = null;
app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig);

// Get a Firestore instance
export const db = app.firestore();
export const auth = app.auth();
export const functions = app.functions();
export const storage = app.storage();
