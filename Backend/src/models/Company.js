import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId },
    name: { type: String, required: true },
    sector: { type: String, required: true},
    ceo: { type: String, required: false},
    notes: { type: String, required: false},
    valuation: { type: String, required: false},
    active: { type: Number, default: true },
    deleted: { type: Boolean, default: false }
}, { versionKey: false });

const company = mongoose.model("companies", companySchema);

export default company;