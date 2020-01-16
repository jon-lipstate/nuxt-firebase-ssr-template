//commentary on reducing global scope (Tyris)
//https://stackoverflow.com/questions/42726870/firebase-cloud-functions-is-very-slow

//https://github.com/firebase/functions-samples

const ssrModule = require('./ssr');
const setRoleModule = require('./setRole');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.ssr = functions.https.onRequest(ssrModule.handler);
exports.setRole = functions.https.onCall(setRoleModule.handler);

admin.initializeApp();
