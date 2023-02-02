import express from "express";
import {checkJWTUser} from '../middlewares/jwt.js';
import { getOrderCountByUserId } from "../controllers/order.js";

const orderRoute = express.Router();

orderRoute.get('/order/count', checkJWTUser, getOrderCountByUserId);

export default orderRoute; 