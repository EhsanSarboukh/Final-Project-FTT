var mongoose = require('mongoose');
//mongoose.connect("mongo://127.0.0.1/FTTServer");
mongoose.connect("mongodb://127.0.0.1:27017/FTTServer");
var PediatricianSchema = mongoose.Schema({
    id : String,
    username : String,
    password: String,
    medicalClinic: String,
    patientsId: [String]
});
var Pediatrician = mongoose.model("Pediatrician",PediatricianSchema);
module.exports = Pediatrician;