const asynchandler = require('express-async-handler')
const Books = require('../models/bokSchema')
const bookDetailControllers = {
    addingBooks: asynchandler(async (req, res) => {
        const { title, content, author } = req.body
        if (!title || !content || !author) {
            res.status(500)
            throw new Error("complete all the fields")
        }
        const bookFound = await Books.findOne({ title, author })
        if (bookFound) {
            res.status(500)
            throw new Error("books already Exist in the collection")
        }
        const addingBooks = await Books.create(
            {
                title,
                author,
                content
            }

        )
        res.status(200)
        res.send(addingBooks)



    }),
    getOnebook: asynchandler(async (req, res) => {
        const { name } = req.query;

        if (!name) {
            return res.status(400).send('Book title is required');
        }
            const book = await Books.findOne({ title: name });
            if (!book) {
                return res.status(404).send('Book not found');
            }
            res.json(book);
        
    }),
    
    updateBook: asynchandler(async (req, res) => {
        const { title } = req.body
        const { updateAuthorName } = req.query
     
        if (!updateAuthorName) {
            return res.status(400).send('author is required');
        }

        const updateBook = await Books.findOneAndUpdate(

            { title }, { author: updateAuthorName }, {
                new: true,
            runValidators: true
        }
        );

        res.json(updateBook);

    })






}

module.exports = bookDetailControllers