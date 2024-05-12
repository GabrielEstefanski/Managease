import mongoose from "mongoose";
import MainError from "../errors/mainError.js";
import RequestError from "../errors/requestError.js";
import ValidationError from "../errors/validatorError.js";

function errorHandler(error, req, res, next) {
    if (error instanceof mongoose.Error.CastError) {
        new RequestError().sendResponse(res);
    } else if (error instanceof mongoose.Error.ValidationError) {
        new ValidationError(error).sendResponse(res);
    } else {
        new MainError().sendResponse(res);
    }
}

export default errorHandler;