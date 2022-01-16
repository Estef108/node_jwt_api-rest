const express = require('express');
const router = express.Router();
const { isAuth } = require('../../middlewares/auth.middleware');

const {
    registerUser,
    loginUser,
    logoutUser
} = require('../controllers/user.controller');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', [isAuth], logoutUser);

module.exports = router;