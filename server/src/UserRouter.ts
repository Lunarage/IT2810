/**
 * @file Routing table for paths related to users.
 */
import { Router } from "express";
import UserController from "./UserController";

// Merge parameters to gain access to parameters from earlier in the path
const router = Router({ mergeParams: true });
const userController = new UserController();

// Specify routes for
// `/user`
//
// Get a spesific user
router.get("/:userId", userController.get);
// Create a user
router.put("/:userId", userController.create);
// Delete a user
router.delete("/:userId", userController.delete);

export default router;
