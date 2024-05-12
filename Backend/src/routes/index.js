import express from "express";
import company from "./companyRoutes.js";
import user from "./userRoutes.js";
import branch from "./branchRoutes.js";
import financial from "./financialRoutes.js";
import cors from 'cors';


const routes = (app) => {
    app.use(cors());

    app.route('/').get((req, res) => res.status(200).send('Connected API'));

    app.use(express.json(), company, branch, user, financial);
};

export default routes;