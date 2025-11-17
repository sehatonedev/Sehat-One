import jwt from 'jsonwebtoken'

// user authentication middleware
const authUser = async (req, res, next) => {
    const headerToken = req.headers.token || req.headers.authorization?.split(' ')[1]

    if (!headerToken) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }

    try {
        const token_decode = jwt.verify(headerToken, process.env.JWT_SECRET)

        // Ensure req.body exists even for GET requests without payload
        if (!req.body || typeof req.body !== 'object') {
            req.body = {}
        }

        req.userId = token_decode.id
        req.body.userId = token_decode.id

        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authUser;