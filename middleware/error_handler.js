const {CustomAPIError} = require("../errors/custom_error.js");

const errorHandlerMiddleware = (err,req,res,next)=>{
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg: err.message});
    }
    return res.status(500).json({msg: 'Something went wrong, Please Try again!!! ', err:err});
}

module.exports = errorHandlerMiddleware;