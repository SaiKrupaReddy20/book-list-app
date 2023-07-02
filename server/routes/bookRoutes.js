const express = require('express');
const asyncHandler = require('express-async-handler');
const bookRoutes = express.Router();
const Book = require('../models/Book');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');


bookRoutes.post('/', asyncHandler(async (req, res) => {
    const book = await Book.create(req.body);

    if(book) {
        res.status(200);
        res.json(book);
    } else {
        res.status(500);
        throw new Error('Book creation failed');
    }
  })
);

bookRoutes.get('/', asyncHandler(async (req, res) => {
    const book = await Book.find({});

    if(book) {
        res.status(200);
        res.json(book);
    } else {
        res.status(500);
        throw new Error('No books');
    }
  })
);

bookRoutes.get('/:id', asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if(book) {
        res.status(200);
        res.json(book);
    } else {
        res.status(500);
        throw new Error('Book not found');
    }
  })
);

bookRoutes.put('/:id', asyncHandler(async (req, res) => {
    console.log(req);
    const book = await Book.findById(req.params.id);
    if(book) {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {
                new: true,
                runValidators: true
            }
        );
        res.status(200);
        res.json(updatedBook);
    } else {
        res.status(500);
        throw new Error('Update failed');
    }
  })
);

bookRoutes.delete('/:id', asyncHandler(async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        res.status(200);
        res.send(book);
    } catch(error) {
        res.json(error);
    }
  })
);



module.exports = bookRoutes;