const mongoose = require("mongoose")
const Schema = mongoose.Schema

const HealthRecordSchema = new Schema({
    heartRate:{
        type: Number,
        required: true,
    },
    bodyTemperature:{
        type: Number,
        required: true,
    },
    bloodPressure:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required:true,
    }
});

HealthRecordSchema.pre('save', function(next) {
    if (this.date) {
      const date = new Date(this.date);
      const year = date.getFullYear();
      const month = (`0${date.getMonth() + 1}`).slice(-2);
      const day = (`0${date.getDate()}`).slice(-2);
      this.date = `${year}-${month}-${day}`;
    }
    next();
});

const HealthRecordModel = mongoose.model("HealthRecord", HealthRecordSchema);
module.exports = HealthRecordModel;