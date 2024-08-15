const Role = require('../models/role');
const User = require('../models/user');

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const newRole = new Role(req.body);
    await newRole.save();
    return res.status(201).json(newRole);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Get all roles
exports.readRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    return res.status(200).json(roles);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Update a role (add/remove access modules)
exports.updateRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    const { accessModule, action } = req.body;

    const role = await Role.findById(roleId).populate('accessModules');
    if (role && role.accessModules.includes(accessModule)) {
      return res.status(400).json({message: "Permission is already exists" });
    } 

    if (action === 'add') {
      await Role.updateOne(
        { _id: roleId },
        { $addToSet: { accessModules: accessModule } } // insert unique value
      );
    } else if (action === 'remove') {
      await Role.updateOne(
        { _id: roleId },
        { $pull: { accessModules: accessModule } } // remove value
      );
    }

    return res.status(200).json({ message: 'Role updated successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Check if a user has access to a particular module
exports.checkAccess = async (req, res) => {
  try {
    const { userId, module } = req.params;
    const user = await User.findById(userId).populate('role');
    if (user && user.role && user.role.accessModules.includes(module)) {
      return res.status(200).json({ hasAccess: true });
    } else {
      return res.status(403).json({ hasAccess: false });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};