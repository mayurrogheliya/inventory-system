// import sequlize library, which is ORM(Object Relational Mapping) for the Node.js to work with SQL databases
import { Sequelize } from 'sequelize';

// initialize sequelize
const sequelize = new Sequelize(
    process.env.DATABASE,   // name of the database
    'root',     // database username
    '',     // database password
    {
        host: process.env.HOST, // database host
        dialect: process.env.DIALECT    // sql dialect
    }
);

// authenticating the connection to the database
sequelize.authenticate()
    .then(() => {

        console.log("Connection with database successfully established");
    })
    .catch((error) => {
        console.log("Couldn't connect to database: ", error);
    });

export default sequelize;