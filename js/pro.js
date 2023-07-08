// profile.js

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCviX9zuJDIacxSqKLDT-P28ILS3CuA_3M",
  authDomain: "login-3292c.firebaseapp.com",
  projectId: "login-3292c",
  storageBucket: "login-3292c.appspot.com",
  messagingSenderId: "79551441339",
  appId: "1:79551441339:web:eb965055b03e08ee383c9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);

// Reference to the Firebase Auth service
var auth = firebase.auth();

// Reference to the Firebase Realtime Database
var database = firebase.database();

// Check if a user is logged in
auth.onAuthStateChanged(function (user) {
  if (user) {
      // User is logged in
      var userId = user.uid;

      // Get user data from the database
      database.ref('users/' + userId).once('value')
          .then(function (snapshot) {
              var userData = snapshot.val();
              document.getElementById('name').textContent = userData.name;
              document.getElementById('email').textContent = userData.email;
          })
          .catch(function (error) {
              console.log(error);
          });
  } else {
      // User is not logged in, redirect to login page
      window.location.href = 'login.html';
  }
});
