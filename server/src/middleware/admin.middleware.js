// src/middleware/admin.middleware.js

const isAdmin = (req, res, next) => {
    // We assume the 'protect' middleware has already run and attached the user to the request.
    if (req.user && (req.user.role === 'admin' || req.user.role === 'staff')) {
        next(); // User is an admin or staff, allow them to proceed
    } else {
        res.status(403).json({ message: 'Forbidden: Access is restricted to administrators.' });
    }
};

module.exports = { isAdmin };