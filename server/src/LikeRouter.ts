import express, { Router } from "express";
import LikeController from "./LikeController";

const router = Router({ mergeParams: true });
const likeController = new LikeController();

router.get("/", likeController.getList);
router.get("/:movieId", likeController.get);
router.put("/:movieId", likeController.put);
router.delete("/:movieId", likeController.delete);

export default router;
