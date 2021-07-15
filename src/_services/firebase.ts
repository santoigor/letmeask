import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDTbrvlkKVyNpKMyZbsP1RVOCQWvpQhcT0",
    authDomain: "letmeask-2c367.firebaseapp.com",
    databaseURL: "https://letmeask-2c367-default-rtdb.firebaseio.com",
    projectId: "letmeask-2c367",
    storageBucket: "letmeask-2c367.appspot.com",
    messagingSenderId: "485195543932",
    appId: "1:485195543932:web:93a6934fc7a968a0dba0f9"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();

