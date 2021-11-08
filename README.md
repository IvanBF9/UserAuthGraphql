# UserAuthGraphql
This is a very simple way to create a graphql API !
In this API you have protected routes and unprotected routes
you are free to use it, I hope you enjoy it :)


before running the project:
    change db config /config/config.json
    run mysql then create a database:
        mysql command : CREATE DATABASE graphql;
    make a dotenv file

## ENV
PORT=3000
ACCES_TOKEN_SECRET= Generate a random token secret !

## Install dependencies
npm i

## Now you can run it !
npm start

## Note
It's my first graphql API, maybe not best practices used here...
This is very simple to get started, but to use this in production you may need to adjust it !