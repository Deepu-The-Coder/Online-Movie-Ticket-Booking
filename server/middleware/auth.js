//protect the admin routes 
import { clerkClient } from "@clerk/express";

export const protectAdmin = async(req,resizeBy,next)=>{
    try{
        const {userId} = req.auth();

        const user = await clerkClient.users.getUser(userId)

        if(user.privateMeta.role !== 'admin'){
            return res.json({success: false , message: "not authorised"})
        }
        next();
    }
    catch(error){
        return res.json({success: false , message: "not authorised"})

    }
}
