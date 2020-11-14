/**
 * @file Routing table for paths related to movies.
 */
import { Router } from "express";
import MovieController from "./MovieController";

// Merge parameters to gain access to parameters from earlier in the path
const router = Router({ mergeParams: true });
const movieController = new MovieController();

// Specify routes for
// `/movie`
//
// Search for movies
router.get("/", movieController.searchMovies);
// Get a spesific moivie
router.get("/:movieId", movieController.getMovie);

export default router;
