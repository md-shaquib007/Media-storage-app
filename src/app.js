import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongosanitize from "express-mongo-sanitize";
import ApiError from "./util/ApiError.js";

const app = express();

app.use((req, res, next) => {
    Object.defineProperty(req, "query", {
        value: { ...req.query },
        writable: true,
        configurable: true,
        enumerable: true,
    });
    next();
});

app.use(mongosanitize());

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

//routes import
import router from "./route/user.route.js";

app.use("/api/v1/users", router);

//Implemented custom JSON error handler middleware to correctly catch and format thrown ApiError objects instead of falling back to Express's HTML output
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors || err.error || [],
        data: null,
    });
});

export { app };
