import { Request, Response } from "express";
import { FindClientDeliveriesUseCase } from "./FindClientDeliveriesUseCase";



export class FindClientDeliveriesController{
  async handle(request: Request, response: Response){
    const { id_client } = request

    const findClientDeliveriesUseCase = new FindClientDeliveriesUseCase()

    const result = await findClientDeliveriesUseCase.execute({
      id_client
    })

    return response.json(result)
  }
}