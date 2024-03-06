import socket from "socket.io";
import dotenv from 'dotenv';
import logger from "./logger";

dotenv.config();
const port = +(process.env.PORT || "8002");

class App {

    public io: socket.Server;

    constructor() {
        this.io = new socket.Server(port, {cors: { origin: '*'}});
        this.pipes();
    }

    private pipes(): void { 
        logger.info(`Server is running at https://localhost:${port}`);
        this.io.on("connection", (socket) => {
            socket.on("shared-identity-provider", (args) => {
                logger.info(`Emitiendo un shared-identity-provider-client`);
                socket.to(args.to).emit('shared-identity-provider-client', args.content);
            });
            socket.on("shared-identity-provider-2", (args) => {
                logger.info(`Emitiendo un shared-identity-provider-2-client`);
                socket.to(args.to).emit('shared-identity-provider-2-client', args.content);
            });
            socket.on("shared-identity-ask", (args) => {
                logger.info(`Emitiendo un shared-identity-ask-client`);
                socket.to(args.to).emit('shared-identity-ask-client', args.content);
            });
            socket.on("shared-identity-opendoor", (args) => {
                logger.info(`Emitiendo un shared-identity-opendoor-client`);
                socket.to(args.to).emit('shared-identity-opendoor-client', args.content);
            });
            socket.on("shared-identity-custom", (args) => {
                logger.info(`Emitiendo un shared-identity-custom-client`);
                socket.to(args.to).emit('shared-identity-custom-client', args.content);
            });
            socket.on("shared-identity-custom-2", (args) => {
                logger.info(`Emitiendo un shared-identity-custom-2-client`);
                socket.to(args.to).emit('shared-identity-custom-2-client', args.content);
            });
            socket.on("shared-identity", (args) => {
                logger.info(`Emitiendo un shared-identity-client`);
                socket.to(args.to).emit('shared-identity-client', args.content);
            });
            socket.on("shared-credential", (args) => {
                logger.info(`Emitiendo un shared-credential-client`);
                socket.to(args.to).emit('shared-credential-client', args.content);
            });
            socket.on("vc-downloaded", (args) => {
                logger.info(`Emitiendo un vc-downloaded-client`);
                socket.to(args.to).emit('vc-downloaded-client', args.content);
            });
            socket.on("access-history", (args) => {
                socket.broadcast.emit('access-history-client', args.content);
            });
        });
    }
}

export default new App().io;