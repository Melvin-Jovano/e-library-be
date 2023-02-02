import express from "express";
import { createAuthor, getAllAuthors, deleteAuthor } from "../controllers/author.js";

const authorRoute = express.Router()

authorRoute.get('/authors', getAllAuthors)
authorRoute.post('/author', createAuthor)
authorRoute.delete('/author/:id', deleteAuthor)

export default authorRoute;