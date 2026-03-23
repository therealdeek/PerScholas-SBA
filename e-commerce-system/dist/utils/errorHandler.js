"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataError = exports.NetworkError = void 0;
exports.handleError = handleError;
class NetworkError extends Error {
    constructor(message, statusCode = 503) {
        super(message);
        this.name = "NetworkError";
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, NetworkError.prototype);
    }
}
exports.NetworkError = NetworkError;
class DataError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "DataError";
        this.field = field;
        Object.setPrototypeOf(this, DataError.prototype);
    }
}
exports.DataError = DataError;
function handleError(error) {
    if (error instanceof NetworkError) {
        console.error(`[NetworkError ${error.statusCode}] ${error.message}`);
    }
    else if (error instanceof DataError) {
        console.error(`[DataError${error.field ? ` on field "${error.field}"` : ""}] ${error.message}`);
    }
    else if (error instanceof Error) {
        console.error(`[Error] ${error.message}`);
    }
    else {
        console.error("[Unknown Error]", error);
    }
}
