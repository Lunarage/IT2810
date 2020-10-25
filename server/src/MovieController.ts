import pool from "./dbconfig";

class MovieController {
  public async get(request: any, response: any) {
    // Results per page
    const responseLimit = 20;
    // Define queries
    const queryGetMovieNoUser = "SELECT * FORM title_basics WHERE tconst = $1";
    const queryGetMovieUser =
      "WITH likes AS (" +
      " SELECT * FROM title_likes" +
      " WHERE username = $1)" +
      " SELECT title_basics.*" +
      ", CASE WHEN likes.username IS NOT NULL THEN 'true' ELSE 'false' END AS liked" +
      " FROM title_basics" +
      " LEFT JOIN likes ON title_basics.tconst = likes.tconst" +
      " WHERE title_basics.tconst = $2";
    try {
      const client = await pool.connect();

      if (request.params.movieId && request.params.userId) {
        // With userId and movieId
        const { rows } = await client.query(queryGetMovieUser, [
          request.params.userId,
          request.params.movieId,
        ]);
        client.release();
        response.status(200).send(rows);
      } else if (request.params.movieId) {
        // With movieId
        const { rows } = await client.query(queryGetMovieNoUser, [
          request.params.movieId,
        ]);
        client.release();
        response.status(200).send(rows);
      } else {
        // List all movies with limit and search parammeters
        let parameters = [];
        let parameterCount = 0;
        let query = "SELECT * FROM title_basics";
        if (
          request.query.title ||
          request.query.minYear ||
          request.query.maxYear ||
          request.query.genre ||
          request.query.titleType
        ) {
          query += " WHERE";
        }
        if (request.query.title) {
          parameterCount++;
          query += " (primary_title ILIKE $" + parameterCount;
          parameters.push("%" + request.query.title + "%");
          parameterCount++;
          query += " OR original_title ILIKE $" + parameterCount + ")";
          parameters.push("%" + request.query.title + "%");
        }
        if (request.query.minYear) {
          if (parameterCount > 0) {
            query += " AND";
          }
          parameterCount++;
          query += " start_year >= $" + parameterCount;
          parameters.push(request.query.minYear);
        }
        if (request.query.maxYear) {
          if (parameterCount > 0) {
            query += " AND";
          }
          parameterCount++;
          query += " start_year <= $" + parameterCount;
          parameters.push(request.query.maxYear);
        }
        if (request.query.genre) {
          if (parameterCount > 0) {
            query += " AND";
          }
          parameterCount++;
          query += " genres ILIKE $" + parameterCount;
          parameters.push("%" + request.query.genre + "%");
        }
        if (request.query.titleType) {
          if (parameterCount > 0) {
            query += " AND";
          }
          parameterCount++;
          query += " title_type = $" + parameterCount;
          parameters.push(request.query.titleType);
        }
        parameterCount++;
        query += " LIMIT $" + parameterCount;
        parameters.push(responseLimit);
        if (Number(request.query.page)) {
          const offset = Number(request.query.page) * responseLimit;
          parameterCount++;
          query += " OFFSET $" + parameterCount;
          parameters.push(offset);
        }
        console.log(query);
        console.log(parameters);
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
