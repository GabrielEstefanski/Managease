import MainError from "./mainError.js";

class RequestError extends MainError {
    constructor(message = 'One or more data provided is incorrect') {
        super(message, 400);
    }
};

export default RequestError;