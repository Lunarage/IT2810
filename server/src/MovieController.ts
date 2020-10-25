import pool from './dbconfig';

class MovieController {

  public async get(request:any, response:any) {
    try {
      const client = await pool.connect();
      const responseLimit = 20;

      if(request.params.movieId) {
        const query = "SELECT * FROM title_basics WHERE tconst = $1";
        const params = [request.params.movieId];
        const { rows } = await client.query(query, params);
        client.release();
        response.status(200).send(rows);
      }else{
        let parameters = [];
        let parameterCount = 0;
        let query = "SELECT * FROM title_basics";
        if(request.query.title){
          parameterCount++;
          query += " WHERE (primary_title ILIKE $" + parameterCount;
          parameters.push("%"+request.query.title+"%");
          parameterCount++;
          query += " OR original_title ILIKE $" + parameterCount + ")";
          parameters.push("%"+request.query.title+"%");
        }
        parameterCount++;
        query += " LIMIT $" + parameterCount;
          parameters.push(responseLimit);
        if(Number(request.query.page)){
          const offset = Number(request.query.page) * responseLimit;
          parameterCount++;
          query += " OFFSET $" + parameterCount;
          parameters.push(offset);
        }
        const { rows } = await client.query(query, parameters);
        client.release();
        response.status(200).send(rows);
      }

    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  }

}

export default MovieController;
