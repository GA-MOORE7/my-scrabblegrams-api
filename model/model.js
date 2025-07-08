const mongoose = require('mongoose');

const gridItemSchema = new mongoose.Schema({
    x: {type: Number, required: true},
    y: {type: Number, required: true},
    word: {type: String, default: null},
    vertical: {type: Boolean, default: null},
    intersectsWith: {type: [String], default: null},
    expectedLetter: {type: String, default: null},
    displayedLetter: {type: String, default: null}
})

const puzzleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    grid: { type: [gridItemSchema], required: true },
    createdAt: { type: Date, default: Date.now }
});

const Puzzle = mongoose.model('Puzzle', puzzleSchema, 'scrabblegrams');

module.exports = Puzzle;