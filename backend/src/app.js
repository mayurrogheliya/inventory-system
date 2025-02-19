import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

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

// middleware for routes
app.use('/api', router);

app.get("/", (req, res) => {
    res.send("Hello from the server side!");
})



export default app;