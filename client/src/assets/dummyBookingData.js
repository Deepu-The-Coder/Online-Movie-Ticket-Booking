// src/assets/dummyBookingData.js
import cars from "../assets/cars.jpg"
import batman from "../assets/batman.jpg"
const dummyBookingData = [
  {
    user:{
      name: "Deepak"
    },
    // The "show" object contains both the movie details and the specific time
    show: {
      movie: {
        title: "Cars",
        image: cars, // You can replace this with your actual image paths/imports
        runtime: 120
      },
      showDateTime: "15 Apr 2026, 10:30 AM"
    },
    // I added these extras below just in case you want to display them later!
    bookingId: "BKG-98765",
    amount: 24.00,
    isPaid: true, // "Pay Now" button will be HIDDEN
    bookedSeats: ["A1", "A2"]
  },
  {
    user:{
      name: "Deepak"
    },
    show: {
      movie: {
        title: "Batman",
        image: batman,
        runtime: 117
      },
      showDateTime: "16 Apr 2026, 06:00 PM"
    },
    bookingId: "BKG-12345",
    
    amount: 45.00,
    isPaid: false, // "Pay Now" button will be VISIBLE
    bookedSeats: ["J14", "J15", "J16"]

  }
];

export default dummyBookingData;