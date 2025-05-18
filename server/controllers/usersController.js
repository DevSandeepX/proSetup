const User = require('../models/User')
const Note = require('../models/Note')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().lean().select('-password');

    if (!users) {
        return res.status(404).json({ message: 'Users not found' })
    }

    res.status(200).json({ users })

})



const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;

    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const exists = await User.findOne({ username }).lean();
    if (exists) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hashedPwd,
        roles
    });

    if (user) {
        const { password, ...userWithoutPassword } = user.toObject();
        res.status(201).json({ user: userWithoutPassword, message: 'User created successfully' });
    } else {
        res.status(400).json({ message: 'Invalid user data received' });
    }
});



const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body;

    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' });
    }

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const duplicate = await User.findOne({ username, _id: { $ne: id } }).lean();
    if (duplicate) {
        return res.status(409).json({ message: 'Username already taken' });
    }

    user.username = username;
    user.roles = roles;
    user.active = active;

    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    res.json({ message: `${updatedUser.username} updated successfully` });
});



const deleteUser = asyncHandler(async (req, res) => {

})



module.exports = {
    getAllUsers,
    createNewUser, 
    updateUser,
    deleteUser
}

