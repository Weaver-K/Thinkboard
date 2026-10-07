import ratelimit from '../config/upstash.js'

const rateLimiter = async (req, res, next) => {
    try {
        const clientKey =
            req.ip ||
            req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
            'anonymous'

        const { success } = await ratelimit.limit(clientKey)

        if (!success) {
            return res.status(429).json({
                message: 'Too many requests, please try again later',
            })
        }

        next()
    } catch (error) {
        console.log('Rate limit error', error)
        next(error)
    }
}

export default rateLimiter
