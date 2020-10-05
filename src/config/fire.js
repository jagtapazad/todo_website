import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDIn_62R5PUiMQM7-JX5jaTm-6lv7k8NG4",
    authDomain: "todo-app-88e6c.firebaseapp.com",
    databaseURL: "https://todo-app-88e6c.firebaseio.com",
    projectId: "todo-app-88e6c",
    storageBucket: "todo-app-88e6c.appspot.com",
    messagingSenderId: "910670814289",
    appId: "1:910670814289:web:69db1e1bdde8143d266c70"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;