"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const upstash_1 = require("../config/upstash");
const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await upstash_1.rateLimit.limit("user-id");
        if (!success) {
            return res
                .status(429)
                .json({ message: "Too many request please try again later." });
        }
        next();
    }
    catch (error) {
        console.error("Error in the rate limiting middleware", error);
    }
};
exports.rateLimiter = rateLimiter;
