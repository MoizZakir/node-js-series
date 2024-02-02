import  express  from "express";
import { allPostController } from "../controller/postController.js";

const postRouter= express.Router()
postRouter.get("/allpost",allPostController)

export {postRouter}