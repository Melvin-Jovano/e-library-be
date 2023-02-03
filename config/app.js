import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    APP_NAME: 'INSOMNIA',
    APP_PORT: process.env.APP_PORT,
    SOCKET_PORT: process.env.SOCKET_PORT,
    ACCESS_TOKEN_SECRET_USER: 'roses-are-red',
    REFRESH_TOKEN_SECRET_USER: 'violets-are-blue',

    ACCESS_TOKEN_SECRET_ADMIN: 'roses-are-blue',
    REFRESH_TOKEN_SECRET_ADMIN: 'violets-are-red',

    IMG_LIMIT_SIZE: (1 * 1024 * 1024),
    IMG_UPLOAD_DIR: 'public/images',
}

export default config;