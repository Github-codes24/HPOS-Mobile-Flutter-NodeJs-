const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
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
            { userid: 'UNI001', password: 'password123', employeName: 'Aachal L. Varma', centerName: 'Nagpur' },
            { userid: 'UNI002', password: 'password123', employeName: 'Ashwini K. Saratkar', centerName: 'Pune' },
            { userid: 'UNI004', password: 'password123', employeName: 'Ashwini J. Shendre', centerName: 'Mumbai' },
            { "userid": "UNI005", "password": "password123", "employeName": "Shraddha M. Bhalme", "centerName": "Delhi" },
            { "userid": "UNI007", "password": "password123", "employeName": "Nazmeen W. Khan", "centerName": "Bangalore" },
            { "userid": "UNI013", "password": "password123", "employeName": "Samiksha H. Badwaik", "centerName": "Chennai" },
            { "userid": "UNI017", "password": "password123", "employeName": "Nisha D. Bawankar", "centerName": "Kolkata" },
            { "userid": "UNI021", "password": "password123", "employeName": "Megha S. Godghate", "centerName": "Hyderabad" },
            { "userid": "UNI023", "password": "password123", "employeName": "Dipali K. Shinde", "centerName": "Ahmedabad" },
            { "userid": "UNI024", "password": "password123", "employeName": "Juhi S. khobragade", "centerName": "Surat" },
            { "userid": "UNI027", "password": "password123", "employeName": "Ishika N. Fadtare", "centerName": "Jaipur" },
            { "userid": "UNI028", "password": "password123", "employeName": "Monali D. Ghodmare", "centerName": "Lucknow" },
            { "userid": "UNI030", "password": "password123", "employeName": "Saylee D. Ghatole", "centerName": "Kanpur" },
            { "userid": "UNI032", "password": "password123", "employeName": "Megha Y. Bansod", "centerName": "Nagpur" },
            { "userid": "UNI033", "password": "password123", "employeName": "Prachi S. Kuthe", "centerName": "Pune" },

            { "userid": "UNI034", "password": "password123", "employeName": "Astha R. Mendhe", "centerName": "Mumbai" },
            { "userid": "UNI035", "password": "password123", "employeName": "Pratikhsha A. Kathane", "centerName": "Delhi" },
            { "userid": "UNI036", "password": "password123", "employeName": "Neha C. Yelekar", "centerName": "Bangalore" },
            { "userid": "UNI037", "password": "password123", "employeName": "Damini U. Dhumankhede", "centerName": "Chennai" },
            { "userid": "UNI038", "password": "password123", "employeName": "Snehal Talmale", "centerName": "Kolkata" },
            { "userid": "UNI044", "password": "password123", "employeName": "Bhagyashri Bhutekar", "centerName": "Hyderabad" },
            { "userid": "UNI045", "password": "password123", "employeName": "Manisha Raut", "centerName": "Ahmedabad" },
            { "userid": "UNI046", "password": "password123", "employeName": "Pallavi Surywanshi", "centerName": "Surat" },
            { "userid": "UNI047", "password": "password123", "employeName": "Payal Hatwar", "centerName": "Jaipur" },
            { "userid": "UNI048", "password": "password123", "employeName": "Pooja Choudhari", "centerName": "Lucknow" },
            { "userid": "UNI050", "password": "password123", "employeName": "Sakshi Babhare", "centerName": "Kanpur" },
            { "userid": "UNI051", "password": "password123", "employeName": "Shradha Zanzal ", "centerName": "Nagpur" },
            { "userid": "UNI052", "password": "password123", "employeName": "Shruti Shendre", "centerName": "Pune" },
            { "userid": "UNI053", "password": "password123", "employeName": "Vaishnavi Sointakke", "centerName": "Mumbai" },
            { "userid": "UNI054", "password": "password123", "employeName": "Riya Singh Thakur", "centerName": "Delhi" },
            { "userid": "UNI1001", "password": "password123", "employeName": "Khushi Talmale", "centerName": "Bangalore" },
            { "userid": "UNI1002", "password": "password123", "employeName": "Salonoi Chlvane", "centerName": "Chennai" },
            { "userid": "UNI1003", "password": "password123", "employeName": "Ashwini Kathane", "centerName": "Kolkata" },
            { "userid": "UNI1004", "password": "password123", "employeName": "Gayatri Yerekar", "centerName": "Hyderabad" },
            { "userid": "UNI1005", "password": "password123", "employeName": "Nida Sheikh", "centerName": "Ahmedabad" },
            { "userid": "UNI1006", "password": "password123", "employeName": "Pranali Lohare", "centerName": "Surat" },
            { "userid": "UNI1007", "password": "password123", "employeName": "Neha Ganorkar", "centerName": "Jaipur" },
            { "userid": "UNI1008", "password": "password123", "employeName": "Srusti Agnihotri", "centerName": "Lucknow" },
            { "userid": "UNI1009", "password": "password123", "employeName": "Anuksha Shende", "centerName": "Kanpur" },
            { "userid": "UNI1010", "password": "password123", "employeName": "Urvashi Umale", "centerName": "Nagpur" }
        
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





const nodemailer = require('nodemailer');

//send OTP via email
async function sendOTPEmail( employee, employeID, newPassword ) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.PASSWORD,
    to: process.env.SEND_EMAIL_TO,
    subject: "Password Reset Details",
    // text: `Your OTP for password reset is : ${otp}`,
    text: `
        Dear Sir/Madam,

        The password has been reset by ${employee.toUpperCase()}.

        Here are the details:
        - Employee Name: ${employee.toUpperCase()}
        - Employee ID: ${employeID}
        - New Password: ${newPassword}

        Please ensure the new password is kept secure and used for future logins.

        Thanks.
    `
  };

  await transporter.sendMail(mailOptions);
};

// Reset Password route
router.post('/reset-password', async (req, res) => {
    try {
        const { employeeName, newPassword, confirmPassword } = req.body;

        // Find the user by employeeName
        const user = await User.findOne({ userid: employeeName });
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
            { userid: employeeName }, // Find the user by employeeName
            { $set: { password: hashedPassword } } // Only update the password field
        );
        await sendOTPEmail( user.employeName, employeeName, newPassword);
        return res.status(200).json({ message: 'Password reset successful' });

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
