import express from 'express';
import authRouter from './routes/auth.js';
import cors from 'cors';
import config from './config/app.js';
import Socket from './loaders/socket.js';
import bookRoute from './routes/books.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.static("public"));
app.use(authRouter);
app.use(bookRoute);

app.listen(config.APP_PORT, () => {
    console.log(`Server Activated On Port ${config.APP_PORT}`);
});

// export const chatSocket = new Socket(app, 3001);