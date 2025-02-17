class HttpReturnCodes {
    constructor(response) {
        this.response = response;
        this.statusCodes = {
            OK: 200,
            CREATED: 201,
            ACCEPTED: 202,
            NO_CONTENT: 204,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            NOT_ACCEPTABLE: 406,
            CONFLICT: 409,
            PRECONDITION_FAILED: 412,
            UNPROCESSABLE_ENTITY: 422,
            INTERNAL_SERVER_ERROR: 500,
            SERVICE_UNAVAILABLE: 503
        };
    }

    sendResponse(statusCode, data = null, parse = false) {
        let responseData = data;
        if (data && typeof data !== 'object' && !parse) {
            responseData = { message: JSON.stringify(data) };
        }
        return this.response.status(statusCode).send(responseData);
    }

    ok(data) {
        return this.sendResponse(this.statusCodes.OK, data);
    }

    created(data) {
        return this.sendResponse(this.statusCodes.CREATED, data);
    }

    accepted(data) {
        return this.sendResponse(this.statusCodes.ACCEPTED, data);
    }

    noContent() {
        return this.sendResponse(this.statusCodes.NO_CONTENT);
    }

    badRequest(message) {
        return this.sendResponse(this.statusCodes.BAD_REQUEST, message);
    }

    unauthorized(message) {
        return this.sendResponse(this.statusCodes.UNAUTHORIZED, message);
    }

    forbidden(message) {
        return this.sendResponse(this.statusCodes.FORBIDDEN, message);
    }

    notFound(message, parse = false) {
        return this.sendResponse(this.statusCodes.NOT_FOUND, message, parse);
    }

    notAcceptable(message, parse = false) {
        return this.sendResponse(this.statusCodes.NOT_ACCEPTABLE, message, parse);
    }

    preconditionFailed(message, parse = false) {
        return this.sendResponse(this.statusCodes.PRECONDITION_FAILED, message, parse);
    }

    unprocessableEntity(message, parse = false) {
        return this.sendResponse(this.statusCodes.UNPROCESSABLE_ENTITY, message, parse);
    }

    internalServerError(message = 'Internal server error.', parse = false) {
        return this.sendResponse(this.statusCodes.INTERNAL_SERVER_ERROR, message, parse);
    }

    serverUnavailable(message, parse = false) {
        return this.sendResponse(this.statusCodes.SERVICE_UNAVAILABLE, message, parse);
    }

    conflict(message, parse = false) {
        return this.sendResponse(this.statusCodes.CONFLICT, message, parse);
    }
}

export default HttpReturnCodes;

