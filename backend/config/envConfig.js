require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    URL: process.env.URL,
    JWT_SECRET: process.env.JWT_SECRET,
    STRIPE_KEY:process.env.STRIPE_KEY,
    CLIENT:process.env.CLIENT,
    ENDPOINTSECRET:process.env.ENDPOINTSECRET
}