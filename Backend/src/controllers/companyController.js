import company from "../models/Company.js";
import user from "../models/User.js";
import financial from "../models/Financial.js";
import branche from "../models/Branch.js";
import mongoose from "mongoose";

class companyController {

    static async listCompany(req, res, next) {
        try {
            const listCompanies = await company.find({ deleted: false });
            res.status(200).json(listCompanies);
        } catch (error) {
            next(error);
        }
    };
    static async listCompanyById(req, res, next) {
        try {
            const id = req.params._id;
            const companyFound = await company.findOne({ _id: id, deleted: false });
            if (!companyFound) {
                return res.status(404).json({ message: 'Company not found' });
            }
            res.status(200).json(companyFound);
        } catch (error) {
            next(error);
        }
    };
    static async postCompany(req, res, next) {
        try {
            const newCompany = { ...req.body, _id: new mongoose.Types.ObjectId() };

            await company.create(newCompany);

            res.status(201).json({ message: 'Company successfully registered', company: newCompany });
        } catch (error) {
            next(error);
        }
    };
    static async putCompany(req, res, next) {
        try {
            const id = req.params._id;
            const companyFound = await company.findOne({ _id: id, deleted: false });
            if (!companyFound) {
                return res.status(404).json({ message: 'Company not found' });
            }
            await company.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'Company succesfully updated' });
        } catch (error) {
            next(error);
        }
    };
    static async deleteCompany(req, res, next) {
        try {
            const id = req.params._id;
            const deletedCompany = await company.findByIdAndUpdate(id, { deleted: true });
            const deletedbranches = await branche.find({ company_id: deletedCompany._id }).select('_id');

            await branche.deleteMany({ _id: { $in: deletedbranches.map(branch => branch._id) } });

            const deletedBrancheIds = deletedbranches.map(branche => branche._id);
            await financial.updateMany({ branche_id: { $in: deletedBrancheIds } }, { deleted: true });

            await user.updateMany({ companies: deletedCompany._id }, { $pull: { companies: deletedCompany._id } });

            res.status(200).json({ message: 'Company succesfully deleted' });
        } catch (error) {
            next(error);
        }
    };
    static async restoreAllCompanies(req, res, next) {
        try {
            await company.updateMany({ $set: { deleted: false } });
            res.status(200).json({ message: 'All companies successfully restored' });
        } catch (error) {
            next(error);
        }
    };
    static async restoreCompany(req, res, next) {
        try {
            const id = req.params.id;
            const companyFound = await company.findOne({ id: id, deleted: true });
            if (!companyFound) {
                return res.status(404).json({ message: 'Company not deleted' });
            }
            companyFound.deleted = false;
            await companyFound.save();
            res.status(200).json({ message: 'Company succesfully restored' });
        } catch (error) {
            next(error);
        }
    };
};

export default companyController;