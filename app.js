const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI', {
  useNewUrlParser: true
});
const booksRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

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
  });

app.use('/api', booksRouter);

app.get('/', (req, res) => {
  res.send('Welcome to this API');
});

app.listen(port, () => {
  // console.log(`Server running at ${port}`)
});
