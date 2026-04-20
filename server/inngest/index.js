import { Inngest } from "inngest";
import User from "../models/User.js";

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


// Export all functions
export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation
];