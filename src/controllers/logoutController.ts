import { Request, Response } from "express";

class LogoutCotroller {
    async handle(request: Request, response: Response){
        globalThis.refreshTokens = globalThis.refreshTokens.filter( (c) => c != request.body.token)
        

        return response.status(204).send("Logged out!")

    }

}
export {LogoutCotroller}