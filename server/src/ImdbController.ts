import pool from './dbconfig';

class ImdbController {

  public async get(req:any, res:any) {
    try {
      const client = await pool.connect();
      let query:string;
      let params = [""];

      if(req.params.movieId) {
        params = [req.params.movieId];
        query = "SELECT * FROM title_basics WHERE tconst = $1";
      }else{
        query = "SELECT * FROM title_basics LIMIT 20";
      }
      console.log(query);
      console.log(params);
      const { rows } = await client.query(query, params);

      const movies = rows;

      client.release();

      res.status(200).send(movies);

    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

}

export default ImdbController;
