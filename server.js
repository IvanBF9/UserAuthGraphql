const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const env = process.env;
const {graphqlHTTP} = require("express-graphql");

const app = express();

//Light secure
app.use(cors());
app.use(helmet());
app.use(express.json());
app.disable('x-powered-by');

//Grahql
const schema = require('./schemas/index');

app.use("/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

//Models sequelize & run server
const db = require('./models');
db.sequelize.sync().then((req) => {
    //Server On + Port
    app.listen(env.PORT, () => {
        console.log(`Server listening on port: ${env.PORT}`);
    });
});