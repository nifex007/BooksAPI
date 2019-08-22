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

    booksRouter.use('/books/:id', (req, res, next) => {
        Book.findById(req.params.id, (err, book) => {
            if (err) {
                return res.send(err);
            }
            if (book) {
                // attach book model schema/data to request object
                req.book = book;
                return next();
            }
            return res.sendStatus(404);
        });
    });

    booksRouter.route('/books/:id')
        .get((req, res) => res.json(req.book))
        .put((req, res) => {
            const { book } = req;
            book.title = req.body.title;
            book.author = req.body.author;
            book.genre = req.body.genre;
            book.read = req.body.read;
            book.save((err) => {
                if (err) {
                    res.send(err);
                }
                return res.json(book);
            });
            return res.json(book);
        })
        .patch((req, res) => {
            const { book } = req;
            // prevent overiding id
            if (req.body._id) {
                delete req.body._id;
            }
            Object.entries(req.body).forEach((item) => {
                const key = item[0];
                const val = item[1];
                book[key] = val;
            });
            req.book.save((err) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(book);
            });
        })
        .delete((req, res) => {
            req.book.remove((err) => {
                if (err) {
                    return res.send(err);
                }
                return res.sendStatus(204);
            });
        });
  return booksRouter;

}

module.exports = routes;

