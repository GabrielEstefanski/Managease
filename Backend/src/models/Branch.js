import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId },
    name: { type: String, required: true },
    country: { type: String, required: true },
    cnpj: { type: String, required: true },
    date_establishment: { type: Date, required: true},
    share_capital: { type: Number, required: true },
    legal_nature: { type: String, required: true},
    phone: { type: String, required: true },
    zip: { type: String, required: true },
    active: { type: Number, required: true },
    company_id: { type: mongoose.Schema.Types.ObjectId, ref:"companies", required: true },
    deleted: { type: Boolean, default: false}
}, { versionKey: false });

const branch = mongoose.model("branches", branchSchema);

export default branch;