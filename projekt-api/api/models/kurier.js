const mongoose = require("mongoose")

//schemat kuriera
const kurierSchema = mongoose.Schema({
    imie: { type: String, required: true },
    nazwisko: { type: String, required: true },
    email: { type: String, required: true },
    nrTelefonu: { type: String, required: true }
})

module.exports = mongoose.models.Kurier || mongoose.model("Kurier", kurierSchema);
