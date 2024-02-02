import Users from "../model/user.js"
import bycrypt from 'bcrypt'

//update a user
const userUpdateController= async (req,res)=>{
        if (req.body._id==req.params.id){
            if (req.body.password){
                try {
                    const salt = await bycrypt.genSalt(10)
                    req.body.password= await bycrypt.hash(req.body.password,salt)

                } catch (error) {
                    return res.status(402).json(error)
                    
                }
            }
            try {
                const user= await Users.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                })
                res.status(200).json('userUpdate Successfully')
            } catch (error) {
                res.status(400).json(error)
                
            }
        }
        else{
            return res.status(403).json('You can only update your Account')

        }

}
//delete a user
const userDeleteController=async (req,res)=>{

 if (req.body._id==req.params.id){
            try {
                const user= await Users.deleteOne({_id:req.params.id})
                res.status(200).json('Acount Deleted Successfully')
            } catch (error) {
                res.status(400).json(error)
                
            }
        }
        else{
            return res.status(403).json('You can only Delete your Account')

        }
}

// get a user
const userGetController= async (req,res)=>{

    try {
        const user= await Users.findById(req.params.id)
        const {password,updatedAt,...other}=user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(400).json(error)
        
    }



}

// follow a user 
const userFollowController=async(req,res)=>{
    if(req.body._id!=req.params.id){
        try {
            const user =await Users.findById(req.params.id)
            const currentUser =await Users.findById(req.body._id)
            
            if(!user.follower.includes(req.body._id)
            )
        {
            await user.updateOne({$push:{follower:req.body._id}})
            await currentUser.updateOne({$push:{following:req.params.id}})

            res.status(200).json('user follow Succesfully ')
        }
            else{
                res.status(400).json("You have Already follow this user")
            }

        } catch (error) {
            res.status(400).json(error)
            
        }
    }
    else{
        res.status(403).json('you can not follow yourself')
       
    }
}

//unfollow a user
const userUnFollowController=async(req,res)=>{
    if(req.body._id!=req.params.id){
        try {
            const user =await Users.findById(req.params.id)
            const currentUser =await Users.findById(req.body._id)
            
            if(user.follower.includes(req.body._id)
            )
        {
            await user.updateOne({$pull:{follower:req.body._id}})
            await currentUser.updateOne({$pull:{following:req.params.id}})

            res.status(200).json('user unfollow Succesfully ')
        }
            else{
                res.status(400).json("You have Already unfollow this user")
            }

        } catch (error) {
            res.status(400).json(error)
            
        }
    }
    else{
        res.status(403).json('you can not unfollow yourself')
       
    }
}






export {userUpdateController,userDeleteController,userGetController,userFollowController,userUnFollowController}
