import dotenv from 'dotenv';
import app from './app.js';
import CategoryDetail from './models/category.model.js';

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT || 5000;

CategoryDetail.sync()
    .then(() => {
        console.log("CategoryDetail sync successful");
    }).catch((err) => {
        console.log("CategoryDetail sync failed: ", err);

    });

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})
