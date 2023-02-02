import config from "../config/app.js";
import pkg from 'jsonwebtoken';

const { verify, TokenExpiredError } = pkg;

export const checkJWTUser = async (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];
        if(bearerHeader === undefined) {
            throw Error();
        }

        const token = bearerHeader.split(' ')[1];

        let payload = {};

        try {
            try {
                payload = verify(token, config.ACCESS_TOKEN_SECRET_USER);
            } catch (error) {
                if (error instanceof TokenExpiredError) {
                    return res.status(401).send({
                        message: 'EXPIRED_TOKEN',
                    });
                }
                payload = verify(token, config.ACCESS_TOKEN_SECRET_ADMIN);
            }
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                return res.status(401).send({
                    message: 'EXPIRED_TOKEN',
                });
            }
            return res.status(401).send({
                message: 'INVALID_TOKEN',
            });
        }

        res.locals.payload = payload;
        next();
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