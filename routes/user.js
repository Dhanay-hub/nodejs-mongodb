const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require('bcryptjs');
const userController = require("../controller/user");
const authenticateToken = require('../middleware/auth');

// Signup API
router.post('/signup', userController.signUp);

// Login API
router.post('/login', userController.logIn);

// Get all users with populated roleName and accessModules
router.get('/', authenticateToken, userController.readUsers);

// Update many users with the same data
router.put('/', authenticateToken, userController.updateUser);


module.exports = router;