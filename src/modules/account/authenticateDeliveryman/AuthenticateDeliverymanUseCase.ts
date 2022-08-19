import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

interface IAuthenticateDeliveryman {
  username: string;
  password: string
}

export class AuthenticateDeliverymanUseCase{
  async execute({ username, password }: IAuthenticateDeliveryman){
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if(!deliveryman){
      throw new Error("Username or password is invalid!")
    }

    const passwordMatch = await compare(password, deliveryman.password)

    if(!passwordMatch){
      throw new Error("Username or password is invalid!")
    }

    const token = sign( {username}, "a905d89574379cec8ba1fc0438bf9597", {
      subject: deliveryman.id,
      expiresIn: "1d"
    })

    return token
  }
}