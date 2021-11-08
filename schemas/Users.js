const graphql = require("graphql");
const {
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
} = graphql;

const {User} = require('../models');

const {UserType, UserSearch} = require("./Types/UserType");

/*
--   █    ██  ██████ ▓█████  ██▀███    ██████ 
--   ██  ▓██▒██    ▒ ▓█   ▀ ▓██ ▒ ██▒▒██    ▒ 
--  ▓██  ▒██░ ▓██▄   ▒███   ▓██ ░▄█ ▒░ ▓██▄   
--  ▓▓█  ░██░ ▒   ██▒▒▓█  ▄ ▒██▀▀█▄    ▒   ██▒
--  ▒▒█████▓▒██████▒▒░▒████▒░██▓ ▒██▒▒██████▒▒
--  ░▒▓▒ ▒ ▒▒ ▒▓▒ ▒ ░░░ ▒░ ░░ ▒▓ ░▒▓░▒ ▒▓▒ ▒ ░
--  ░░▒░ ░ ░░ ░▒  ░ ░ ░ ░  ░  ░▒ ░ ▒░░ ░▒  ░ ░
--   ░░░ ░ ░░  ░  ░     ░     ░░   ░ ░  ░  ░  
--     ░          ░     ░  ░   ░           ░  
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
    resolve(parent, args) {
        console.log(args);
        let newuser = new User(args);
        return newuser.save()
    },
};

module.exports = {getAllUsers, createUser,};