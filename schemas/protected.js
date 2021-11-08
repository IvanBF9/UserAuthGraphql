const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLSchema,
} = graphql;

//USERS
const {getAllUsers} = require("./Users");

/*
 ██▓███   ██▀███   ▒█████  ▄▄▄█████▓▓█████  ▄████▄  ▄▄▄█████▓▓█████ ▓█████▄ 
▓██░  ██▒▓██ ▒ ██▒▒██▒  ██▒▓  ██▒ ▓▒▓█   ▀ ▒██▀ ▀█  ▓  ██▒ ▓▒▓█   ▀ ▒██▀ ██▌
▓██░ ██▓▒▓██ ░▄█ ▒▒██░  ██▒▒ ▓██░ ▒░▒███   ▒▓█    ▄ ▒ ▓██░ ▒░▒███   ░██   █▌
▒██▄█▓▒ ▒▒██▀▀█▄  ▒██   ██░░ ▓██▓ ░ ▒▓█  ▄ ▒▓▓▄ ▄██▒░ ▓██▓ ░ ▒▓█  ▄ ░▓█▄   ▌
▒██▒ ░  ░░██▓ ▒██▒░ ████▓▒░  ▒██▒ ░ ░▒████▒▒ ▓███▀ ░  ▒██▒ ░ ░▒████▒░▒████▓ 
▒▓▒░ ░  ░░ ▒▓ ░▒▓░░ ▒░▒░▒░   ▒ ░░   ░░ ▒░ ░░ ░▒ ▒  ░  ▒ ░░   ░░ ▒░ ░ ▒▒▓  ▒ 
░▒ ░       ░▒ ░ ▒░  ░ ▒ ▒░     ░     ░ ░  ░  ░  ▒       ░     ░ ░  ░ ░ ▒  ▒ 
░░         ░░   ░ ░ ░ ░ ▒    ░         ░   ░          ░         ░    ░ ░  ░ 
            ░         ░ ░              ░  ░░ ░                  ░  ░   ░    
                                           ░                         ░      
*/

//This route is protected by jwt token
const RootQueryProtected = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: getAllUsers,
    },
});

module.exports = new GraphQLSchema({ query: RootQueryProtected });