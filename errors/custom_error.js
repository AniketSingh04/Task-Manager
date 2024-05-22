class CustomAPIError extends Error {  //This class extends the built-in Error class to create a custom error type.
    constructor(message, statusCode) { //This class extends the built-in Error class to create a custom error type.
        super(message);
        this.statusCode = statusCode;
    }
}

//This class extends the built-in Error class to create a custom error type.
const createCustomAPIError = (msg, statusCode) => {
    return new CustomAPIError(msg, statusCode); //It returns a new instance of CustomAPIError initialized with the provided msg and statusCode.
};

module.exports = { createCustomAPIError, CustomAPIError };
