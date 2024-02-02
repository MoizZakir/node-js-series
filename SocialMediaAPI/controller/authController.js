import UserSchema from "../model/user.js"
import bycrypt from 'bcrypt'
//user Regsiter
const signupController=async(req,res)=>{

    try {
        //set new Password
        const salt = await  bycrypt.genSalt(10)
        const hashedPassword= await bycrypt.hash(req.body.password,salt)

        //create user
        const userData= req.body
        const UsersSchemaCheck=await new UserSchema({
           username: userData.username,
           email:userData.email,
           password:hashedPassword,

        })

        // send data
        const userCheck=await UsersSchemaCheck.save(UsersSchemaCheck)
        if(userCheck){
            console.log('data added')
            res.json(userCheck)
        }
        
    } catch (error) {
        res.json(error.message)
    }
}

//user login
const loginController=async(req,res)=>{
try{
    const {email,password}=req.body
    const isUser=await UserSchema.findOne({email:email})
    // const salt = await  bycrypt.genSalt(10)
    console.log(isUser)
   
if(!isUser)  return (res.json({status:false,message:"user not Found"} ))



const validPassword =await bycrypt.compare(password,isUser.password)
        // console.log(hashedPassword)
        if(!validPassword) return  res.json({
                            status:false,
                            message:"Invalid Credeintails",
                            
                        }
                        )

                        else{
                            return res.json({
                                                status:true,
                                                message:"loginSuccefully"
                                            }
                                            )
                        }
}
    catch(err){
        res.json({
            status:false,
            message:err.message
        })

  



    

}

//         if (isUser.password==hashedPassword){

//             res.json({
//                 status:true,
//                 message:"loginSuccefully"
//             }
//             )
//         }
//         else{
//             res.json({
//                 status:false,
//                 message:"Invalid Credeintails",
                
//             }
//             )

//         }
//         // res.send("userFound")
    
//     // else{
//     //     res.json({
//     //         status:false,
//     //         message:"user not Found"
//     //     }
//     //     )

//     // }
// }
//     catch(err){
//         res.json({
//             status:false,
//             message:err.message
//         })

  



    

// }

}


//get all user



export {signupController,loginController}