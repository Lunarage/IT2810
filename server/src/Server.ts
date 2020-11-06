import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import movieRouter from "./MovieRouter";
import userRouter from "./UserRouter";
import likeRouter from "./LikeRouter";
import pool from "./dbconfig";

class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }

    private config() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json({ limit: "1mb" }));
        this.app.use(cors());
    }

    private routerConfig() {
        this.app.use("/movie/", movieRouter);
        this.app.use("/user/", userRouter);
        this.app.use("/user/:userId/likedMovies/", likeRouter);
    }

    private dbConnect() {
        pool.connect(function(err, client, done) {
            if (err) throw new Error(err.message);
            console.log("Connected");
        });
    }

    public start = (port: number) => {
        return new Promise((resolve, reject) => {
            this.app
                .listen(port, () => {
                    resolve(port);
                })
                .on("error", (err: Object) => reject(err));
        });
    };
}

export default Server;
