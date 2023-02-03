import express from "express";
import { deleteBook, getAllBooks, getBookById, inputBook, updateBook, upload } from "../controllers/books.js";
import {checkJWTAdmin, checkJWTUser} from '../middlewares/jwt.js';

const bookRoute = express.Router();

bookRoute.post('/book', checkJWTAdmin, upload.single('Cover'), inputBook);
bookRoute.get('/books', checkJWTUser, getAllBooks);
bookRoute.get('/book/:bookId', checkJWTUser, getBookById);
bookRoute.put('/updatebook', checkJWTAdmin, updateBook);
bookRoute.delete('/deletebook/:id', checkJWTAdmin, deleteBook);

export default bookRoute; 