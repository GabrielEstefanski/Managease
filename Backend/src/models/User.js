import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    username: { type: String, required: true},
    password: { type: String, required: true },
    companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'companies' }],
    branches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'branches' }],
    financials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'financials'}],
    deleted: { type: Boolean, default: false }
}, { versionKey: false });

userSchema.pre('save', async function (next) { 
    if (!this.isModified('password')) { 
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next (err);
    }
});

const user = mongoose.model("users", userSchema);

export default user;
