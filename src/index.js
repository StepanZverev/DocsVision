import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase'


var firebaseConfig = {
  apiKey: "AIzaSyD6DnGbVfdJlDJ_pEOUfDfTDJrA8j3lIs8",
  authDomain: "dv-inventory.firebaseapp.com",
  databaseURL: "https://dv-inventory.firebaseio.com",
  projectId: "dv-inventory",
  storageBucket: "dv-inventory.appspot.com",
  messagingSenderId: "130062240176",
  appId: "1:130062240176:web:ecbca5d29b37d25c6cee75"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);	


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
