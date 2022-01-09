import { Request, Response, Next } from "express";
import * as dotenv from "dotenv"

dotenv.config({path: __dirname})

const ensureAuth = async (request: Request, response: Response, next: Next) => {
    
    try {
        const jwt = require("jsonwebtoken")  
        console.log('1')
        if(request.headers["authorization"]){
            
            const authHeader = request.headers["authorization"]            
            const token = authHeader.split(" ")[1]
            
            console.log(process.env.ACCESS_TOKEN_SECRET)

           

            if (token == null) return response.status(400).send("Token not present")

            

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {if (err) { 
                return response.status(403).send("Token invalid")
            }
            else {                
                request.user = user
                next() //proceed to the next action in the calling function
            }})
        }
        else {
            return response.status(400).send("Token not present")
        }
    }
    catch(err) {
        console.log(err)
    }

    

    

}

export {ensureAuth}