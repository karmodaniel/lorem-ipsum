const mongoose = require('../database');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    initialDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    projectValue: {
        type: Number,
        required: true
    },
    risk: {
        type: Number,
        required: true
    },
    participants: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
