import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

interface IAuthenticateClient {
  username: string;
  password: string
}

export class AuthenticateClientUseCase{
  async execute({ username, password }: IAuthenticateClient){
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if(!client){
      throw new Error("Username or password is invalid!")
    }

    const passwordMatch = await compare(password, client.password)

    if(!passwordMatch){
      throw new Error("Username or password is invalid!")
    }

    const token = sign( {username}, "a905d89574379cec8ba1fc0438bf9597", {
      subject: client.id,
      expiresIn: "1d"
    })

    return token
  }
}