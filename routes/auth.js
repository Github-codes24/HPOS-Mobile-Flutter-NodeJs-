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
            { userid: 'testuser1', password: 'password123', employeName: 'John Doe', centerName: 'Nagpur' },
            { userid: 'testuser2', password: 'password456', employeName: 'Jane Smith', centerName: 'Pune' },
            { userid: 'testuser3', password: 'password789', employeName: 'Alice Johnson', centerName: 'Mumbai' }
        ];

        for (const userData of users) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);

            const user = new User({
                userid: userData.userid,
                password: hashedPassword,
                employeName: userData.employeName,
                centerName: userData.centerName
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
    const { userid, password, disease } = req.body;

    // Check if required fields are present
    if (!userid || !password || !disease) {
        return res.status(400).json({ message: 'Userid, password, and disease are required' });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ userid });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Include employeeName and the provided disease in the token payload
        const token = jwt.sign(
            { userid: user.userid, employeeName: user.employeName, disease }, // Adding the provided disease to token payload
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        const userDetails = {
            userid: user.userid,
            employeeName: user.employeeName,
            centerName: user.centerName,
            employeName: user.employeeName,
            disease: disease, // the provided disease
        };

        res.status(200).json({ message: 'Login successful', token, userDetails });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});





// Reset Password route
router.post('/reset-password', async (req, res) => {
    try {
        const { employeeName, newPassword, confirmPassword } = req.body;

        // Find the user by employeeName
        const user = await User.findOne({ employeeName });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if new password matches the confirm password
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Generate salt and hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password using MongoDB's `$set` to avoid overwriting other fields
        await User.updateOne(
            { employeeName }, // Find the user by employeeName
            { $set: { password: hashedPassword } } // Only update the password field
        );

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// User Details Route
router.get('/user-details', authenticateToken, async (req, res) => {
    const { employeName } = req.user;
    const user = await User.findOne({ employeName });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    res.status(200).json({
        employeeName: user.employeName,
        centerName: user.centerName,  // Include more user details if needed
        data: "User details fetched successfully"
    });
});

// Get all employee data, optionally filtered by name
router.get('/all-employeedata', authenticateToken, async (req, res) => {
    try {
        const queryName = req.query.name;
        let users;

        if (queryName) {
            // Find users where employeeName matches the query (case-insensitive)
            users = await User.find({ employeeName: { $regex: new RegExp(queryName, 'i') } });
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

// Get employee detail by Center (requires token)
router.get('/employedetail/:name', async (req, res) => {
    try {
        const { name } = req.params;
        console.log(name)

        // Find user by employeeName (case-insensitive search)
        const user = await User.find({ centerName: name });
        console.log(user)

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
