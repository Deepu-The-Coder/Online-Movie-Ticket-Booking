import { Inngest } from "inngest";
import User from "../models/User.js";
import Booking from "../models/Booking.js"
import Show from "../models/Show.js";
import sendEmail from "../configs/nodeMailer.js";

// Create Inngest client
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Helper function to format user data safely
const formatUser = (data) => {
    const { id, first_name, last_name, email_addresses, image_url } = data;

    return {
        _id: id,
        email: email_addresses?.[0]?.email_address || "",
        name: `${first_name || ""} ${last_name || ""}`.trim(),
        image: image_url || ""
    };
};


// 🔵 CREATE USER (or sync)
const syncUserCreation = inngest.createFunction(
    {
        id: "sync-user-from-clerk",
        triggers: [{ event: "clerk/user.created" }]   // ✅ FIXED
    },
    async ({ event }) => {
        try {
            const userData = formatUser(event.data);

            await User.findByIdAndUpdate(userData._id, userData, {
                upsert: true,
                new: true
            });

            console.log("User created/synced:", userData._id);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    }
);


// 🔴 DELETE USER
const syncUserDeletion = inngest.createFunction(
    {
        id: "delete-user-with-clerk",
        triggers: [{ event: "clerk/user.deleted" }]   // ✅ FIXED
    },
    async ({ event }) => {
        try {
            const { id } = event.data;

            await User.findByIdAndDelete(id);

            console.log("User deleted:", id);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }
);


// 🟡 UPDATE USER
const syncUserUpdation = inngest.createFunction(
    {
        id: "update-user-from-clerk",
        triggers: [{ event: "clerk/user.updated" }]   // ✅ FIXED
    },
    async ({ event }) => {
        try {
            const userData = formatUser(event.data);

            await User.findByIdAndUpdate(userData._id, userData, {
                upsert: true,
                new: true
            });

            console.log("User updated:", userData._id);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }
);

//Inngest Function to cancel booking and release seats of show after 10 minutes of booking created if payment os not done

const releaseSeatsAndDeleteBooking = inngest.createFunction(
    {
        id: 'release-seats-delete-booking',
        triggers:[{event: 'app/checkpayment'}]
    },
    async({event,step}) =>{
        const tenMinutesLater = new Date(Date.now() + 10 *60*1000);
        await step.sleepUntil('wait-for-10-minutes', tenMinutesLater)
        
        await step.run('check-payment-status' , async()=>{
            const bookingId = event.data.bookingId;
            const booking = await Booking.findById(bookingId)

            //If payment is not made,release seats and delete bookings
            if(!booking.isPaid){
                const show= Show.findById(booking.show);
                booking.bookedSeats.forEach((seat)=>{
                    delete show.occupiedSeats[seat]
                })
                show.markModified('occupiedSeats')
                await show.save()
                await Booking.findByIdAndDelete(booking._id)
            }
        })

    }
)

//Inngest function to send email when user books a show
const sendBookingConfirmationEmail = inngest.createFunction(
    {
        id: "send-booking-confirmation-email",
        triggers:[{event:"app/show.booked"}],
    },
    async({event,step})=>{
        const{bookingId} =event.data;

        const booking = await Booking.findById(bookingId).populate({
            path:'show',
            populate:{path:"movie" , model:"Movie"}
        }).populate('user');

        await sendEmail({
            to:booking.user.email,
            subject:`Payment Confirmation: "${booking.show.movie.title}" booked!`,
            body:`<div style="font-family: Arial, sans-serif; line-height:1.5;">
                <h2>Hi %{booking.user.name},</h2>
                <p>Your booking for <strong style="color: #F84565;">"${booking.show.movie.title}"</strong> is confirmed.</p>
                <p>
                <strong>Date:</strong> ${new Date(booking.show.showDateTime).toLocaleDateString('en-US', {timeZone:'Asia/Kolkata'})}
                <br/>
                <strong>Time:</strong> ${new Date(booking.show.showDateTime).toLocaleTimeString('en-US', {timeZone:'Asia/Kolkata'})}
                </p>
                <p>Enjoy the Show! 🍿</p>
                <p>Thanks for booking with us!<br/>- QuickWatch Team</p>
                </div>`
        })
    }
)
// Export all functions
export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,
    releaseSeatsAndDeleteBooking,
    sendBookingConfirmationEmail
];