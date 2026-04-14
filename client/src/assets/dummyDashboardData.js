// src/assets/dummyDashboardData.js
import interstellar from "./interstellar.jpg";
import batman from "./batman.jpg";
import cars from "./cars.jpg";

const dummyDashboardData = {
    totalBookings: 1248,
    totalRevenue: 45600,
    totalUser: 892,
    activeShows: [
        {
            _id: "show_001",
            poster: interstellar,
            movie: {
                title: "Interstellar",
                vote_average: 8.6
            },
            showPrice: 18.50,
            showDateTime: "2026-04-15T19:00:00"
        },
        {
            _id: "show_002",
            poster: batman,
            movie: {
                title: "Batman Begins",
                vote_average: 8.2
            },
            showPrice: 15.00,
            showDateTime: "2026-04-16T21:30:00"
        },
        {
            _id: "show_003",
            poster: cars,
            movie: {
                title: "Cars",
                vote_average: 7.1
            },
            showPrice: 12.00,
            showDateTime: "2026-04-17T14:15:00"
        }
    ]
};

export default dummyDashboardData;