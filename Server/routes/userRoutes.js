import express from "express";
import {
  getFavorited,
  getUserBooking,
  updateFavorited,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/booking", getUserBooking);
userRouter.post("/update-favorite", updateFavorited);
userRouter.get("/favorites", getFavorited);

export default userRouter;
