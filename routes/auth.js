import express from "express";
import {
    login,
    logout, 
    registerUser, 
    registerAdmin,
    refreshTokenUser,
    refreshTokenAdmin,
    getUsername
} from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post('/auth/login', login);
authRouter.delete('/auth/logout', logout);

authRouter.put('/auth/user/register', registerUser);
authRouter.put('/auth/user/refresh', refreshTokenUser);
 
authRouter.put('/auth/admin/register', registerAdmin);
authRouter.put('/auth/admin/refresh', refreshTokenAdmin);

authRouter.get('/auth/username/:username', getUsername);

export default authRouter;