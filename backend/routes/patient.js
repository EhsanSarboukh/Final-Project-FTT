const express = require('express');
const router = express.Router();
const Patient = require('../models/patientdb');

// Handle POST request to '/DiagnoseForm'
router.post('/DiagnoseForm', async (req, res) => {
    const patient = req.body;

    try {
        // Check for required fields
        if (!patient.id || !patient.firstName || !patient.lastName || !patient.birthDate || !patient.motherHeight || !patient.alergics || !patient.fatherHeight || !patient.fatherWeight) {
            return res.status(400).json({ message: "Missing required fields", type: "error" });
        }

        // Create a new patient object
        const newPatient = new Patient({
            id: patient.id,
            firstName: patient.firstName,
            lastName: patient.lastName,
            birthDate: patient.birthDate,
            alergics: patient.alergics,
            motherHeight: patient.motherHeight,
            fatherHeight: patient.fatherHeight,
            motherWeight: patient.motherWeight,
            fatherWeight: patient.fatherWeight,
            motherAge: patient.motherAge,
            gender: patient.gender,
            birthWeight: patient.birthWeight,
            Month6Weight: patient.Month6Weight,
            Month12Weight: patient.Month12Weight,
            Month18Weight: patient.Month18Weight,
            Month24Weight: patient.Month24Weight,
            Month36Weight: patient.Month36Weight,
            Month48Weight: patient.Month48Weight,
            Month60Weight: patient.Month60Weight
        });

        // Save the new patient to the database
        const savedPatient = await newPatient.save();

        res.status(201).json({ message: "New user added", type: "success", user: savedPatient });
    } catch (err) {
        console.error("Error saving patient:", err);
        res.status(500).json({ message: "Database error", type: "error" });
    }
});

module.exports = router;
