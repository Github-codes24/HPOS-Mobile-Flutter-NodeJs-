const casteModel = require("../models/casteModel");
const categoryModel = require("../models/categoryModel");

const getCaste = async (req, res) => {
    try {
       const c = await casteModel.find();
        return res.status(200).json({ status: true, casteList: c });
    } catch (error) {
    // Error handling
    return res.status(500).json({ message: 'Error fetching cities', error: error.message });
  }
};

const addCaste = async (req, res) => {
    try {
        const { name } = req.body;
        const castes = await casteModel.findOne();
        castes.names.push(name);
        await castes.save();
        return res.status(200).json({ status: true, casteList: castes });
    } catch (error) {
    // Error handling
    return res.status(500).json({ message: 'Error fetching cities', error: error.message });
  }
}

const getCategory = async (req, res) => {
    try {
       const c = await categoryModel.find();
        return res.status(200).json({ status: true, categoryList: c });
    } catch (error) {
    // Error handling
    return res.status(500).json({ message: 'Error fetching cities', error: error.message });
  }
};

const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const categories = await categoryModel.findOne();
        categories.names.push(name);
        await categories.save();
        return res.status(200).json({ status: true, categoryList: categories });
    } catch (error) {
    // Error handling
    return res.status(500).json({ message: 'Error fetching cities', error: error.message });
  }
}

module.exports = {getCaste, addCaste, getCategory, addCategory};
