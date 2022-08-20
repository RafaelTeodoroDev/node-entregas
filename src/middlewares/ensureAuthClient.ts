import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
  sub: string;
}

export async function ensureAuthClient(request: Request, response: Response, next: NextFunction){
  const authHeader = request.headers.authorization;

  if(!authHeader){
    return response.status(401).json({
      message: "token missing"
    })
  }

  const [, token] = authHeader.split(" ");

  try{
    const { sub } = verify(token, 'a905d89574379cec8ba1fc0438bf9597') as IPayload;
    
    request.id_client = sub;

    return next()
  }catch{
    return response.status(401).json({
      message: "Invalid token"
    })
  }
  
}