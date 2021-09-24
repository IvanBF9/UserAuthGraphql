const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const env = process.env;

const app = express();

//Light secure
app.use(helmet());
app.use(express.json());
app.disable('x-powered-by');

//Models sequelize & run server
const db = require('./models');
db.sequelize.sync().then((req) => {
    //Server On + Port
    app.listen(env.PORT, () => {
        console.log(`Server listening on port: ${env.PORT}`);
    });
});