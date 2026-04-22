import { clerkClient } from "@clerk/express";

export const protectAdmin = async (req, res, next) => {
    try {
        // 1. Remove the parenthesis (req.auth is an object)
        const { userId } = req.auth;

        // Optional safety check: Ensure they are actually logged in
        if (!userId) {
            return res.json({ success: false, message: "Not logged in" });
        }

        const user = await clerkClient.users.getUser(userId);

        // 2. Change privateMeta to privateMetadata
        if (user.privateMetadata.role !== 'admin') {
            return res.json({ success: false, message: "Not authorised" });
        }
        
        next();
    } catch (error) {
        // Tip: Always log the error in your catch block so you can see if Clerk goes down!
        console.log("Admin Middleware Error:", error.message); 
        return res.json({ success: false, message: "Not authorised" });
    }
}


// //protect the admin routes 
// import { clerkClient } from "@clerk/express";

// export const protectAdmin = async(req,res,next)=>{
//     try{
//         const {userId} = req.auth();

//         const user = await clerkClient.users.getUser(userId)

//         if(user.privateMeta.role !== 'admin'){
//             return res.json({success: false , message: "not authorised"})
//         }
//         next();
//     }
//     catch(error){
//         return res.json({success: false , message: "not authorised"})

//     }
// }
