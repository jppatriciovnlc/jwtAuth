import "reflect-metadata";
import * as express  from "express";
import { Request, Response, NextFunction } from "express";
import "express-async-errors";
import * as cors from "cors";
import { router } from './router';
import "./database";
import * as dotenv from "dotenv"
dotenv.config({path: __dirname})

globalThis.refreshTokens = []

const app = express();

app.use(cors());
app.use(express.json())
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return response.status(400).json({
            error: err.message
        })
    }
    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

const port = process.env.TOKEN_SERVER_PORT;
console.log(`port:${port}`)

app.listen(port, () => console.log('Server is running'));