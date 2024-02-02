import  express  from "express";
import user from "../model/user.js";
import { userDeleteController, userFollowController, userGetController, userUnFollowController, userUpdateController } from "../controller/userController.js";
const userRouter= express.Router()


//update User

userRouter.put('/:id',userUpdateController)
userRouter.delete('/:id',userDeleteController)
userRouter.get('/:id',userGetController)
userRouter.put('/:id/follow',userFollowController)
userRouter.put('/:id/unfollow',userUnFollowController)


export { userRouter}
