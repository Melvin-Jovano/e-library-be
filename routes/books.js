import express from "express";
import { deleteBook, getAllBooks, getBookById, inputBook, updateBook, upload } from "../controllers/books.js";

const bookRoute = express.Router()

bookRoute.post('/book', upload.single('Cover'), inputBook)
bookRoute.get('/books', getAllBooks)
bookRoute.get('/book/:bookId', getBookById)
bookRoute.put('/updatebook', updateBook)
bookRoute.delete('/deletebook', deleteBook)

export default bookRoute;