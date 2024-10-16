const SightDetail = require('../models/SightDetail');

// Add sight details
exports.addSightDetail = async (req, res) => {
    const { deviceSerialNumber, pinCode, centerID, location, centerName, employeesName } = req.body;

    try {
        const newDetail = new SightDetail({
            userid: req.user.userid,
            deviceSerialNumber,
            pinCode,
            centerID,
            location,
            centerName,
            employeesName,
        });

        await newDetail.save();
        res.json({ message: 'Sight details added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getSightDetails = async (req, res) => {
    const { centerID, location } = req.query;

    try {
        const sightDetailsList = await SightDetail.find(req.query);

        return res.json({ message: 'Sight details fetched successfully', data: sightDetailsList });
    } catch (err) {
        res.status(500).json({ message: 'Server error', message: error.message });
    }
};