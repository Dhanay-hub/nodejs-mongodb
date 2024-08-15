const express = require('express');
const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Signup API
exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Login API
exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', user, token });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Get all users with populated roleName and accessModules
exports.readUsers = async (req, res) => {
    const { search } = req.query;
    const regex = new RegExp(search, 'i'); // case-insensitive search
    try {
        // Search users by username (case-insensitive)
        if (search) {
            const users = await User.find({ firstName: regex}).populate('role', 'roleName accessModules');
            return res.status(200).json(users);
        }
        const users = await User.find()
            .populate('role', 'roleName accessModules')
            .exec();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// Update many users with the same data and with different data
exports.updateUser = async (req, res) => {
    const { isSameData } = req.query;
    const { updateData, filter } = req.body; // filter for users to update
    try {
        if(isSameData) {
            await User.updateMany(filter, { $set: updateData });
        } else {
            // Update many users with different data
            const bulkOps = updateData.map((update) => ({
                updateOne: {
                    filter: { _id: update.id },
                    update: { $set: update.data }
                }
            }));
            await User.bulkWrite(bulkOps);   
        }
        return res.status(200).json({ message: 'Users updated successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};