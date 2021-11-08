const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const env = process.env || 3000;
const {graphqlHTTP} = require("express-graphql");

const app = express();

//Light secure
app.use(cors());
app.use(helmet());
app.use(express.json());
app.disable('x-powered-by');

//Grahql
const schema = require('./schemas/index');
const protectedschema = require('./schemas/protected');
const {authToken} = require('./auth');

//Opened routes
app.use("/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);
//Protected routes with JWT
app.use("/graphqlprotected", authToken,
    graphqlHTTP({
        schema : protectedschema,
        graphiql: true,
    })
    
);

//Sync models sequelize & run server
const db = require('./models');
db.sequelize.sync().then((req) => {
    app.listen(env.PORT, () => {
        console.log(`Server listening on port: ${env.PORT}`);
    });
});