import express, { Router } from "express";
import MovieController from "./MovieController";

const router = Router();
const movieController = new MovieController();

router.get("/", movieController.searchMovies);
router.get("/:movieId", movieController.getMovie);

export default router;
