import express from "express";
import userController from "../controllers/userController.js";

const routes = express.Router();

routes.post('/login', userController.loginById);
routes.get('/user', userController.listUser);
routes.get('/user/:_id', userController.listUserById);
routes.post('/user', userController.postUser);
routes.put('/user/:_id', userController.putUser);
routes.delete('/user/:_id', userController.deleteUser);
routes.put('/user/:_id/restore', userController.restoreUser);
routes.post('/user/restore', userController.restoreAllUsers);
routes.post('/user/armageddon', userController.destroyWorldUser);

export default routes;