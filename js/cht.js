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

// Get reference to Firebase Realtime Database
var database = firebase.database();

// Reference to the tasks node in the database
var tasksRef = database.ref('tasks');

// Get reference to the task list in the HTML
var taskList = document.getElementById('task-list');

// Listen for new tasks added to the database
tasksRef.on('child_added', function(snapshot) {
    var task = snapshot.val();
    
    // Create an HTML element for the task
    var listItem = document.createElement('li');
    listItem.innerHTML = '<strong>' + task.title + ':</strong> ' + task.description;
    
    // Add the task to the task list
    taskList.appendChild(listItem);
});
