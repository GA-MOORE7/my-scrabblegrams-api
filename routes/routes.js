const express = require('express');
const router = express.Router();
const Puzzle = require('../model/model');

// POST /api/post
router.post('/post', async (req, res) => {
    try {
        const newPuzzle = new Puzzle(req.body);
        const savedPuzzle = await newPuzzle.save();
        res.status(201).json(savedPuzzle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET /puzzles/summary
router.get('/puzzles/summary', async (req, res) => {

    try {

        const puzzles = await Puzzle.find();

        const summaries = puzzles.map(puzzle => {

            const { _id, title, grid, createdAt } = puzzle;

            // Extract unique words
            const wordsSet = new Set(grid.map(cell => cell.word).filter(Boolean));
            const words = Array.from(wordsSet);
            const wordCount = words.length;

            // Grid density
            const filledCells = grid.filter(cell => cell.expectedLetter).length;
            const totalCells = grid.length;
            const density = `${Math.round((filledCells / totalCells) * 100)}%`;

            // Puzzle size
            const maxX = Math.max(...grid.map(cell => cell.x));
            const maxY = Math.max(...grid.map(cell => cell.y));
            const size = `${maxX + 1}x${maxY + 1}`;

            return {
                id: _id,
                title, 
                words, 
                wordCount, 
                density, 
                size, 
                createdAt
            };
        });

        res.json(summaries);

    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }

});

// DELETE /api/puzzles/:id
router.delete('/puzzle/:id', async (req, res) => {

    const { id } = req.params;

    try { 

        const deletedPuzzle = await Puzzle.findByIdAndDelete(id);

        if (!deletedPuzzle) {
            return res.status(404).json({ message: 'Puzzle not found' });
        }

        res.status(200).json({ message: 'Puzzle deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

});

// GET /api/puzzles/:id
router.get('/puzzle/:id', async (req, res) => {

    const { id } = req.params;

    try { 

        const puzzle = await Puzzle.findById(id);

        if (!puzzle) {
            return res.status(404).json({ message: 'Puzzle not found' });
        }

        res.status(200).json(puzzle);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

});


module.exports = router;
