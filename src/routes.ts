import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/useCases/createClientController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/CreateDeliveryController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

import { ensureAuthClient } from "./middlewares/ensureAuthClient";
import { ensureAuthDeliveryman } from "./middlewares/ensureAuthDeliveryman";
import { FindAllAvailableController } from "./modules/deliveryman/useCases/findAllAvailable/FindAllAvailableController";

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()

const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()
const findAllAvailableController = new FindAllAvailableController()

const createDeliveryController = new CreateDeliveryController()


routes.post("/client", createClientController.handle)
routes.post("/client/authenticate", authenticateClientController.handle)

routes.post("/deliveryman", createDeliverymanController.handle)
routes.post("/deliveryman/authenticate", authenticateDeliverymanController.handle)

routes.get("/delivery/available", ensureAuthDeliveryman, findAllAvailableController.handle)
routes.post("/delivery", ensureAuthClient, createDeliveryController.handle)

export { routes }