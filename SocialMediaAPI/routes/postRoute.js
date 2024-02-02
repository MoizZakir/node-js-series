import  express  from "express";
import { postCreateController, postUpdateController,postDeleteController } from "../controller/postController.js";

const postRouter= express.Router()
// postRouter.get("/allpost",allPostController)
postRouter.post('/',postCreateController)
postRouter.put('/:id',postUpdateController)
postRouter.delete('/:id',postDeleteController)

export {postRouter}