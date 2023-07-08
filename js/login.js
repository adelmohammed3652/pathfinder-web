// login.js

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

// Reference to the Firebase Auth service
var auth = firebase.auth();

// Reference to the Firebase Realtime Database
var database = firebase.database();

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form from being submitted

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Sign in user with email and password
  auth.signInWithEmailAndPassword(email, password)
      .then(function (userCredential) {
          // Login successful
          var user = userCredential.user;
          window.location.href = 'profile.html'; // Redirect to profile page
      })
      .catch(function (error) {
          // Login failed
          var errorMessage = error.message;
          alert(errorMessage);
      });
});
