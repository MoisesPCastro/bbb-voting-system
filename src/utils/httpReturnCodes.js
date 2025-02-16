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

    ok(dadosRetorno) {
        return this.response.status(this.statusCodes.OK).send(dadosRetorno);
    }

    created(dadosRetorno) {
        return this.response
            .status(this.statusCodes.CREATED)
            .send(dadosRetorno);
    }

    accepted(dadosRetorno) {
        return this.response
            .status(this.statusCodes.ACCEPTED)
            .send(dadosRetorno);
    }

    noContent() {
        return this.response.status(this.statusCodes.NO_CONTENT).send();
    }

    badRequest(mensagemRetorno) {
        return this.response
            .status(this.statusCodes.BAD_REQUEST)
            .send(mensagemRetorno);
    }

    unauthorized(mensagemRetorno) {
        return this.response
            .status(this.statusCodes.UNAUTHORIZED)
            .send(mensagemRetorno);
    }

    forbidden(mensagemRetorno) {
        return this.response
            .status(this.statusCodes.FORBIDDEN)
            .send(mensagemRetorno);
    }

    notFound(mensagemRetorno, parse = false) {
        const mensagem = parse ? mensagemRetorno : { mensage: JSON.stringify(mensagemRetorno) };

        return this.response
            .status(this.statusCodes.NOT_FOUND)
            .send(mensagem);
    }

    notAcceptable(mensagemRetorno, parse = false) {
        const mensagem = parse ? mensagemRetorno : { mensage: JSON.stringify(mensagemRetorno) };

        return this.response
            .status(this.statusCodes.NOT_ACCEPTABLE)
            .send(mensagem);
    }

    preconditionFailed(mensagemRetorno, parse = false) {
        const mensagem = parse ? mensagemRetorno : { mensage: JSON.stringify(mensagemRetorno) };

        return this.response
            .status(this.statusCodes.PRECONDITION_FAILED)
            .send(mensagem);
    }

    unprocessableEntity(mensagemRetorno, parse = false) {
        const mensagem = parse ? mensagemRetorno : { mensage: JSON.stringify(mensagemRetorno) };

        return this.response
            .status(this.statusCodes.UNPROCESSABLE_ENTITY)
            .send(mensagem);
    }

    internalServerError(mensagemRetorno = 'Internal server error.', parse = false) {
        const mensagem = parse ? mensagemRetorno : { mensage: JSON.stringify(mensagemRetorno) };

        return this.response
            .status(this.statusCodes.INTERNAL_SERVER_ERROR)
            .send(mensagem);
    }

    serverUnavailable(mensagemRetorno, parse = false) {
        const mensagem = parse ? mensagemRetorno : { mensage: JSON.stringify(mensagemRetorno) };

        return this.response
            .status(this.statusCodes.SERVICE_UNAVAILABLE)
            .send(mensagem);
    }

    conflict(mensagemRetorno, parse = false) {
        const mensagem = parse ? mensagemRetorno : { mensage: JSON.stringify(mensagemRetorno) };

        return this.response
            .status(this.statusCodes.CONFLICT)
            .send(mensagem);
    }
}

export default HttpReturnCodes;
