var mongoose = require('mongoose');
//mongoose.connect("mongo://127.0.0.1/FTTServer");
mongoose.connect("mongodb://127.0.0.1:27017/FTTServer");
var patientSchema = mongoose.Schema({
    id : String,
    firstName: String,
    lastName:String,
    birthDate:Date,
    alergics:String,
    motherHeight: Number,
    fatherHeight:Number,
    motherWeight: Number,
    fatherWeight:Number,
    motherHeight: Number,
    motherAge:Number,
    gender : String,
    birthWeight : Number,
    Month6Weight : Number,
    Month12Weight : Number, 
    Month18Weight : Number, 
    Month24Weight : Number, 
    Month36Weight : Number, 
    Month48Weight : Number,
    Month60Weight : Number,
});
var Patient = mongoose.model("Patient",patientSchema);
module.exports = Patient;