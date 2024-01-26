const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify({books},null,4));                               //send all books
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;                                             //store given isbn
  if(books[isbn]){
    res.send(books[isbn]);                                                  //send book with isbn
  }//if
  else{
    res.send("");                                                           //send nothing- no match
  }//else
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;                                         //store given author
  var specific_author = {};                                                 //object to hold books
  for(key in books){
    if(books[key].author == author){                                        //author matches 
      specific_author[`${key}`] = books[key];                             //add book in isbn:book format
    }//if
  }//for
  if(Object.keys(specific_author).length === 0){
    res.send("");                                                           //send nothing- no match
  }//if
  else{
    res.send(specific_author);                                              //send object of book(s) with author
  }//else
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;                                         //store given title
    var specific_title = {};                                                //object to hold books
    for(key in books){
      if(books[key].title == title){                                        //title matches 
        specific_title[`${key}`] = books[key];                              //add book in isbn:book format
      }//if
    }//for
    if(Object.keys(specific_title).length === 0){
      res.send("");                                                         //send nothing- no match
    }//if
    else{
      res.send(specific_title);                                             //send object of book(s) with title
    }//else
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
