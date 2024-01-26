const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    let userswithsamename = users.filter((user)=>{                              //check for existing username
        return user.username === username
    });
      if(userswithsamename.length > 0){
        return true;                                                            //username exists
      }//if
      else {
        return false;                                                           //username doesn't exist
      }//else
}//isValid

const authenticatedUser = (username,password)=>{ //returns boolean
    let validusers = users.filter((user)=>{                                     //check for valid user
        return (user.username === username && user.password === password)
      });
      if(validusers.length > 0){                                                
        return true;                                                            //user is a valid user
      }//if 
      else {
        return false;                                                           //user is invalid
      }//else
}//authenticatedUser

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;                                         //store given username
    const password = req.body.password;                                         //store given password
  
    if (!username || !password) {   
        return res.status(404).json({message: "Error logging in"});             //missing username/password
    }//if                                                                       //return error message
  
    if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({                                              //use jwt to sign in
        data: password
      }, 'access', { expiresIn: 60 });                                          //sign in within 60seconds
  
      req.session.authorization = {
        accessToken,username                                                    //session auth
      }//req
      return res.status(200).send("User successfully logged in");               //return logged in message
    }//if
    else {                                                                      //somethings wrong- send error message
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }//else
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
