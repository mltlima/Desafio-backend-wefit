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
    cnpj: Joi.when('userType', { is: 'Pessoa jurídica', then: Joi.string().pattern(cnpjRegex).required(), otherwise: Joi.forbidden() }),
    cpf: Joi.when('userType', { is: 'Pessoa física', then: Joi.string().pattern(cpfRegex).required(), otherwise: Joi.forbidden() }),
    name: Joi.string().trim().required(),
    cellphone: Joi.string().pattern(cellphoneRegex).required(),
    phone: Joi.string().pattern(phoneRegex).optional().allow('', null),
    email: Joi.string().trim().lowercase().email().pattern(emailRegex).required(),
    confirmEmail: Joi.any().valid(Joi.ref('email')).required(),
    cep: Joi.string().pattern(cepRegex).required(),
    street: Joi.string().trim().required(),
    number: Joi.number().integer().min(1).required(),
    additionalInfo: Joi.string().trim().optional().allow('', null),
    city: Joi.string().trim().required(),
    neighborhood: Joi.string().trim().required(),
    state: Joi.string().trim().required(),
    agreeToTerms: Joi.boolean().valid(true).required()
}).with('email', 'confirmEmail');


export const validateProfileData = (req: Request, res: Response, next: NextFunction) => {
    const validationResult = profileSchema.validate(req.body, { abortEarly: false, stripUnknown: true });

    if (validationResult.error) {
        const errors = validationResult.error.details.map(detail => detail.message);
        return res.status(400).json({ errors });
    } else {
        req.body = validationResult.value;
        next();
    }
};
