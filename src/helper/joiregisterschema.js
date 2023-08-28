import Joi from "joi"
const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pk'] } }),
    password: Joi.string().required(),
    confirm_password: Joi.any().valid(Joi.ref('password')).required().messages({
        "any.only": "Password must match"
    })
})
export default schema