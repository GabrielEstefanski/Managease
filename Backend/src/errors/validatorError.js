import RequestError from "./requestError.js";

class ValidationError extends RequestError {
    constructor(error) {
        const errorMessage = Object.values(error.errors)
            .map(error => error.message)
            .join("; ");

        super(`The follow error were found: ${errorMessage}`);
    }
}

export default ValidationError;