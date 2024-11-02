const { body, validationResult } = require('express-validator');
const AppError = require('../utils/appError');

exports.validateRoute = [
    body('qayerdan').trim().notEmpty().isLength({ min: 2, max: 50 }),
    body('qayerga').trim().notEmpty().isLength({ min: 2, max: 50 }),
    body('jonahKetishVaqti').notEmpty().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('yetibBorishVaqti').notEmpty().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('davomiyti').notEmpty(),
    body('sana').notEmpty().isISO8601(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new AppError('Validation Error', 400, errors.array());
        }
        next();
    }
];