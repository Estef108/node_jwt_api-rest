const jwt = require('jsonwebtoken');
const httpStatusCode = require('../utils/httpStatusCode');

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization){
        return res.json({
            status: 401,
            message: httpStatusCode[401],
            data: null
        })
    }
    const splits = authorization.split(" ");
    if (splits.length !=2 || splits[0] != "Bearer"){
        return res.json({
            status: 400,
            message: httpStatusCode[400],
            data: null
        })
    }
    const jwtString = splits[1];
    try {
        const token = jwt.verify(jwtString, req.app.get("secretKey"));
        // console.log("token tras verify", token);
        const authority = {
            id: token.id,
            name: token.name
        };
        req.authority = authority;
    } catch (error) {
        return next(error)
    }
    
    next();
}




module.exports = {
    isAuth
}