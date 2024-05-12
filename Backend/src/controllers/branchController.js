import branch from "../models/Branch.js";
import financial from "../models/Financial.js";
import user from "../models/User.js";
import mongoose from "mongoose";

class brancheController {
    static async listBranch(req, res, next) {
        try {
            const listBranches = await branch.find({ deleted: false });
            res.status(200).json(listBranches);
        } catch (error) {
            next(error);
        }
    };
    static async listBranchById(req, res, next) {
        try {
            const id = req.params._id;
            const branchFound = await branch.findOne({ _id: id, deleted: false });
            if (!branchFound) {
                return res.status(404).json({ message: 'Branch not found' });
            }
            res.status(200).json(branchFound);
        } catch (error) {
            next(error);
        }
    };
    static async postBranch(req, res, next) {
        try {
            const newBranch = { ...req.body, _id: new mongoose.Types.ObjectId() };
            await branch.create(newBranch);
            res.status(201).json({ message: 'Branch succesfully registred', branch: newBranch });
        } catch (error) {
            next(error);
        }
    };
    static async putBranch(req, res, next) {
        try {
            const id = req.params._id;
            const branchFound = await branch.findOne({ _id: id, deleted: false });
            if (!branchFound) {
                return res.status(404).json({ message: 'Branch not found' });
            }
            await branch.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'att' });
        } catch (error) {
            next(error);
        }
    };
    static async deleteBranch(req, res, next) {
        try {
            const id = req.params._id;
            const deletedBranch = await branch.findByIdAndUpdate(id, { deleted: true });
            const deletedFinancials = await financial.find({ branch_id: deletedBranch._id });
            console.log(deletedFinancials)
            await financial.deleteMany({ _id: { $in: deletedFinancials.map(financial => financial._id) } });

            await user.updateMany({ branches: deletedBranch._id }, { $pull: { branches: deletedBranch._id } });
            res.status(200).json({ message: 'Branch succesfully deleted' });
        } catch (error) {
            next(error);
        }
    };
    static async restoreAllBranches(req, res, next) {
        try {
            await branch.updateMany({ $set: { deleted: false } });
            res.status(200).json({ message: 'All Branch\'s successfully restored' });
        } catch (error) {
            next(error);
        }
    };
    static async restoreBranchById(req, res, next) {
        try {
            const id = req.params._id;
            const branchFound = await branch.findOne({ _id: id, deleted: true });
            if (!branchFound) {
                return res.status(404).json({ message: 'Branch not deleted' });
            }
            branchFound.deleted = false;
            await branchFound.save();
            res.status(200).json({ message: 'Branch succesfully restored' });
        } catch (error) {
            next(error);
        }
    };
    static async destroyWorldBranch(req, res, next) {
        try {
            await branch.deleteMany();
            res.status(200).json({ message: 'Boooom all has been destroyed!' });
        } catch (error) {
            next(error);
        }
    }
};

export default brancheController;
