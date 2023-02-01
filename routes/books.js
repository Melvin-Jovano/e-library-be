import express from "express";
import { deleteBook, getAllBooks, getBookById, inputBook, updateBook, upload } from "../controllers/books.js";
import {checkJWTUser} from '../middlewares/jwt.js';

const bookRoute = express.Router();

bookRoute.post('/book', checkJWTUser, upload.single('Cover'), inputBook);
bookRoute.get('/books', getAllBooks);
bookRoute.get('/book/:bookId', checkJWTUser, getBookById);
bookRoute.put('/updatebook', updateBook);
bookRoute.delete('/deletebook', deleteBook);

export default bookRoute; 