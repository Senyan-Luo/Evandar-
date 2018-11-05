
  var config = {
    apiKey: "AIzaSyCYXNUKRhpgYbHqrXwuhazPRUcKYqhzM-E",
    authDomain: "evendar-484c7.firebaseapp.com",
    databaseURL: "https://evendar-484c7.firebaseio.com",
    projectId: "evendar-484c7",
    storageBucket: "evendar-484c7.appspot.com",
    messagingSenderId: "279832144780"
  };
  firebase.initializeApp(config);
  var db = firebase.firestore();
  const eventsRef = db.collection("events")
  // Disable deprecated features
  db.settings({
    timestampsInSnapshots: true
  });