const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpStatusCode = require('../../utils/httpStatusCode');

//Registro de usuario
const registerUser = async (req, res, next) => {
    try {
        const newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.favBooks = [];
        const userDb = await newUser.save();
        res.json({
            status: 201,
            message: httpStatusCode[201],
            data: null,
        })
    } catch (error) {
        next(error);
    }
}

//Inicio de sesión de usuario
const loginUser = async (req, res, next) => {
    try {
        const userInfo = await User.findOne({ email: req.body.email })
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
            userInfo.password = null;
            const token = jwt.sign(
                {
                    id: userInfo._id,
                    name: userInfo.name,
                },
                req.app.get("secretKey"),
                {
                    expiresIn: "1h",
                }
            );
            return res.json({
                status: 200,
                message: httpStatusCode[200],
                data: { user: userInfo, token: token },
            })
        } else{
            return res.json({
                status: 400,
                message: httpStatusCode[400],
                data: null,
            });
        }
    } catch (error) {
        next(error);
    }
}

//Cierre de sesión de usuario
const logoutUser = (req, res, next) => {
    try {
        return res.json({
            status: 200,
            message: httpStatusCode[200],
            token: null,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}