import { Request, Response } from "express";
import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";

export class UpdateDeliverymanController{
  async handle(request: Request, response: Response){
    const { id } = request.params
    const { id_deliveryman } = request

    const updateDeliverymanUseCase = new UpdateDeliverymanUseCase()

    const delivery = await updateDeliverymanUseCase.execute({
      id_delivery: id,
      id_deliveryman
    })

    return response.json(delivery)
  }
}