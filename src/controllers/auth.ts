import { NextFunction } from "express-serve-static-core";

export const staticResponseMessage = (req:Request, res:Response, next:NextFunction)=>{

    res.json()

}