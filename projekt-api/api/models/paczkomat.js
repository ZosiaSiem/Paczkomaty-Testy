const mongoose = require("mongoose")

//schemat paczkomatu
const paczkomatSchema = mongoose.Schema({
    miasto: { type: String, required: true },
    adres: { type: String, required: true },
    pojemnosc: { type: Number, required: true }
})

module.exports = mongoose.models.Paczkomat || mongoose.model("Paczkomat", paczkomatSchema);
