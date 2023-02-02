import express from "express";
import { createAuthor, getAllAuthors, updateAuthor, deleteAuthor } from "../controllers/author.js";

const authorRoute = express.Router()

authorRoute.get('/authors', getAllAuthors)
authorRoute.post('/author', createAuthor)
authorRoute.put('/author/:id', updateAuthor)
authorRoute.delete('/author/:id', deleteAuthor)

export default authorRoute;