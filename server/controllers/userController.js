import User from "../models/User.js";
import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";


//API COntroller Func to Get user bookings
export const getUserBookings = async(req,res) =>{
    try {
        const user = req.auth().userId;

        const bookings = await Booking.find({user}).populate({
            path:'show',
            populate:{path: "movie"}
        }).sort({createdAt :-1})

        res.json({success:true, bookings})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})   
    }
}

//API Controller Function to Add Favourite Movie in Clerk MetaData

export const updateFavorite = async(req,res) => {
    try {
        const {movie_id} = req.body;
        const userId = req.auth().userId;

        const user = await clerkClient.users.getUser(userId)

        if(!user.privateMetadata.favorites){
            user.privateMetadata.favorites=[]
        }

        if(!user.privateMetadata.favorites.includes(movie_id)){
            user.privateMetadata.favorites.push(movie_id)
        }else{
            user.privateMetadata.favorites=user.privateMetadata.favorites.filter(item =>item !==movie_id)
        }

        await clerkClient.users.updateUserMetadata(userId,{privateMetadata:user.privateMetadata})

        res.json({success: true , message:'Favorite movie updated'})

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})   
    }
}


export const getFavorites = async (req,res) =>{
    try {
        const user = await clerkClient.users.getUser(req.auth(userId))
        const favorites = user.privateMetadata.favorites;

        //Getting movies from database
        const movies = await Movie.find({_id: {$in: favorites}})

        res.json({success:true, movies})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}