const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
let userswithsamename = users.filter((user)=>{
    console.log(users);
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
// Find a user with the matching username and password
    let validUser = users.find(user => user.username === username && user.password === password);

    // Return true if validUser is found, otherwise return false
    return !!validUser;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  console.log(users);
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
 if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.session.authorization.username;

    if (!isbn || !review || !username) {
        return res.status(400).json({ message: "ISBN, review query parameter, and username session are required." });
    }

    // Check if the book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found." });
    }

    // Check if the book already has a review from the current user
    if (books[isbn].reviews.hasOwnProperty(username)) {
        // Modify existing review
        books[isbn].reviews[username] = review;
        return res.status(200).json({ message: "Review updated successfully." });
    } else {
        // Add new review
        books[isbn].reviews[username] = review;
        return res.status(200).json({ message: "Review added successfully." });
    }

  
});
regd_users.delete("/auth/review/:isbn", (req, res) => {

const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  // Check if the book exists
  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found." });
  }

  // Check if the book has any reviews
  if (!books[isbn].reviews) {
    return res.status(404).json({ message: "No reviews found for this book." });
  }

  // Delete the review for the given ISBN and username
  if (books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({ message: "Review deleted successfully." });
  } else {
    return res.status(404).json({ message: "Review not found for this user." });
  }

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
