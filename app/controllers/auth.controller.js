const db = require('../models');
const User = db.users;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleRegister = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.findAll({
        where: {
            email: email
        }
    });

    console.log('CHK - ', user.length);

    if (user.length > 0) {
        return res.status(400).json({ message: `A user is already registered with email - ${email}` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword
    }

    User.create(newUser)
            .then(result => {
                console.log('RESP - ', result);
                res.status(201).json({ message: 'Registration is successful!' })
            })
            .catch(err => {
                console.log("ERROR - ", err);
                res.status(500).json({ message: `Error occoured while regitration - ${err}`});
            })
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    const userData = await User.findOne({ where: { email: email } });
    const user = userData.dataValues;
    console.log('USER - ', user);
    if (!user) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    const storedPwd = user.password;

    const isValidUser = await bcrypt.compare(password, storedPwd);

    if (!isValidUser) {
        return res.status(401).json({ message: 'Email or password is wrong!' })
    }

    console.log('TEST')
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(200).json({ token });
    
}


module.exports = {
    handleRegister,
    handleLogin
}
