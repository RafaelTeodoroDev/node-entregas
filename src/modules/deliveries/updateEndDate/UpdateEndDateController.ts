import { Request, Response } from "express";
import { UpdateEndDateUseCase } from "./UpdateEndDateUseCase";



export class UpdateEndDateController{
  async handle(request: Request, response: Response){
    const { id } = request.params;

    const updateEndDateUseCase = new UpdateEndDateUseCase()

    const result = await updateEndDateUseCase.execute({
      id_delivery: id
    })

    return response.json(result)
  }
}