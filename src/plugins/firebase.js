import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDi5vN7zBoniEtG6BaKgGW0AKDws_vHXAg",
    authDomain: "push-bc760.firebaseapp.com",
    databaseURL: "https://push-bc760.firebaseio.com",
    projectId: "push-bc760",
    storageBucket: "push-bc760.appspot.com",
    messagingSenderId: "379022011797"
  })
}

export default firebase
