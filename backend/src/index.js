import dotenv from 'dotenv';
import app from './app.js';
import CategoryDetail from './models/category.model.js';
import sequelize from './db/dbConfig.js';

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT || 5000;

sequelize.sync()
    .then(() => {
        console.log("All model sync successful");
    }).catch((err) => {
        console.log("model sync failed: ", err);

    });

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})
