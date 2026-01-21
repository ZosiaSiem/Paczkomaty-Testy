const express = require("express")
const router = express.Router();
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
//import bcrypt
const bcrypt = require("bcrypt")
//importujemy model
const User = require("../models/user");
const { token } = require("morgan");

//zakładanie konta
router.post("/signup",(req, res, next) => {
    // Walidacja
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({wiadomosc: "Email i hasło są wymagane"})
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.status(500).json({wiadomosc: err})

        const user = new User({
            email: req.body.email,
            password: hash
        })

    user
    .save()
    .then(() => res.status(201).json({wiadomosc: "Dodano uzytkownika"}))
    .catch(err => res.status(500).json({wiadomosc: err}))
    })

})
 
//logowanie
router.post("/login", (req, res, next) => {
    //najpierw sprawdzam czy jest taki email
    User
    .findOne({email: req.body.email})
    .then(user => {
        //jesli jest to pobieram obiket usera
        if (!user) return res.status(401).json({wiadomosc: "Błąd autoryzacji"})
        
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(err) return res.status(500).json({wiadomosc: err})
                if(!result) return res.status(404).json({wiadomosc: "Złe dane"})
                //jak jest ok to zwracam JWT token
               const token = jwt.sign({user: user._id, email: user.email},process.env.JWT_KEY, { expiresIn: "1d"})
                return res.status(200).json({ token })
            })
    })
    //weryfikuję hasha 
})
 
module.exports = router