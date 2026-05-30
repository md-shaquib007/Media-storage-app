import { ApiResponse } from "../util/ApiResponse.js";

describe("ApiResponse class", () => {
    test("should construct properly with status, data, and message", () => {
        const response = new ApiResponse(200, { key: "value" }, "Success message");
        expect(response.statusCode).toBe(200);
        expect(response.data).toEqual({ key: "value" });
        expect(response.message).toBe("Success message");
        expect(response.success).toBe(true);
    });

    test("should set success to false if statusCode >= 400", () => {
        const response = new ApiResponse(400, null, "Error occurred");
        expect(response.success).toBe(false);
    });
});
