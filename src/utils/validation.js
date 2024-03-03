
import Joi from 'joi';

export const validateSignup = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        confirmPassword: Joi.ref('password')
    });

    const { error } = schema.validate(req.body);

    if(error) {
        throw new CustomError(error.details[0].message, 400);
    }

    next();
};

export const validatePost = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if(error) {
        throw new CustomError(error.details[0].message, 400);
    }

    next();
};

export const validatePostId = (req, res, next) => {
    const schema = Joi.object({
        postId: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if(error) {
        throw new CustomError(error.details[0].message, 400);
    }

    next();
};