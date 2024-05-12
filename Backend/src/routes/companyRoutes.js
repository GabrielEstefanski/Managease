import express from "express";
import companyController from "../controllers/companyController.js";

const routes = express.Router();

routes.get('/company', companyController.listCompany);
routes.get('/company/:_id', companyController.listCompanyById);
routes.post('/company', companyController.postCompany);
routes.put('/company/:_id', companyController.putCompany);
routes.delete('/company/:_id', companyController.deleteCompany);
routes.put('/company/:_id/restore', companyController.restoreCompany);
routes.post('/company/restore', companyController.restoreAllCompanies);

export default routes;