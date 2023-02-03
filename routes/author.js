import express from "express";
import { createAuthor, getAllAuthors, updateAuthor, deleteAuthor } from "../controllers/author.js";
import {checkJWTAdmin} from '../middlewares/jwt.js';

const authorRoute = express.Router()

authorRoute.get('/authors', checkJWTAdmin, getAllAuthors)
authorRoute.post('/author', checkJWTAdmin, createAuthor)
authorRoute.put('/author/:id', checkJWTAdmin, updateAuthor)
authorRoute.delete('/author/:id', checkJWTAdmin, deleteAuthor)

export default authorRoute;