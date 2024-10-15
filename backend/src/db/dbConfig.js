import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('ass', "root", "", {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate()
    .then(() => {

        console.log("Connection with database successfully established");
    })
    .catch((error) => {
        console.log("Couldn't connect to database: ", error);
    });

export default sequelize;