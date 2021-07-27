import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDFoR0xuLIfZa6-JleWn6X1riWr59K60SQ",
  authDomain: "instagram-clone-8e3a4.firebaseapp.com",
  projectId: "instagram-clone-8e3a4",
  storageBucket: "instagram-clone-8e3a4.appspot.com",
  messagingSenderId: "814350807975",
  appId: "1:814350807975:web:52ec3ae3e469b9a1cbbc82"
})

const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage()

export default db