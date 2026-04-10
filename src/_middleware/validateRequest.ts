import type { Request, Response, NextFunction } from "express";
import Joi from "joi";

export function validateRequest(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const options = {
            abortEarly: false, // Include all errors
            allowUnknown: true, // Allow unknown keys that are not in the schema
            stripUnknown: true // Remove unknown keys from the validated data
        };

        const { error, value } = schema.validate(req.body, options);

        if (error) {
            next('Validation error: ' + error.details.map(x => x.message).join(', '));
        } else {
            req.body = value;
            next();
        }
    };
}