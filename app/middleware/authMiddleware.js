const jwt = require('jsonwebtoken');

const authValidation = (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const decodedVal = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decodedVal;
            console.log('User info - ', req.user);
            next();
        } catch (error) {
            res.status(400).json({ message: 'Invalid token'})
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authValidation;