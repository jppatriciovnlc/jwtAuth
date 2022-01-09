import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { GetUserByEmailService } from "../services/getUserByEmailService";

import * as dotenv from "dotenv"
import * as bcrypt from "bcryptjs"

dotenv.config({path: __dirname})


class LoginController {

    

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

            const { email, password} = request.body;
            const getUserByEmailService = new GetUserByEmailService;
            const user = await getUserByEmailService.execute(email)            
            if (user.length !== 0) {
                if (await bcrypt.compare(request.body.password, user[0].password)) {
                    const accessToken = generateAccessToken({user: email})
                    const refreshToken = generateRefreshToken({user: email})

                    return response.json({accessToken: accessToken, refreshToken: refreshToken})
                }

                else {
                    return response.status(401).send("Auth Error")
                }
            }
            else {
                return response.status(401).send("Auth Error")
            }



            

           
        
    }

}

export { LoginController };