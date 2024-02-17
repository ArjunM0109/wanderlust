const { schema } = require("../Models/UserSchema");

const validate = (schema)=> async(req,res,next)=>{
    try {
        const parseBody = await schema.parseAsync(req.body); 
        req.body = parseBody;
        next();
    } catch (err) {
        const error = {
            message:"fill the input properly",
            extraDetails:err.errors[0].message,
            status:422
        }
        next(error); 
    }
}
module.exports=validate;