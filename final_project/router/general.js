const express = require('express');
let books = require("./booksdb.js");
const axios = require('axios');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "User already exists!" });
  }

  // Add new user to the users array
  users.push({"username":username,"password":password})
  return res.status(201).json({ message: "User successfully registered. Now you can login." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    let booksInfo = "";

    // Loop through each book in the books object
    Object.keys(books).forEach(key => {
        let book = books[key];
        booksInfo += `Title: ${book.title}\nAuthor: ${book.author}\n Reviews: ""\n`;
    });

    res.send(booksInfo); // Sending the response with the accumulated book information
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  res.send(books[isbn]);
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
  Object.keys(books).forEach(key => {
        let book = books[key];
        if (author == book.author){
          res.send(book);
        }
    });

  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;
  Object.keys(books).forEach(key => {
        let book = books[key];
        if (title == book.title){
          res.send(book);
        }
    });

  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
