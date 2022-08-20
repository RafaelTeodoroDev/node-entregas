import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClient/createClientController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

import { ensureAuthClient } from "./middlewares/ensureAuthClient";
import { ensureAuthDeliveryman } from "./middlewares/ensureAuthDeliveryman";
import { FindAllAvailableController } from "./modules/deliveries/useCases/findAllAvailable/FindAllAvailableController";
import { UpdateDeliverymanController } from "./modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController";
import { FindClientDeliveriesController } from "./modules/clients/useCases/findClientDeliveries/FindClientDeliveriesController";
import { FindAllDeliveriesController } from "./modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesController";
import { UpdateEndDateController } from "./modules/deliveries/updateEndDate/UpdateEndDateController";

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const findClientDeliveriesController = new FindClientDeliveriesController()

const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const findAllAvailableController = new FindAllAvailableController()

const createDeliveryController = new CreateDeliveryController()
const updateDeliverymanController = new UpdateDeliverymanController()
const findAllDeliveriesController = new FindAllDeliveriesController()
const updateEndDateController = new UpdateEndDateController()


routes.post("/client", createClientController.handle)
routes.get("/client/myDeliveries", ensureAuthClient, findClientDeliveriesController.handle)
routes.post("/client/authenticate", authenticateClientController.handle)

routes.post("/deliveryman", createDeliverymanController.handle)
routes.get("/deliveryman/myDeliveries", ensureAuthDeliveryman, findAllDeliveriesController.handle)
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle)
routes.put("/deliveryman/authenticate", authenticateDeliverymanController.handle)

routes.get("/delivery/available", ensureAuthDeliveryman, findAllAvailableController.handle)
routes.post("/delivery", ensureAuthClient, createDeliveryController.handle)
routes.put("/delivery/updateDeliveryman/:id", ensureAuthDeliveryman, updateDeliverymanController.handle)
routes.put("/delivery/updateEndDate/:id", ensureAuthDeliveryman, updateEndDateController.handle)

export { routes }