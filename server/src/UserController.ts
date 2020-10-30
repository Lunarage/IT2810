import pool from "./dbconfig";

class UserController {
  public async get(request: any, response: any) {
    let client = null;
    const query = "SELECT * FROM users WHERE username = $1";
    const parameters = [request.params.userId];
    try {
      if (request.params.userId) {
        client = await pool.connect();
        const { rows } = await client.query(query, parameters);
        client.release();
        //TODO: Check if user exists?
        response.status(200).send(rows);
      } else {
        response.status(404).send("User not specified");
      }
    } catch (error) {
      console.error(error);
      response.status(400).send(error);
    } finally {
      if (client != null) {
        client.release();
      }
    }
  }

  public async put(request: any, response: any) {
    let client = null;
    const query =
      "INSERT INTO users VALUES ($1) ON CONFLICT ON CONSTRAINT users_pk DO NOTHING RETURNING username";
    const parameters = [request.params.userId];
    try {
      if (request.params.userId) {
        client = await pool.connect();
        const { rows } = await client.query(query, parameters);
        console.log(rows);
        response.status(200).send(rows);
      } else {
        response.status(404).send("User not specified");
      }
    } catch (error) {
      console.error(error);
      response.status(400).send(error);
    } finally {
      if (client != null) {
        client.release();
      }
    }
  }

  public async delete(request: any, response: any) {
    let client = null;
    const query = "DELETE FROM users WHERE username = $1 RETURNING username";
    const parameters = [request.params.userId];
    try {
      if (request.params.userId) {
        client = await pool.connect();
        const { rows } = await client.query(query, parameters);
        response.status(200).send(rows);
      } else {
        response.status(404).send("User not found");
      }
    } catch (error) {
      console.error(error);
      response.status(400).send(error);
    } finally {
      if (client != null) {
        client.release();
      }
    }
  }
}

export default UserController;
