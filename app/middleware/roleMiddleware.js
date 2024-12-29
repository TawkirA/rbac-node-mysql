const validateRole = (...validRoles) => {
    console.log('Valid Roles - ', validRoles);

    return (req, res, next) => {
        if (!validRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' })
        }
        next();
    }
}

module.exports = validateRole;