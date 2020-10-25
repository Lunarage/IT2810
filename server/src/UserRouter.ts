import express, { Router } from "express";
import UserController from "./UserController";

const router = Router();
const userController = new UserController();

router.get('/:userId', userController.get);
router.put('/:userId', userController.put);
router.delete('/:userId', userController.delete);

export default router;
