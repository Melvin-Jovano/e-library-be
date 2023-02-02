import { Server } from "socket.io";
import { createServer } from "http";
import { validateAccessTokenUser } from "../middlewares/jwt_socket.js";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class SocketLoader {
    constructor(app, port, room) {
        const server = createServer(app);
        this.io = new Server(server, {
            cors : {
                origin : "*"
            }
        });

        this.socket = this.io.of(`${room}`);
        this.io.listen(port);
        this.socket.use(validateAccessTokenUser);

        this.socket.on("connect", (socket) => {
            if (!socket.param.authenticated) {
                socket.emit('auth', false);
                socket.disconnect();
            } else {
                socket.emit('auth', true);
                socket.join(room);

                socket.on('create-order', async (body) => {
                    const order = await prisma.order.create({
                        data: {
                            book_id: body.bookId,
                            user_id: body.userId
                        }
                    });
                    await prisma.book.update({
                        where: {
                            id: body.bookId
                        },
                        data: {
                            stock: {
                                decrement: 1
                            }
                        }
                    });
                    socket.emit('created-order', order);
                });

                socket.on('delete-order', async (body) => {
                    const order = await prisma.order.deleteMany({
                        where: {
                            book_id: body.bookId,
                            user_id: body.userId
                        },
                    });
                    await prisma.book.update({
                        where: {
                            id: body.bookId
                        },
                        data: {
                            stock: {
                                increment: 1
                            }
                        }
                    });
                    socket.emit('deleted-order', {user_id: body.userId});
                });
            }
        });
    }
}