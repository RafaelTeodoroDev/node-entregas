import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt"

interface ICreateClient{
  username: string;
  password: string;
}

export class CreateClientUseCase{

  async execute({ username, password }: ICreateClient){

    const clientAlreadyExists = await prisma.clients.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive"
        }
      }
    })

    if(clientAlreadyExists){
      throw new Error("Client already exists")
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        password: hashPassword,
        username,
      }
    })

    return client
  }
}