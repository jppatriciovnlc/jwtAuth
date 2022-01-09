import { Request, Response } from "express";

import * as dotenv from "dotenv"
import * as bcrypt from "bcryptjs"

dotenv.config({path: __dirname})




class RefreshToeknController {

    async handle(request: Request, response: Response) {

        const jwt = require("jsonwebtoken")            
        
        const generateAccessToken = (user) => {
            return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"}) 
        }
    
        const generateRefreshToken = (user) => {
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"})
            globalThis.refreshTokens.push(refreshToken)
            return refreshToken
        }
        
        if (!globalThis.refreshTokens.includes(request.body.token)) 
            return response.status(400).send("Refresh Token Invalid")

        globalThis.refreshTokens = globalThis.refreshTokens.filter( (c) => c != request.body.token)

        const accessToken = generateAccessToken ({user: request.body.email})
        const refreshToken = generateRefreshToken ({user: request.body.email})

        return response.json ({accessToken: accessToken, refreshToken: refreshToken})
        

    }

}

export { RefreshToeknController }