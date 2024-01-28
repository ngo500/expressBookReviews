const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// POST a new user
public_users.post("/register", (req,res) => {
    const username = req.body.username;                                     //store given username
    const password = req.body.password;                                     //store given password
    if (!username || !password) {                                           //check if both username and password received
        return res.status(404).json({message: "Please enter both a valid username and a valid password to register!"});
    }//if
    if(isValid(username)){                                                  //check if username is already taken
        return res.status(404).json({message: "Username is taken. Please enter a different username!"});
    }//if
    else{
        users.push({"username":username,                                    //username and password fine, register new user
        "password":password});
        return res.status(200).send("User successfully registered!");
    }//else
});

// GET the book list available in the shop
public_users.get('/',function (req, res) {
    const getAllBooksPromise = new Promise((resolve, reject) => {           //create promise
        resolve(books);
    });
    getAllBooksPromise
        .then((books) =>
            res.send(JSON.stringify({books},null,4)));                    //send all books
});

// GET book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;                                             //store given isbn
  if(books[isbn]){
    res.send(books[isbn]);                                                  //send book with isbn
  }//if
  else{
    res.send("");                                                           //send nothing- no match
  }//else
 });
  
// GET book details based on author
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

// GET all books based on title
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

//  GET book review based on isbn
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;                                             //store given isbn
  if(books[isbn].reviews){
    res.send(books[isbn].reviews);                                          //send book reviews for given isbn
  }//if
  else{
    res.send("");                                                           //send nothing- no match
  }//else
});

module.exports.general = public_users;
