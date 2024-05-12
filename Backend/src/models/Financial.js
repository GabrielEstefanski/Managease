import mongoose from "mongoose";

const financialSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    type: { type: Number, required: true },
    category: { type: Number, required: true },
    description: { type: String, required: false },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "branches", required: true },
    deleted: { type: Boolean, default: false }
}, { versionKey: false });

const financial = mongoose.model("financials", financialSchema);

export default financial;