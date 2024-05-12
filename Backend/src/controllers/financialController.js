import financial from "../models/Financial.js";
import user from "../models/User.js";
import mongoose from "mongoose";

class financialController {

    static async listFinancial(req, res, next) {
        try {
            const listFinancial = await financial.find({ deleted: false });
            res.status(200).json(listFinancial);
        } catch (error) {
            next(error);
        }
    };
    static async listFinancialById(req, res, next) {
        try {
            const id = req.params._id;
            const financialFound = await financial.findById(id).lean();
            if (!financialFound || financialFound.deleted) {
                return res.status(404).json({ message: 'Financial not found' });
            }
            res.status(200).json(financialFound);
        } catch (error) {
            next(error);
        }
    };
    static async postFinancial(req, res, next) {
        try {
            const newFinancial = { ...req.body, _id: new mongoose.Types.ObjectId() };
            await financial.create(newFinancial);

            res.status(201).json({ message: 'Financial successfully registered', financial: newFinancial });
        } catch (error) {
            next(error);
        }
    };
    static async putFinancial(req, res, next) {
        try {
            const id = req.params._id;
            const financialFound = await financial.findOne({ _id: id, deleted: false });
            if (!financialFound) {
                return res.status(404).json({ message: 'Financial not found' });
            }
            await financial.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'Financial succesfully updated' });
        } catch (error) {
            next(error);
        }
    };
    static async deleteFinancial(req, res, next) {
        try {
            const id = req.params._id;
            const deletedFinancial = await financial.findByIdAndUpdate(id, { deleted: true });

            await user.updateMany({ financials: deletedFinancial._id }, { $pull: { financials: deletedFinancial._id } });

            res.status(200).json({ message: 'Financial succesfully deleted' });
        } catch (error) {
            next(error);
        }
    };
    static async restoreAllFinancials(req, res, next) {
        try {
            await financial.updateMany({ $set: { deleted: false } });
            res.status(200).json({ message: 'All financials successfully restored' });
        } catch (error) {
            next(error);
        }
    };
    static async restoreFinancial(req, res, next) {
        try {
            const id = req.params.id;
            const financialFound = await financial.findOne({ id: id, deleted: true });
            if (!financialFound) {
                return res.status(404).json({ message: 'Financial not deleted' });
            }
            financialFound.deleted = false;
            await financialFound.save();
            res.status(200).json({ message: 'Financial succesfully restored' });
        } catch (error) {
            next(error);
        }
    };
    static async destroyWorldFinancial(req, res, next) {
        try {
            await financial.deleteMany();
            res.status(200).json({ message: 'Boooom all has been destroyed!' });
        } catch (error) {
            next(error);
        }
    }
};

export default financialController;