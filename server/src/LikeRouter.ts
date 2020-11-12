/**
 * @file Routing table for paths related to likes.
 */
import { Router } from "express";
import LikeController from "./LikeController";

// Merge parameters to gain access to parameters from earlier in the path
const router = Router({ mergeParams: true });
const likeController = new LikeController();

// Specify routes for
// `/user/:userId/likedMovies/`
//
// Get all liked movies for a user
router.get("/", likeController.getAll);
// Get liked status for a specific movie
router.get("/:movieId", likeController.get);
// Like a movie for a user
router.put("/:movieId", likeController.like);
// Unlike a movie for a user
router.delete("/:movieId", likeController.unlike);

export default router;
