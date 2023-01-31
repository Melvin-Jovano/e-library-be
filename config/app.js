import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    APP_NAME: 'Twitter 2.0',
    APP_PORT: process.env.APP_PORT,
    CHAT_SOCKET_PORT: process.env.CHAT_SOCKET_PORT,
    ACCESS_TOKEN_SECRET_USER: 'roses-are-red',
    REFRESH_TOKEN_SECRET_USER: 'violets-are-blue',

    ACCESS_TOKEN_SECRET_ADMIN: 'roses-are-red',
    REFRESH_TOKEN_SECRET_ADMIN: 'violets-are-blue'
}

export default config;