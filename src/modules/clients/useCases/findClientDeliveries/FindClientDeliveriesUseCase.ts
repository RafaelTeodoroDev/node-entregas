import { prisma } from "../../../../database/prismaClient";

interface IFindClientDeliveries{
  id_client: string;
}

export class FindClientDeliveriesUseCase{
  async execute({id_client}: IFindClientDeliveries){
    const client = await prisma.clients.findMany({
      where: {
        id: id_client
      },
      select: {
        id: true,
        username: true,
        Deliveries: true
      }
    })

    return client
  }
}