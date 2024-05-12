import mongoose from "mongoose";
import bcrypt from "bcrypt";
import user from "../models/User.js";

class userController {

    static async listUser(req, res, next) {
        try {
            const listUsers = await user.find({ deleted: false });
            res.status(200).json(listUsers);
        } catch (error) {
            next(error);
        }
    };

    static async loginById(req, res, next) {
        try {
            const id = req.body._id;
            const password = req.body.password;
            const userFound = await user.findOne({ _id: id, deleted: false });
            const message = !userFound ? 'User not found' : await bcrypt.compare(password, userFound.password) ? userFound : 'Incorrect password';
            res.status(!userFound || message === 'Incorrect password' ? 401 : 200).json({ message });
        } catch (error) {
            next(error);
        }
    };

    static async listUserById(req, res, next) {
        try {
            const id = req.params._id;
            const userFound = await user.findOne({ _id: id, deleted: false });
            if (!userFound) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(userFound);
        } catch (error) {
            next(error);
        }
    };

    static async postUser(req, res, next) {
        try {
            const newUser = { ...req.body, _id: new mongoose.Types.ObjectId() };
            await user.create(newUser);
            res.status(201).json({ message: 'User successfully registered', user: newUser });
        } catch (error) {
            next(error);
        }
    };

    static async putUser(req, res, next) {
        try {
            const id = req.params._id;
            const userFound = await user.findOne({ _id: id, deleted: false });
            if (!userFound) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (req.body.password && req.body.password !== user.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            await user.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'User succesfully updated' });
        } catch (error) {
            next(error);
        }
    };

    static async deleteUser(req, res, next) {
        try {
            const id = req.params._id;
            await user.findByIdAndUpdate(id, { deleted: true });
            res.status(200).json({ message: 'User succesfully deleted' });
        } catch (error) {
            next(error);
        }
    };

    static async restoreAllUsers(req, res, next) {
        try {
            await user.updateMany({ $set: { deleted: false } });
            res.status(200).json({ message: 'All users successfully restored' });
        } catch (error) {
            next(error);
        }
    };
    static async restoreUser(req, res, next) {
        try {
            const id = req.params._id;
            const userFound = await user.findOne({ _id: id, deleted: true });
            if (!userFound) {
                return res.status(404).json({ message: 'User not deleted' });
            }
            userFound.deleted = false;
            await userFound.save();
            res.status(200).json({ message: 'User succesfully restored' });
        } catch (error) {
            next(error);
        }
    };
    static async destroyWorldUser(req, res, next) {
        try {
            await user.deleteMany();
            res.status(200).json({ message: 'Boooom all has been destroyed!' });
        } catch (error) {
            next(error);
        }
    }

};

export default userController;