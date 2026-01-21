const mongoose = require("mongoose");

// Schemat Przesyłki
const paczkaSchema = mongoose.Schema({
    kodPaczki: { type: String, required: true }, 
    kurier: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Kurier",
        required: true
    },
    paczkomat: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Paczkomat",
        required: true
    },
    status: { type: String, default: 'oczekująca' } 
});

module.exports = mongoose.models.Paczka || mongoose.model("Paczka", paczkaSchema);
