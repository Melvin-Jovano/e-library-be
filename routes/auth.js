import express from "express";
import {
    loginUser, 
    logoutUser, 
    refreshTokenUser, 
    registerUser, 
    loginAdmin, 
    logoutAdmin, 
    refreshTokenAdmin, 
    registerAdmin 
} from "../controllers/auth.js";
import { checkJWTAdmin } from "../middlewares/jwt.js";

const authRouter = express.Router();

authRouter.post('/auth/user/login', loginUser);
authRouter.put('/auth/user/register', registerUser);
authRouter.delete('/auth/user/logout', logoutUser);
authRouter.put('/auth/user/refresh', refreshTokenUser);
 
authRouter.post('/auth/admin/login', checkJWTAdmin, loginAdmin);
authRouter.put('/auth/admin/register', registerAdmin);
authRouter.delete('/auth/admin/logout', logoutAdmin);
authRouter.put('/auth/admin/refresh', refreshTokenAdmin);

export default authRouter;