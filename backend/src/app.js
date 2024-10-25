import express from 'express';
import cors from 'cors';
import { categoryRouter, customerRouter, productRouter } from './routes/index.js';

const app = express();

// middleware for communication with the client side
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

// middleware for accepting form data
app.use(express.json());

// middleware for acception url data
app.use(express.urlencoded({ extended: true }));

// middleware for handling images
app.use(express.static('public'));


app.use("/api/categories", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/customer", customerRouter);

app.get("/", (req, res) => {
    res.send("Hello from the server side!");
})



export default app;