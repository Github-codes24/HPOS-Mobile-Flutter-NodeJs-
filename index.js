const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Use middlewares
app.use(cookieParser());
app.use(
    cors({
        origin: "*", // Allow all origins (for development purposes; adjust for production)
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Middleware to parse JSON bodies

// Import routes
const patientRoutes = require("./routes/patientRoutes");
const breastpatientRoutes = require("./routes/breastpatientRoutes");
const dataRoutes = require("./routes/dataRoutes");
const breastdataRoutes = require("./routes/breastdataRoutes");
const cervicaldataRoutes = require("./routes/cervicaldataRoutes");
const cervicalpatientRoutes = require("./routes/cervicalpatientRoutes");
// const userRoutes = require("./routes/userRoutes");
const authRoutes = require('./routes/auth');
const sightDetailRoutes = require('./routes/sightDetailRoutes');

// Use routes
app.use("/api/sickleCellPatients", patientRoutes);
app.use("/api/data", dataRoutes);
app.use("/api/breastdata", breastdataRoutes);
app.use("/api/breastpatients", breastpatientRoutes);
app.use("/api/cervicaldata", cervicaldataRoutes);
app.use("/api/cervicalpatients", cervicalpatientRoutes);
// app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);           // Route for authentication
app.use("/api", sightDetailRoutes);         // Route for sight details

// Start the server..
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
