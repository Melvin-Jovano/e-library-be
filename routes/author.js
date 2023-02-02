import express from "express";
import { createAuthor, getAllAuthors } from "../controllers/author.js";

const authorRoute = express.Router()

authorRoute.get('/authors', getAllAuthors)
authorRoute.post('/author', createAuthor)

export default authorRoute;