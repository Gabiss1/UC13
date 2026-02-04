import { Router } from "express";
import { UserController } from "../Controller/UserController";

const UserRouter = Router();
const controller = new UserController();

UserRouter.get("/users", controller.listAllUsers);
UserRouter.post("/users", controller.createUser);
UserRouter.put("/users/:id", controller.updateUser);
UserRouter.delete("/users/:id", controller.deleteUser);
export default UserRouter;