const express = require('express');

function routes(Book){
    const booksRouter = express.Router();

    booksRouter.route('/books')
        .post((req, res) => {
            const book = Book(req.body);
            console.log(book);
            book.save();
            return res.status(201).json(book);

        })

        .get((req, res) => {
            const { query } = req;
            Book.find(query, (err, books) => {
            if (err) {
                return res.send(err);
            }
            return res.json(books);
            });
        });

    booksRouter.route('/books/:id')
        .get((req, res) => {
            Book.findById(req.params.id, (err, book) => {
            if (err) {
                return res.send(err);
            }
            return res.json(book);
            });

        })
        .put((req, res) => {
            Book.findById(req.params.id, (err, book) => {
                if (err) {
                    return res.send(err);
                }
                book.title = req.body.title;
                book.author = req.body.author;
                book.genre = req.body.genre;
                book.read = req.body.read;
                book.save();
                return res.json(book);

            });
        });

  return booksRouter;

}

module.exports = routes;

