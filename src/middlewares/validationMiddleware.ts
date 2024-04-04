import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Regex patterns
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
const cellphoneRegex = /^\(\d{2}\)\s9?\d{4}-\d{4}$/; // Allows optional 9 digit
const phoneRegex = /^\(\d{2}\)\s\d{4}-\d{4}$/; // Does not allow 9 digit
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cepRegex = /^\d{5}-\d{3}$/;

// Create the Joi schema for IProfileData
const profileSchema = Joi.object({
    userType: Joi.string().valid('Pessoa física', 'Pessoa jurídica').required(),
    cnpj: Joi.string().pattern(cnpjRegex).when('userType', { is: 'Pessoa jurídica', then: Joi.required() }),
    cpf: Joi.string().pattern(cpfRegex).when('userType', { is: 'Pessoa física', then: Joi.required() }),
    name: Joi.string().required(),
    cellphone: Joi.string().pattern(cellphoneRegex).required(),
    phone: Joi.string().pattern(phoneRegex).optional(),
    email: Joi.string().pattern(emailRegex).required(),
    confirmEmail: Joi.any().valid(Joi.ref('email')).required(),
    cep: Joi.string().pattern(cepRegex).required(),
    street: Joi.string().required(),
    number: Joi.number().integer().min(1).required(),
    additionalInfo: Joi.string().optional(),
    city: Joi.string().required(),
    neighborhood: Joi.string().required(),
    state: Joi.string().required(),
    agreeToTerms: Joi.boolean().valid(true).required(), // Must be true to proceed
});

export const validateProfileData = (req: Request, res: Response, next: NextFunction) => {
    const { error } = profileSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(400).json({ errors });
    } else {
        next();
    }
};
