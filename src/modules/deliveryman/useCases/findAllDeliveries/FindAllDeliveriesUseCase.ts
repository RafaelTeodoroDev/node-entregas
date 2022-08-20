import { prisma } from "../../../../database/prismaClient";

interface IFindAllDeliveries{
  id_deliveryman: string;
}

export class FindAllDeliveriesUseCase{
  async execute({ id_deliveryman }: IFindAllDeliveries){
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        id: id_deliveryman,
      },

      select: {
        id: true,
        username: true,
        Deliveries: {
          where: {
            end_at: null
          }
        }
      }
    })

    return deliveryman
  }
}