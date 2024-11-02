const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    qayerdan: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    qayerga: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 50
    },
    jonahKetishVaqti: {
        type: String,
        required: true
    },
    yetibBorishVaqti: {
        type: String,
        required: true
    },
    davomiyti: {
        type: String,
        required: true
    },
    sana: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'completed'],
        default: 'active'
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('Route', routeSchema);