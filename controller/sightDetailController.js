const SightDetail = require('../models/SightDetail');

// Add sight details
exports.addSightDetail = async (req, res) => {
    const { deviceSerialNumber, pinCode, centerID, location, centerName } = req.body;

    try {
        const newDetail = new SightDetail({
            userid: req.user.userid,
            deviceSerialNumber,
            pinCode,
            centerID,
            location,
            centerName
        });

        await newDetail.save();
        res.json({ message: 'Sight details added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
