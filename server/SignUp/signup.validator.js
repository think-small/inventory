const { body, validationResult } = require('express-validator');
const db = require("../db.js");

const userValidationRules = () => {
    return [
        body('email').normalizeEmail().isEmail(),
        body('password').isLength({ min: 5 }),
    ];
}

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
        errors: extractedErrors
    })
}

const isDuplicate = (email) => {
    db.query('SELECT * FROM users WHERE email == ?', email, (error, result) => {
        if (error) return false;
        console.log(result);
    });
}

module.exports = {
    userValidationRules, validate
}
