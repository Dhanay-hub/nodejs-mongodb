const express = require('express');
const router = express.Router();
const Role = require('../models/role');
const roleController = require('../controller/role');

// Create a new role
router.post('/', roleController.createRole);

// Get all roles
router.get('/', roleController.readRoles);

// Update a role (add/remove access modules)
router.put('/:roleId', roleController.updateRole);

// Check if a user has access to a particular module
router.get('/check-access/:userId/:module', roleController.checkAccess);

module.exports = router;