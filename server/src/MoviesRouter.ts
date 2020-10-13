import express, { Router } from "express";
import ImdbController from "./ImdbController";

const router = Router();
const imdbController = new ImdbController();

router.get('/', imdbController.get);

export default router;
