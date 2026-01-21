const mongoose = require("mongoose")
//importujemy model
const Paczka = require("../models/paczka");

exports.paczki_get_all = (req, res, next) => {
    Paczka.find()
        .populate("kurier", "imie nazwisko") // Pobiera dane kuriera (np. imię i nazwisko)
        .populate("paczkomat", "miasto adres") // Pobiera dane paczkomatu (np. lokalizację)
        .then(result => {
            res.status(200).json({
                wiadomość: "Lista wszystkich przesyłek",
                paczki: result
            });
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.paczki_add_new = (req, res, next) => {
    // Tworzenie obiektu przesyłki
    const paczka = new Paczka({
        kodPaczki: req.body.kodPaczki,
        kurier: req.body.kurierId, // ID kuriera z requestu
        paczkomat: req.body.paczkomatId,   // ID paczkomatu z requestu
        status: req.body.status      // Opcjonalny status przesyłki
    });

    // Zapis do bazy
    paczka.save()
        .then(result => {
            res.status(201).json({
                wiadomość: "Nowa przesyłka została dodana!",
                paczka: result
            });
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.paczki_get_by_id = (req, res, next) => {
    const id = req.params.paczkaId;
    Paczka.findById(id)
        .populate("kurier", "imie nazwisko") // Pobiera dane kuriera
        .populate("paczkomat", "miasto adres") // Pobiera dane paczkomatu
        .then(result => {
            if (result) {
                res.status(200).json({
                    wiadomość: `Szczegóły paczki o numerze ${id}`,
                    paczka: result
                });
            } else {
                res.status(404).json({
                    wiadomość: `Nie znaleziono paczki o numerze ${id}`
                });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.paczki_update = (req, res, next) => {
    const id = req.params.paczkaId;
    const updatedFields = {
        kodPaczki: req.body.kodPaczki,
        kurier: req.body.kurierIdId,
        paczkomat: req.body.paczkomatId,
        status: req.body.status
    };

    Paczka.findByIdAndUpdate(id, updatedFields, { new: true })
        .then(result => {
            if (result) {
                res.status(200).json({
                    wiadomość: `Zaktualizowano paczke o numerze ${id}`,
                    updatedPaczka: result
                });
            } else {
                res.status(404).json({
                    wiadomość: `Nie znaleziono paczki o numerze ${id}`
                });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
};

exports.paczki_delete = (req, res, next) => {
    const id = req.params.paczkaId;
    Paczka.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                res.status(200).json({
                    wiadomość: `Usunięto paczke o numerze ${id}`
                });
            } else {
                res.status(404).json({
                    wiadomość: `Nie znaleziono paczki o numerze ${id}`
                });
            }
        })
        .catch(err => res.status(500).json({ error: err }));
};