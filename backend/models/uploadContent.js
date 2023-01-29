const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const uploadContent = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    plan: {
        type: String,
        required: true
    },
    releaseType: {
        type: String,
        required: true
    },
    songType: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artistName: {
        type: String,
        required: true
    },
    featuringArtistName: {
        type: String,
        required: false
    },
    trackList: {
        type: String,
        required: false
    },
    primaryGenre: {
        type: String,
        required: true
    },
    secondaryGenre: {
        type: String,
        required: false
    },
    productionYear: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    explicitContent: {
        type: String,
        required: true
    },
    tracks: [{
        name: String,
        url: String
    }],
    artWorkFile: {
        type: String,
        required: true
    },
    status: [{
        currentStatus: String,
        message: String,
        time: {
            type: Date,
            default : Date.now()
        }

    }],
    payment: [{
        paymentStatus: String,
        totalBill: Number,
    }],
})

// tracks: {
//     type: Array,
//     default: [],
//     required: true
// },

const UploadContentModel = mongoose.model('uploadContent', uploadContent)

module.exports = UploadContentModel;