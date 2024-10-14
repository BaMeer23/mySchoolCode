const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {

    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({error: 'Access Denied'});
    }

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        res.statues(400).json({error: 'Token is Invalid'})
    }
};

module.exports = authenticateToken;