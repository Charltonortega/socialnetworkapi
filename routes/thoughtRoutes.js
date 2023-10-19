const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');

// GET all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single thought by its _id
router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST a new thought
router.post('/', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        res.status(201).json(newThought);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT to update a thought by its _id
router.put('/:id', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(updatedThought);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE to remove a thought by its _id
router.delete('/:id', async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        if (!deletedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json({ message: 'Thought deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST to create a reaction for a thought
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true }
        );
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(updatedThought);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE to remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(updatedThought);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
