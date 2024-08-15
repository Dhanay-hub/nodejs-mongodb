const express = require('express');
const router = express.Router();
const Role = require('../models/role');
const roleController = require('../controller/role');
const authenticateToken = require('../middleware/auth');


// Create a new role
router.post('/', authenticateToken, roleController.createRole);

// Get all roles
router.get('/', authenticateToken, roleController.readRoles);

// Update a role (add/remove access modules)
router.put('/:roleId', authenticateToken, roleController.updateRole);

// Check if a user has access to a particular module
router.get('/check-access/:userId/:module', authenticateToken, roleController.checkAccess);

module.exports = router;