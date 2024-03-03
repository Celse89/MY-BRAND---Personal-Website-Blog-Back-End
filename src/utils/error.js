class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

const errorHandlingMiddleware = (err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
};

export { CustomError, errorHandlingMiddleware };