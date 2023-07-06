const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoints
app.get('/api/books', (req, res) => {
  const books = [
    {
      "book_id": "1",
      "book_details": {
        "book_name": "The Great Gatsby",
        "book_author": "F. Scott Fitzgerald",
        "description": "abc book by xyz",
        "quantity": 100
      }
    },
    {
      "book_id": "2",
      "book_details": {
        "book_name": "To Kill a Mockingbird",
        "book_author": "Harper Lee",
        "description": "1960",
        "quantity": 8
      }
    },
    {
      "book_id": "3",
      "book_details": {
        "book_name": "1984",
        "book_author": "George Orwell",
        "description": "1949",
        "quantity": 3
      }
    }];
  res.json(books);
});

app.post('/api/books', (req, res) => {
  const book = req.body;
  console.log(book);
  res.json(book);
});
app.delete('/api/books/:id', (req, res) => {
  const bookId = req.params.id;
  res.json({ message: `Book with ID ${bookId} deleted successfully` });
});

app.put('/api/books/:id', (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;
  res.json(updatedBook);
});


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
