import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Mock environment variables
process.env.ACCESS_TOKEN_SECRET = "test_access_secret";
process.env.REFRESH_TOKEN_SECRET = "test_refresh_secret";
process.env.ACCESS_TOKEN_EXPIRY = "1h";
process.env.REFRESH_TOKEN_EXPIRY = "7d";

describe("User model methods", () => {
    let userData;

    beforeEach(() => {
        userData = {
            username: "testuser",
            email: "test@example.com",
            fullName: "Test User",
            avatar: "http://example.com/avatar.jpg",
            password: "password123",
        };
    });

    test("should generate access token correctly", () => {
        const user = new User(userData);
        const token = user.generateAccessToken();
        expect(token).toBeDefined();

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        expect(decoded._id).toBe(user._id.toString());
        expect(decoded.email).toBe(user.email);
    });

    test("should generate refresh token correctly", () => {
        const user = new User(userData);
        const token = user.generateRefreshToken();
        expect(token).toBeDefined();

        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        expect(decoded._id).toBe(user._id.toString());
    });

    test("isPasswordCorrect should return true for correct password and false otherwise", async () => {
        const hashedPassword = await bcrypt.hash("password123", 10);
        const user = new User({
            ...userData,
            password: hashedPassword,
        });

        const isCorrect = await user.isPasswordCorrect("password123");
        expect(isCorrect).toBe(true);

        const isIncorrect = await user.isPasswordCorrect("wrongpassword");
        expect(isIncorrect).toBe(false);
    });
});
