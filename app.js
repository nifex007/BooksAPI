const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI', {
  useNewUrlParser: true
});
const booksRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');

booksRouter.route('/books')
  .get((req, res) => {
    const { query } = req;
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    });
  });

app.use('/api', booksRouter);

app.get('/', (req, res) => {
  res.send('Welcome to this API');
});

app.listen(port, () => {
  // console.log(`Server running at ${port}`)
});
