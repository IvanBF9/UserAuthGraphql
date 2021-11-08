const graphql = require("graphql");
const bcrypt = require('bcrypt');
const {
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} = graphql;

//Sequelize models
const {User} = require('../models');
//User model for graphql
const {UserType, UserSearch} = require("./Types/UserType");
//Function to generate a jwt token to auth our users
const {generateToken} = require("../auth");

/*
 █    ██   ██████ ▓█████  ██▀███    ██████      █████▒█    ██  ███▄    █  ▄████▄    ██████ 
 ██  ▓██▒▒██    ▒ ▓█   ▀ ▓██ ▒ ██▒▒██    ▒    ▓██   ▒ ██  ▓██▒ ██ ▀█   █ ▒██▀ ▀█  ▒██    ▒ 
▓██  ▒██░░ ▓██▄   ▒███   ▓██ ░▄█ ▒░ ▓██▄      ▒████ ░▓██  ▒██░▓██  ▀█ ██▒▒▓█    ▄ ░ ▓██▄   
▓▓█  ░██░  ▒   ██▒▒▓█  ▄ ▒██▀▀█▄    ▒   ██▒   ░▓█▒  ░▓▓█  ░██░▓██▒  ▐▌██▒▒▓▓▄ ▄██▒  ▒   ██▒
▒▒█████▓ ▒██████▒▒░▒████▒░██▓ ▒██▒▒██████▒▒   ░▒█░   ▒▒█████▓ ▒██░   ▓██░▒ ▓███▀ ░▒██████▒▒
░▒▓▒ ▒ ▒ ▒ ▒▓▒ ▒ ░░░ ▒░ ░░ ▒▓ ░▒▓░▒ ▒▓▒ ▒ ░    ▒ ░   ░▒▓▒ ▒ ▒ ░ ▒░   ▒ ▒ ░ ░▒ ▒  ░▒ ▒▓▒ ▒ ░
░░▒░ ░ ░ ░ ░▒  ░ ░ ░ ░  ░  ░▒ ░ ▒░░ ░▒  ░ ░    ░     ░░▒░ ░ ░ ░ ░░   ░ ▒░  ░  ▒   ░ ░▒  ░ ░
 ░░░ ░ ░ ░  ░  ░     ░     ░░   ░ ░  ░  ░      ░ ░    ░░░ ░ ░    ░   ░ ░ ░        ░  ░  ░  
   ░           ░     ░  ░   ░           ░               ░              ░ 
*/

const getAllUsers = {

    type: new GraphQLList(UserSearch),
    args: { id: { type: GraphQLInt } },
    resolve(parent, args) {

        if(args.id !== undefined){
            //If is find by id
            return User.findByPk(args.id)
        }else{
            //If no id is gived
            return User.findAll()
        }

    },
}


const createUser = {
    type: UserType,
    args: {
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent, args) {
        //Hashing password to put in db
        args.password = await bcrypt.hash(args.password, await bcrypt.genSalt(10));
        //Creating user
        let newuser = new User(args);
        return newuser.save()
    },
};

const connect = {
    type: UserType,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent, args) {

        let {email, password} = args;

        let usr = await User.findOne({ where: { email: email } })
        let data = usr.dataValues;
        let pw = data.password;
        let verified = await bcrypt.compare(password, pw);

        if (verified) {
            const token = generateToken(data);
            //here we assign the bearer to the user to revoke the tokens on new connection
            data.bearer = token;
            User.update(data, { where: {id: data.id} });
            //giving the token if everithing is good !
            return {
                bearer: token
            }
        }

    },
};
//You can create a func like logout where you remove user token from db to revoke it 

module.exports = {getAllUsers, createUser, connect};