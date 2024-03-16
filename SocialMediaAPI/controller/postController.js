import Post from "../model/Post.js"

const allPostController=(req,res)=>{
    res.send('all post hain')

}


//create post

const postCreateController=async(req,res)=>{
    const newPost= new Post(req.body)

    try {
        const savedPost= await newPost.save()
        return res.status(200).json(savedPost)

    } catch (error) {
        return res.status(400).json(error)
        
    }

}
//delete post 
const postDeleteController=async(req,res)=>{
    try{
        const findPost=await Post.findById(req.params.id)
        console.log(findPost)
        if(findPost.userId==req.body.userId){
            await findPost.deleteOne({_id:req.params.id})
            // await findPost.updateOne({$set:req.body})
            return res.status(200).json('post Deleted Suceesfully')
        }
        else{
            return res.status(400).json('No post Acess')
           
        }
    }
    
    catch(err){
        return res.status(500).json(err)

    }
}


// update post


const postUpdateController=async(req,res)=>{
    try{
        const findPost=await Post.findById(req.params.id)
        console.log(findPost)
        if(findPost.userId==req.body.userId){

            await findPost.updateOne({$set:req.body})
            return res.status(200).json('post Updated Suceesfully')
        }
        else{
            return res.status(400).json('No post Acess')
           
        }
    }
    
    catch(err){
        return res.status(500).json(err)

    }
}
//like post
const postLikeController=async(req,res)=>{
    try{
    const findPost=await Post.findById(req.params.id)
    if(!findPost.likes.includes(req.body.userId)){
        await Post.updateOne({$push:{likes:req.body.userId}})
        res.status(202).json('You liked the post')
    }
    else{
        await Post.updateOne({$pull:{likes:req.body.userId}})
        res.status(202).json('You disliked the post')

    }
    }
    catch(err){
       res.status.json(err);
    }
}

//get a post
const postGetController=async(req,res)=>{
    try{
    const findPost=await Post.findById(req.params.id)
    res.status(200).json(findPost)
    }
    catch(err){
        res.status(404).json('post not found')
    }

}

//get timeline post
const postTimlineController=async(req,res)=>{


    try{
        const findPost=await Post.findById(req.params.id)
        res.status(200).json(findPost)
        }
        catch(err){
            res.status(404).json('post not found')
        }
}

export{
    postCreateController,postUpdateController,postDeleteController,postLikeController,postGetController

}