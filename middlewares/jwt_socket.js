import { verify } from "jsonwebtoken";
import config from "../config/app.js";

export const validateAccessTokenUser = async (socket, next) => {
    try {
        const token = socket.handshake.query.token?.toString() || "";
        let payload = {};
        
        try {
            payload = verify(token, config.ACCESS_TOKEN_SECRET_USER);
        } catch (error) {
            payload = verify(token, config.ACCESS_TOKEN_SECRET_ADMIN);
        }

        socket.token = payload;
        socket.param = {
            authenticated : true,
        };
        next();
    } catch (err) {
        socket.param = {
            authenticated : false
        };
        next();
    }
}