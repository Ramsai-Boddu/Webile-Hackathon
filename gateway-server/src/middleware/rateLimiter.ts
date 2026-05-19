import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        message: "Too many requests. Try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
});

export default rateLimiter;