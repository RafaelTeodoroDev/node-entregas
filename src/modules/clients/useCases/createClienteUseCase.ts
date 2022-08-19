import { prisma } from "../../../database/prismaClient";

interface ICreateClient{
  username: string;
  password: string;
}

export class CreateClientUseCase{

  async execute({ username, password }: ICreateClient){
    //validar se já existe
    const clientAlreadyExists = await prisma

    //criptografar senha

    //salvar client
  }
}