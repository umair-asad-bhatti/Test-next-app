import Joi from "joi"
const loginschema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pk'] } }),
    password: Joi.string().required(),

})
export default loginschema