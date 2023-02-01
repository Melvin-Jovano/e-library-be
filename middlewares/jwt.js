import { verify } from "jsonwebtoken";
import config from "../config/app.js";

export const checkJWTUser = async (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];
        if(bearerHeader === undefined) {
            throw Error();
        }

        const token = bearerHeader.split(' ')[1];

        verify(token, config.ACCESS_TOKEN_SECRET_USER, function(err, decoded) {
            if (err !== null) {
                if(err.name === 'TokenExpiredError') {
                    return res.status(401).send({
                        message: 'EXPIRED_TOKEN',
                    });
                }
                if(err.name === 'JsonWebTokenError') {
                    throw Error();
                }
            }
            res.locals.payload = decoded;
            next();
        });
    } catch (error) {
        return res.status(401).send({
            message: 'INVALID_TOKEN',
        });
    }
}

export const checkJWTAdmin = async (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];
        if(bearerHeader === undefined) {
            throw Error();
        }

        const token = bearerHeader.split(' ')[1];

        verify(token, config.ACCESS_TOKEN_SECRET_ADMIN, function(err, decoded) {
            if (err !== null) {
                if(err.name === 'JsonWebTokenError') {
                    verify(token, config.ACCESS_TOKEN_SECRET_USER, function(err, decoded) {
                        if (err !== null) {
                            if(err.name === 'TokenExpiredError') {
                                return res.status(401).send({
                                    message: 'EXPIRED_TOKEN',
                                });
                            }
                            if(err.name === 'JsonWebTokenError') {
                                throw Error();
                            }
                            res.locals.payload = decoded;
                            return next();
                        }
                    });
                }
                if(err.name === 'TokenExpiredError') {
                    return res.status(401).send({
                        message: 'EXPIRED_TOKEN',
                    });
                }
            }
            res.locals.payload = decoded;
            return next();
        });
    } catch (error) {
        return res.status(401).send({
            message: 'INVALID_TOKEN',
        });
    }
}