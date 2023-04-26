const {body} = require("express-validator");


module.exports.boilerValidations = [
    body('email').isEmail().normalizeEmail().trim().escape().withMessage('email is required'),
    body('password').not().isEmpty().withMessage('password is required')
]