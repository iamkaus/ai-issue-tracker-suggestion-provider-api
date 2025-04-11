import { aj } from '../config/arcjet.config.js';

export const arcjetRateLimitingMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(
            req,
            {
                requested: 1
            }
        );

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json(
                    {
                        error: 'Too many requests. Rate limit exceeded',
                    }
                )
            }

            else if (decision.reason.isBot()) {
                return res.status(403).json(
                    {
                        error: 'Bot detected. No bots allowed'
                    }
                )
            }

            return res.status(403).json({ error: "Access denied" });
        }
        next();
    } catch ( error ) {
        console.error(`Arcjet Rate Limiting Middleware Error:  ${error}`);
    }
}