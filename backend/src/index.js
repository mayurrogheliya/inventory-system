import dotenv from 'dotenv';
import app from './app.js';
import sequelize from './db/dbConfig.js';
import Order from './models/order.model.js';
import OrderItem from './models/orderItem.model.js';

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT || 5000;

Order.associate();
OrderItem.associate();

sequelize.sync()
    .then(() => {
        console.log("All model sync successful");
    }).catch((err) => {
        console.log("model sync failed: ", err);

    });

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})
