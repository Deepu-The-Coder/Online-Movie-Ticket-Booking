import { clerkClient } from "@clerk/express";

export const protectAdmin = async (req, res, next) => {
  try {
    console.log("Auth header:", req.headers.authorization);
    console.log("Auth object:", req.auth());
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not logged in" });
    }

    const user = await clerkClient.users.getUser(userId);

    if (user.privateMetadata?.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorised" });
    }

    
    // return res.status(200).json({ success: true, message: "Welcome Admin!" });

    next();
  } catch (error) {
    console.log("Admin Middleware Error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

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
