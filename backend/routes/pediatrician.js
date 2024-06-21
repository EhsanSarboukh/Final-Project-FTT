
const express = require('express');
const router = express.Router();
const Pediatrician = require('../models/pediatriciandb');

// Register a new pediatrician
router.post('/register', (req, res) => {
    const pediatrician = req.body;

    // Check for required fields
    if (!pediatrician.id || !pediatrician.username || !pediatrician.password || !pediatrician.medicalClinic) {
        return res.status(400).json({ message: "Missing required fields", type: "error" });
    }

    // Create a new pediatrician object
    const newPediatrician = new Pediatrician({
        id: pediatrician.id,
        username: pediatrician.username,
        password: pediatrician.password,
        medicalClinic: pediatrician.medicalClinic
    });

    // Save the new pediatrician to the database
    newPediatrician.save()
        .then(savedPediatrician => {
            res.status(201).json({ message: "New user added", type: "success", user: savedPediatrician });
        })
        .catch(err => {
            console.error("Error saving pediatrician:", err);
            res.status(500).json({ message: "Database error", type: "error" });
        });
});

module.exports = router;
