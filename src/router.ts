import { Router } from "express";
import { CreateUserController } from "./controllers/createUserController";
import { LoginController } from "./controllers/loginController";
import { LogoutCotroller } from "./controllers/logoutController";
import { RefreshToeknController } from "./controllers/refreshTokenController";

import { Request, Response } from "express";
import { ensureAuth } from "./midwares/ensureAuth";

const router = Router();

const createUserController = new CreateUserController();
const loginController = new LoginController();
const refreshTokenController = new RefreshToeknController();
const logoutController = new LogoutCotroller()

router.get(
    "/", 
    //ensureAdmin,
    () => console.log('teste')
    )

router.post(
    "/user", 
    //ensureAdmin,
    createUserController.handle
    )

router.post(
    "/login", 
    //ensureAdmin,
    loginController.handle
    )

router.post(
    "/refreshT", 
    //ensureAdmin,
    refreshTokenController.handle
    )

router.delete(
    "/logout", 
    //ensureAdmin,
    logoutController.handle
    )

router.get(
    "/routed", 
    ensureAuth,
    (response: Response) => {
        console.log('auth')        
        return response.send("auth true")
    }
    )



export { router }