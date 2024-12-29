const express = require('express');
const { getUserProfile, updateUserRole } = require('../controllers/user.controller');
const validateRole = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/profile/:id', getUserProfile);
router.put('/role/update/:id', validateRole('admin'), updateUserRole);

module.exports = router;

