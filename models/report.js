const mongoose = require('mongoose')

const { Schema } = mongoose;

const report = new Schema({
    reporter: {
        type: String,
        required: true
    },
    reported: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

report.index({ createdAt: 1 });

module.exports = mongoose.model('Report', report);