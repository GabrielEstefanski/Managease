import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const connection = await connectDatabase();

connection.on('error', (error) => {
    console.error('Connection error', error);
});

connection.once('open', () => { 
    console.log('Successful connection');
})

const app = express();
routes(app);

app.use(errorHandler); 

export default app;
