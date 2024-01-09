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
        type: String,
        required: true
    },
    seatNumber: {
        type: Number,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// 날짜별 정렬
report.index({ createdAt: 1 });

module.exports = mongoose.model('Report', report);