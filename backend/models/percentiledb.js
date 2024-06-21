var mongoose = require('mongoose');
//mongoose.connect("mongo://127.0.0.1/FTTServer");
mongoose.connect("mongodb://127.0.0.1:27017/FTTServer");
var PercentileSchema = mongoose.Schema({
    id : String,
    month6Percentile : Number,
    month12Percentile: Number,
    month18Percentile : Number,
    month24Percentile: Number,
    month36Percentile : Number,
    month48Percentile: Number,
    month60Percentile : Number,
    period1Percentile: Number,
    period2Percentile: Number,
    period3Percentile: Number,
    majorPercentileCrossed:Number,
    severity:Number,
    postnatalGrowthIndication: String
});
var Percentile = mongoose.model("Percentile",PercentileSchema);
module.exports = Percentile;