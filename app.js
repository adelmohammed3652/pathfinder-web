// app.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // Add more profile fields here
});

// Create the User model
const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: false,
  })
);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Set up routes

// GET login page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

// GET sign-up page
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/views/signup.html');
});

// POST sign-up data
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user data to the database
  const newUser = new User({ username, password: hashedPassword });
  newUser.save();

  res.redirect('/login');
});

// POST login data
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });

  if (user) {
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // Set up a session for the authenticated user
      req.session.user = user;
      res.redirect('profile.html');
    } else {
      res.send('Incorrect password.');
    }
  } else {
    res.send('User not found. Please sign up.');
  }
});

// GET profile page
app.get('/profile', (req, res) => {
  // Check if the user is authenticated (has an active session)
  if (req.session.user) {
    res.sendFile(__dirname + '/views/profile.html');
  } else {
    res.redirect('/login');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
