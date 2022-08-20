import { prisma } from "../../../database/prismaClient";

interface IUpdateEndDate{
  id_delivery: string;
}

export class UpdateEndDateUseCase{
  async execute({ id_delivery }: IUpdateEndDate){
    const delivery = await prisma.deliveries.update({
      where: {
        id: id_delivery,
      },
      data: {
        end_at: new Date()
      }
    })

    return delivery
  }
}