import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DATABASE,
    'root',
    '',
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT
    }
);

sequelize.authenticate()
    .then(() => {

        console.log("Connection with database successfully established");
    })
    .catch((error) => {
        console.log("Couldn't connect to database: ", error);
    });

export default sequelize;