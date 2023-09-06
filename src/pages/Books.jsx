import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../Books.css';

const Books = () => {
  // State to hold the list of books
  const [books, setBooks] = useState([]);


  // Fetch books from the server when the component mounts
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        // Send GET request to fetch books from the server
        const res = await axios.get("http://localhost:8800/books");
        // Update the state with the fetched books
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  // Function to handle book deletion
  const handleDelete = async (id) => {
    try {
      // Send DELETE request to delete the selected book by ID
      await axios.delete(`http://localhost:8800/books/${id}`);
      // Reload the page to reflect the updated list of books
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  //Function to handle Issue
  // const handleIssue = async (e, bookId) => {
  //   e.preventDefault();
  //   const newBooks = [...books]
  //   const book = newBooks.filter((book)=>book.id === bookId)[0];
  //   book.copies -= 1;
  //   setBooks(newBooks)

  //   try {
  //     // Send a PUT request to update the book
  //     await axios.put(`http://localhost:8800/books/${bookId}`, book);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   console.log(book,'*******')
  // }

  return (
    <div>
      <div className="navBar">
        <h1 className="navbarTitle">Welcome to the Knowledge World</h1>
        <div className="navbarButtonContainer">
          <button className="navbarButton">
            <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}> Add new book</Link>
          </button>
          {/* <button className="navbarButton">Issue a Book</b  utton> */}
        </div>
      </div>
      <div className="books">
        <div className="booksContainer">
        {books.map((book) => (
          <div key={book.id} className="book">
            <div className="bookCover">
              <img src={book.cover} alt="" />
            </div>
            <h2 className="bookTitle">{book.title}</h2>
            <p className="bookDesc">{book.desc}</p>
            <div className="priceAndCopies">
              <p>${book.price}</p>
              {/* <p>Total Books: {book.copies}</p> */}
            </div>
            <div className="buttonsContainer">
              <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
              <button className="update"> <Link to={`/update/${book.id}`} style={{ color: "inherit", textDecoration: "none" }}> Update</Link></button>
              {/* {book.copies ? <button className="issue" onClick={(e)=>handleIssue(e,book.id)}>Issue</button> : <button className="issue" onClick={(e)=>handleIssue(e,book.id)} disabled style={{backgroundColor: 'grey'}}>Issue</button>} */}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
