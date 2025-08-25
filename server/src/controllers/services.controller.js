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

// NEW FUNCTION: Get a single service by its ID
const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const [service] = await Service.getById(id);
        if (service.length === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json({
            message: 'GET service success',
            data: service[0],
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// NEW: Update an existing service
const updateService = async (req, res) => {
    const { id } = req.params;
    try {
        await Service.updateById(id, req.body);
        res.json({
            message: 'UPDATE service success',
            data: { id, ...req.body },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// NEW: Delete a service
const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        await Service.deleteById(id);
        res.json({
            message: 'DELETE service success',
            data: { id },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getAllServices,
    getServiceById,
    createNewService,
    updateService,
    deleteService,
};
