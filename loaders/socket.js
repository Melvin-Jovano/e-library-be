import { Server } from "socket.io";
import { createServer } from "http";
import { validateAccessToken } from "../middlewares/jwt_socket.js";

export default class SocketLoader {
    constructor(app, port, room) {
        const server = createServer(app);
        this.io = new Server(server, {
            cors : {
                origin : "*"
            }
        });

        this.socket = this.io.of("/chatting");
        this.io.listen(port);
        this.socket.use(validateAccessToken);

        this.socket.on("connect", (socket) => {
            if (!socket.param.authenticated) {
                socket.emit('auth', false);
                socket.disconnect();
            } else {
                socket.emit('auth', true);
                socket.join(room);
            }
        });
    }
}