import express from "express";
import bodyParser from "body-parser";
import router from "./MoviesRouter";
import pool from './dbconfig';


class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbConnect();
  }

  private config() {
    this.app.use(bodyParser.urlencoded({ extended:true}));
    this.app.use(bodyParser.json({ limit: '1mb'}));
  }

  private routerConfig() {
    this.app.use('/movies/', router);
    this.app.use('/movies/:movieId', router);
  }

  private dbConnect() {
    pool.connect(function (err,client,done) {
      if (err) throw new Error(err.message);
      console.log('Connected');
    });
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app.listen(port, () => {
        resolve(port);
      }).on('error', (err: Object) => reject(err));
    });
  }
}

export default Server;
