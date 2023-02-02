import express from "express";
import {checkJWTUser} from '../middlewares/jwt.js';
import { getOrderCountByUserId, getOrderUserIdAndBookId } from "../controllers/order.js";

const orderRoute = express.Router();

orderRoute.get('/order/count', checkJWTUser, getOrderCountByUserId);
orderRoute.get('/order/book/:bookId', checkJWTUser, getOrderUserIdAndBookId);

export default orderRoute; 