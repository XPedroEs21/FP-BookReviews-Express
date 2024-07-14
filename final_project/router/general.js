const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
const username= req.body.username;
const password = req.body.password;

if (username && password) {
  if (!isValid(username)) {
    users.push*({"username": username, "password": password });
    return res.status(200).json({message: "User succesfully registered, now you can login"});
  } else {
    return res.status(404).json({message: "User already exists"});
  }
}
  return res.status(404).json({message: "Unable to register user"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
let ISBN = parseInt(req.params.isbn);
if (ISBN <1 || ISBN > 10) {
  res.send("Wrong ISBN number, please select ISBN between 1 and 10");
} else {
  res.send(books[ISBN]);
}
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
let author = req.params.author;
let results = [];

for(let key in books) {
  if(books[key].author === author) {
    results.push(books[key]);
  }
}
res.send(results);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
let title = req.params.title;
let results = [];

for (let key in books){
  if(books[key].title === title) {
    results.push(books[key]);
  }
}
res.send(results);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let ISBN = parseInt(req.params.isbn);
  if (ISBN <1 || ISBN > 10) {
    res.send("Wrong ISBN number, please select ISBN between 1 and 10");
  } else {
    let book = books[ISBN];
    if (book) {
      res.send(book.reviews);
    }
  }
});

module.exports.general = public_users;
