
require('dotenv').config();
const secret = process.env.ACCES_TOKEN_SECRET;
const jwt = require("jsonwebtoken");
const jwt_decode = require('jwt-decode');
const {User} = require("../models");
/*
 ▄▄▄       █    ██ ▄▄▄█████▓ ██░ ██ 
▒████▄     ██  ▓██▒▓  ██▒ ▓▒▓██░ ██▒
▒██  ▀█▄  ▓██  ▒██░▒ ▓██░ ▒░▒██▀▀██░
░██▄▄▄▄██ ▓▓█  ░██░░ ▓██▓ ░ ░▓█ ░██ 
 ▓█   ▓██▒▒▒█████▓   ▒██▒ ░ ░▓█▒░██▓
 ▒▒   ▓▒█░░▒▓▒ ▒ ▒   ▒ ░░    ▒ ░░▒░▒
  ▒   ▒▒ ░░░▒░ ░ ░     ░     ▒ ░▒░ ░
  ░   ▒    ░░░ ░ ░   ░       ░  ░░ ░
      ░  ░   ░               ░  ░  ░
                                    
*/

const generateToken = (user) => {
    let {firstname, lastname, email, id} = user;
    //This Token expires in 14 days
    return jwt.sign({
        firstname,
        lastname,
        email,
        id
    }, secret, {expiresIn : "14d"});
}

const authToken = async (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);

    if (token == null) return res.sendStatus(401);
    //Getting actual token of the user on db
    const usrId = jwt_decode(token).id;

    let data = await User.findByPk(usrId);
    //Check if token is stored on database to avoid stoled tokens to be used
    if (data.bearer == token){

        jwt.verify(token, secret, (err, user) => {
            if (err) return res.sendStatus(403)
            console.log(user)
            return next();
        });

    }else{

        return res.sendStatus(403)
    
    }

};

module.exports = {generateToken, authToken};