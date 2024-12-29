const db = require('../models');
const User = db.users;

const getUserProfile = async (req, res) => {
    const uid = req.params.id;
    console.log('PARAMS - ', uid);

    const userData = await User.findOne({ where: { id: uid } });
    res.status(200).json({ data: userData }); 
}

const updateUserRole = async (req, res) => {
    const uid = req.params.id;
    console.log('PARAMS - ', uid, req.body);

    // const userData = await User.findOne({ where: { id: uid } });
    // const user = userData.dataValues;

    // if (!user) {
    //     return res.status(400).json({ message: 'Invalid request' });
    // }

    // userData.dataValues.role = req.body.role;
    // console.log('User - ', userData);

    // const updatedUser = await userData.save();

    User.update({
        role: req.body.role
    },
    {
        where: {
            id: uid
        }
    })
      .then((result) => {
        console.log('RES - ', result);
        return res.status(200).json({ message: "Record updated successfully" })
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong.' })
      })

    // console.log('Update user - ', updatedUser);
    // res.status(200).json({ message: 'Update completed successfully!' });
}

module.exports = {
    getUserProfile,
    updateUserRole
}