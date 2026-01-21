const mongoose = require("mongoose");
const Paczkomat = require("../models/paczkomat");
 
exports.paczkomaty_get_all = (req, res, next) => {
    Paczkomat.find()
    .then(paczkomaty => {
        res.status(200).json({
            wiadomość: "Lista wszystkich paczkomatów",
            paczkomaty: paczkomaty
        });
    }).catch(err => res.status(500).json({ error: err }));
};

exports.paczkomaty_add_new = (req, res, next) => {
    const paczkomat = new Paczkomat({
        miasto: req.body.miasto,
        adres: req.body.adres,
        pojemnosc: req.body.pojemnosc
    });

    paczkomat.save()
    .then(result => {
        res.status(201).json({
            wiadomość: "Nowy paczkomat został dodany!",
            paczkomat: result
        });
    })
    .catch(err => res.status(500).json({ error: err}))
};

exports.paczkomaty_get_by_id = (req, res, next) => {
    const id = req.params.paczkomatId;
    Paczkomat.findById(id)
    .then(result => {
        if (result) {
            res.status(200).json({
                wiadomość: `Szczegóły paczkomatu o numerze ${id}`,
                paczkomat: result
            });
        }
        else {
            res.status(404).json({
                wiadomość: "Nie znaleziono paczkomatu"
            });
        }
    }).catch(err => res.status(500).json({ error: err }));
};

exports.paczkomaty_update = (req, res, next) => {
    const id = req.params.paczkomatId;
    const updatedFields = {
        miasto: req.body.miasto,
        adres: req.body.adres,
        pojemnosc: req.body.pojemnosc
    };

    Paczkomat.findByIdAndUpdate(id, updatedFields, {new: true})
    .then(result => {
        if (result) {
            res.status(200).json({
                wiadomość: `Zaktualizowano paczkomat o ${id}`,
                updatedPaczkomat: result
            });
        }
        else {
            res.status(404).json({
                wiadomość: "Nie znaleziono paczkomatu"
            });
        }
    }).catch(err => res.status(500).json({error: err}));
};

exports.paczkomaty_delete = (req, res, next) => {
    const id = req.params.paczkomatId;
    Paczkomat.findByIdAndDelete(id)
    .then(result => {
        if (result) {
            res.status(200).json({
                wiadomość: `Usunięto paczkomat o numerze ${id}`
            });
        }
        else {
            res.status(404).json({
                wiadomość: "Nie znaleziono takiego paczkomatu"
            });

        }

    }).catch(err => res.status(500).json({error: err}));
}

// Wyświetlanie paczek w paczkomacie
const Paczka = require("../models/paczka");

exports.get_paczki_by_paczkomat = (req, res, next) => {
    const paczkomatId = req.params.paczkomatId;

    Paczka.find({ paczkomat: paczkomatId, status: "dostarczona"})
    .then(paczki => {
        if(paczki.length > 0) {
            res.status(200).json({
                wiadomość: `Lista paczek dostarczonych do paczkomatu ${paczkomatId}`,
                paczki: paczki

            });
        
        } else {
            res.status(404).json({
                wiadomość: "Brak paczek w paczkomacie"
            });
        }
    })
    .catch(err => res.status(500).json({ error: err }));
}