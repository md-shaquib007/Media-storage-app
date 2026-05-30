import ApiError from "../util/ApiError.js";

describe("ApiError class", () => {
    test("should construct properly with message and status code", () => {
        const error = new ApiError(404, "Not Found");
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe("Not Found");
        expect(error.success).toBe(false);
        expect(error.data).toBeNull();
    });

    test("should use default message if none is provided", () => {
        const error = new ApiError(500);
        expect(error.message).toBe("Something went wrong");
    });
});
