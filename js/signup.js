// admin.js

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCviX9zuJDIacxSqKLDT-P28ILS3CuA_3M",
  authDomain: "login-3292c.firebaseapp.com",
  databaseURL: "https://login-3292c-default-rtdb.firebaseio.com",
  projectId: "login-3292c",
  storageBucket: "login-3292c.appspot.com",
  messagingSenderId: "79551441339",
  appId: "1:79551441339:web:eb965055b03e08ee383c9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
var database = firebase.database();

// Get the task form element
var taskForm = document.getElementById('task-form');

// Add a submit event listener to the form
taskForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the task input value
  var taskInput = document.getElementById('task').value;

  // Clear the input field
  document.getElementById('task').value = '';

  // Save the task to the database
  database.ref('tasks').push().set({
      task: taskInput
  });
});
