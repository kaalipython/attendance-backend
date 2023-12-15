const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();

// Middleware
app.use(cors());

// Middleware
app.use(bodyParser.json());

const uri =
  'mongodb+srv://aasim:XfpFdiCzA3zYUPen@cluster0.kulamu6.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(uri);

const db = mongoose.connection;

const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
});

// User registration endpoint
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Account already available with this email.' });
    }

    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Get all registered users endpoint
app.get('/users', async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// User login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists with the provided email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed. User not found.' });
      }
  
      // Check if the provided password matches the stored password
      if (password !== user.password) {
        return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
      }
  
      res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });




  const Employee = mongoose.model('Employee', {
    name: String,
    email: String,
    designation: String,
  });
  
  // Employee creation endpoint
  app.post('/addstaff', async (req, res) => {
    const { name, email, designation } = req.body;
  
    try {
      // Check if the email already exists
      const existingEmployee = await Employee.findOne({ email });
  
      if (existingEmployee) {
        return res.status(400).json({ message: 'Employee with this email already exists.' });
      }
  
      // Create a new employee
      const newEmployee = new Employee({ name, email, designation });
      await newEmployee.save();
  
      res.status(201).json({ message: 'Employee created successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  //list all employees
  app.get('/staffs', async (req, res) => {
    try {
      const allEmployees = await Employee.find();
      res.status(200).json(allEmployees);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  


  const Attendance = mongoose.model('Attendance', {
    name: String,
    date: String,
    status: String, // 'Present' or 'Absent'
  });

//attendance entry
  app.post('/attendance', async (req, res) => {
    const { name, date, status } = req.body;
  
    try {
      // Create a new attendance entry
      const newAttendance = new Attendance({ name, date, status });
      await newAttendance.save();
  
      res.status(201).json({ message: 'Attendance recorded successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
// Get all attendance entries endpoint
app.get('/allattendance', async (req, res) => {
    try {
      const allAttendance = await Attendance.find();
      res.status(200).json(allAttendance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
