const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Fixed import
const router = express.Router();

// Middleware for authenticating JWT tokens
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ message: 'Token is required' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Seed database function (runs if database is empty)
async function seedDatabase() {
    const usersCount = await User.countDocuments();

    if (usersCount === 0) {
        console.log('No users found. Seeding users...');

        const users = [
            { userid: 'testuser1', password: 'password123', employeeName: 'John Doe' },
            { userid: 'testuser2', password: 'password456', employeeName: 'Jane Smith' },
            { userid: 'testuser3', password: 'password789', employeeName: 'Alice Johnson' }
        ];

        for (const userData of users) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);

            const user = new User({
                userid: userData.userid,
                password: hashedPassword,
                employeeName: userData.employeeName
            });

            await user.save();
        }

        console.log('Users seeded successfully');
    } else {
        console.log('Users already exist. No seeding required.');
    }
}

// Call the seeding function
seedDatabase();
// Login route
router.post('/login', async (req, res) => {
    const { userid, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ userid });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userid: user.userid }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during password comparison:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reset Password route
router.post('/reset-password', async (req, res) => {
    const { userid, newPassword, confirmPassword } = req.body;

    const user = await User.findOne({ userid });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
});

// User Details Route
router.get('/user-details', authenticateToken, async (req, res) => {
    const { userid } = req.user;
    const user = await User.findOne({ userid });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    res.status(200).json({
        _id: user._id,
        userid: user.userid,
        employeeName: user.employeeName,  // Include employeeName

        data: "User details fetched successfully"
    });
});

// Get all employee data, optionally filtered by name
router.get('/all-employeedata', authenticateToken, async (req, res) => {
    try {
        const queryName = req.query.name;
        let users;

        if (queryName) {
            // Find users where name matches the query
            users = await User.find({ name: queryName });
        } else {
            // Return all users if no query provided
            users = await User.find();
        }

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching employee data' });
    }
});

// Get employee detail by name (requires token)
router.get('/employeedetail/:name', authenticateToken, async (req, res) => {
    try {
        const { name } = req.params;

        // Find user by name (assuming name is unique or use appropriate logic)
        const user = await User.findOne({ name });

        if (!user) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error while fetching employee details' });
    }
});


module.exports = router;
