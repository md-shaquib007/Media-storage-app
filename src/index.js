import dotenv from "dotenv";

import { app } from "./app.js";

import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env",
});

connectDB()
    .then(() => {
        if (!process.env.VERCEL) {
            app.listen(process.env.PORT || 8000, () => {
                console.log("Server is running on port : ", process.env.PORT);
            });
        }
    })
    .catch((error) => {
        console.log("MongoDB connect failed : ", error);
    });

export default app;
