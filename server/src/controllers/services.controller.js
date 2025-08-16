// src/controllers/services.controller.js
const Service = require('../models/service.model');

const getAllServices = async (req, res) => {
    try {
        const [data] = await Service.getAll();
        res.json({
            message: 'GET all services success',
            data: data,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const createNewService = async (req, res) => {
    try {
        await Service.createNew(req.body);
        res.status(201).json({
            message: 'CREATE new service success',
            data: req.body,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getAllServices,
    createNewService,
};