import express, { Router } from "express";
import MovieController from "./MovieController";

const router = Router();
const movieController = new MovieController();

router.get("/", movieController.get);
router.get("/:movieId", movieController.get);
router.get("/:movieId/:userId", movieController.get);

export default router;
