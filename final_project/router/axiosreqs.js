const axios = require('axios');

// Function to register a new user
const registerUser = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:5000/register', { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Function to get list of books available in the shop
// const getBooks = async () => {
//   try {
//     const response = await axios.get('http://localhost:5000/');
//     console.log (response.data);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// }
// getBooks();

// Function to get book details by ISBN
// const getBookByISBN = async (isbn) => {
//   try {
//     const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
//     console.log (response.data);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// }
// getBookByISBN(3);

// Function to get book details by author
// const getBooksByAuthor = async (author) => {
//   try {
//     const response = await axios.get(`http://localhost:5000/author/${author}`);
//     console.log (response.data);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// }
// getBooksByAuthor("Hans Christian Andersen");



// Function to get books by title
const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    console.log (response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
getBooksByTitle("Molloy, Malone Dies, The Unnamable, the trilogy");

// // Function to get book reviews by ISBN
// const getBookReviews = async (isbn) => {
//   try {
//     const response = await axios.get(`http://localhost:5000/general/review/${isbn}`);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// }

// module.exports = { registerUser, getBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle, getBookReviews };
