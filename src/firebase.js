import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: 'AIzaSyBx9Gw5SBs0wUGZjorRJB23bfI9_5YmMFY',
    authDomain: 'shiba-world-38884.firebaseapp.com',
    databaseURL: 'https://shiba-world-38884-default-rtdb.firebaseio.com',
    projectId: 'shiba-world-38884',
    storageBucket: 'shiba-world-38884.appspot.com',
    messagingSenderId: '199194596042',
    appId: '1:199194596042:web:db5eb58c61c3db41a9da33',
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

