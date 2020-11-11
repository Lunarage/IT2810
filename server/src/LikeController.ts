import pool from "./dbconfig";
import { Request, Response } from "express";

class LikeController {
    public async getList(request: Request, response: Response) {
        try {
            const client = await pool.connect();
            const query =
                "SELECT title_basics.*, true AS liked " +
                "FROM title_likes " +
                "JOIN title_basics ON title_likes.tconst = title_basics.tconst " +
                "WHERE title_likes.username = $1";
            const parameters = [request.params.userId];
            console.log(query);
            console.log(parameters);
            const { rows } = await client.query(query, parameters);
            client.release();
            response.status(200).send(rows);
        } catch (error) {
            console.log(error);
            response.status(400).send(error);
        }
    }

    public async get(request: Request, response: Response) {
        try {
            const client = await pool.connect();
            const query =
                "SELECT CASE WHEN EXISTS (SELECT true FROM title_likes WHERE username = $1 AND tconst = $2) THEN 'true' else 'false' END as liked";
            const parameters = [request.params.userId, request.params.movieId];
            const { rows } = await client.query(query, parameters);
            client.release();
            response.status(200).send(rows);
        } catch (error) {
            console.log(error);
            response.status(400).send(error);
        }
    }

    public async put(request: Request, response: Response) {
        let client = null;
        try {
            client = await pool.connect();
            const query =
                "INSERT INTO title_likes VALUES ($1, $2) ON CONFLICT ON CONSTRAINT title_likes_pk DO NOTHING RETURNING true AS liked";
            const parameters = [request.params.userId, request.params.movieId];
            console.log(query);
            console.log(parameters);
            const { rows } = await client.query(query, parameters);
            response.status(200).send(rows);
        } catch (error) {
            console.log(error);
            response.status(400).send(error);
        } finally {
            if (client != null) {
                client.release();
            }
        }
    }

    public async delete(request: Request, response: Response) {
        let client = null;
        const query =
            "DELETE FROM title_likes WHERE username = $1 AND tconst = $2 RETURNING false AS liked";
        const parameters = [request.params.userId, request.params.movieId];
        try {
            client = await pool.connect();
            const { rows } = await client.query(query, parameters);
            response.status(200).send(rows);
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

export default LikeController;
