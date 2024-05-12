import express from "express";
import financialController from "../controllers/financialController.js";

const routes = express.Router();

routes.get('/financial', financialController.listFinancial);
routes.get('/financial/:_id', financialController.listFinancialById);
routes.post('/financial', financialController.postFinancial);
routes.put('/financial/:_id', financialController.putFinancial);
routes.delete('/financial/:_id', financialController.deleteFinancial);
routes.put('/financial/:_id/restore', financialController.restoreFinancial);
routes.post('/financial/restore', financialController.restoreAllFinancials);
routes.post('/financial/armageddon', financialController.destroyWorldFinancial);

export default routes;