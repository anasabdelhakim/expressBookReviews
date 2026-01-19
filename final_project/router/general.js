const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 6: Register a new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Task 1: Get the book list available in the shop
public_users.get("/", function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Task 2: Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
});

// Task 3: Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  let filtered_books = [];

  for (let key in books) {
    if (books[key].author === author) {
      filtered_books.push(books[key]);
    }
  }

  res.send(filtered_books);
});

// Task 4: Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  let filtered_books = [];

  for (let key in books) {
    if (books[key].title === title) {
      filtered_books.push(books[key]);
    }
  }

  res.send(filtered_books);
});

// Task 5: Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

// Task 10: Get all books using async callback function
const axios = require("axios");

public_users.get("/async/books", async function (req, res) {
  try {
    // Simulate async operation - in real scenario, this would be an external API call
    const getBooks = () => {
      return new Promise((resolve, reject) => {
        resolve(books);
      });
    };

    const allBooks = await getBooks();
    res.send(JSON.stringify(allBooks, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books" });
  }
});

// Task 11: Search by ISBN using Promises
public_users.get("/async/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;

  const getBookByISBN = new Promise((resolve, reject) => {
    const book = books[isbn];
    if (book) {
      resolve(book);
    } else {
      reject("Book not found");
    }
  });

  getBookByISBN
    .then((book) => res.send(book))
    .catch((error) => res.status(404).json({ message: error }));
});

// Task 12: Search by Author using Promises
public_users.get("/async/author/:author", function (req, res) {
  const author = req.params.author;

  const getBooksByAuthor = new Promise((resolve, reject) => {
    let filtered_books = [];
    for (let key in books) {
      if (books[key].author === author) {
        filtered_books.push(books[key]);
      }
    }
    if (filtered_books.length > 0) {
      resolve(filtered_books);
    } else {
      reject("No books found by this author");
    }
  });

  getBooksByAuthor
    .then((books) => res.send(books))
    .catch((error) => res.status(404).json({ message: error }));
});

// Task 13: Search by Title using Promises
public_users.get("/async/title/:title", function (req, res) {
  const title = req.params.title;

  const getBooksByTitle = new Promise((resolve, reject) => {
    let filtered_books = [];
    for (let key in books) {
      if (books[key].title === title) {
        filtered_books.push(books[key]);
      }
    }
    if (filtered_books.length > 0) {
      resolve(filtered_books);
    } else {
      reject("No books found with this title");
    }
  });

  getBooksByTitle
    .then((books) => res.send(books))
    .catch((error) => res.status(404).json({ message: error }));
});

module.exports.general = public_users;
