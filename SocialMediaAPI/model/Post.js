import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    userId:{
        type:String,
        require:true,
        immutable: true,
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String,
        
    },
    likes:{
        type:Array,
        default:[]
        
    }
    
},
{timestamps:true})

export default mongoose.model("Post",UserSchema)