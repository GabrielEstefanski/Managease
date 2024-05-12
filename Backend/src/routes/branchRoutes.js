import express from "express";
import branchController from "../controllers/branchController.js";

const routes = express.Router();

routes.get('/branch', branchController.listBranch);
routes.get('/branch/:_id', branchController.listBranchById);
routes.post('/branch', branchController.postBranch);
routes.put('/branch/:_id', branchController.putBranch);
routes.delete('/branch/:_id', branchController.deleteBranch);
routes.put('/branch/:_id/restore', branchController.restoreBranchById);
routes.post('/branch/restore', branchController.restoreAllBranches);
routes.post('/branch/armageddon', branchController.destroyWorldBranch);

export default routes;