class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ValidationError extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}

class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404);
    }
}

const errorHandlingMiddleware = (err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
};

export { CustomError, ValidationError, NotFoundError, errorHandlingMiddleware };