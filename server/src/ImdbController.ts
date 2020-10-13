import pool from './dbconfig';

class ImdbController {

  public async get(req:any, res:any) {
    try {
      const client = await pool.connect();
      const sql = "SELECT * FROM title_basics LIMIT 20";
      const { rows } = await client.query(sql);
      const movies = rows;

      client.release();

      res.send(movies);

    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

}

export default ImdbController;
