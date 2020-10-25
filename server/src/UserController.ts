import pool from './dbconfig';

class UserController {

  public async get(request:any, response:any) {
    try {
      if(request.params.userId) {
        const client = await pool.connect();
        const query = "SELECT * FROM users WHERE username = $1";
        const parameters = [request.params.userId];
        const { rows } = await client.query(query, parameters);
        client.release()
        //TODO: Check if user exists?
        response.status(200).send(rows);
      }else{
        response.status(404).send("User not specified");
      }
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  }

  public async put(request:any, response:any) {
    try {
      if(request.params.userId){
        const client = await pool.connect();
        const query = "INSERT INTO users VALUES ($1) ON CONFLICT ON CONSTRAINT users_pk DO NOTHING RETURNING username";
        const parameters = [request.params.userId];
        const { rows } = await client.query(query, parameters);
        client.release();
        response.status(200).send(rows);
      }else{
        response.status(404).send("User not specified");
      }
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  }

  public async delete(request:any, response:any) {
    try {
      if(request.params.userId) {
        const client = await pool.connect();
        const query = "DELETE FROM users WHERE username = $1 RETURNING username";
        const parameters = [request.params.userId];
        const { rows } = await client.query(query, parameters);
        client.release()
        response.status(200).send(rows);
      }else{
        response.status(404).send("User not found");
      }
    } catch (error) {
      console.log(error);
      response.status(400).send(error);
    }
  }
}

export default UserController;
