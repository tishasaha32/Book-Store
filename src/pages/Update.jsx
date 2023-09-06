import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  // State to hold the updated book's information
  // const [book, setBook] = useState({
  //   title: "",
  //   desc: "",
  //   price: null,
  //   cover: "",
  //   copies: 0,
  // });
  const [book, setBook] = useState(null)
  
  // State to manage error state
  const [error, setError] = useState(false);

  // Retrieve the current location object
  const location = useLocation();

  // Hook to navigate to other routes
  const navigate = useNavigate();

  // Extract the book ID from the URL
  const bookId = location.pathname.split("/")[2];

  // Function to handle input changes
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const getBook = async()=> {
      try {
        // Send GET request to fetch books from the server
        const res = await axios.get("http://localhost:8800/books");
        // Update the state with the fetched books
        const singleBook = await res?.data?.filter((book) => book.id == bookId)[0]
        setBook(singleBook)
        console.log(singleBook, "GETTING SINGLE BOOK UPDATE")
        // setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getBook()
  }, [bookId])
  

  // Function to handle updating the book
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the book
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      // Navigate back to the main page after successful update
      navigate("/");
    } catch (err) {
      console.log(err);
      // Set error state in case of an error during update
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        value={book?.title}
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Book desc"
        name="desc"
        value={book?.desc}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        value={book?.price}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="cover"
        value={book?.cover}
        onChange={handleChange}
      />
      {/* <input
        type="number"
        placeholder="Number of copies available"
        name="copies"
        value={book?.copies}
        onChange={handleChange}
      /> */}
      <button onClick={handleClick}>Update</button>
      {/* Display an error message if an error occurred */}
      {error && "Something went wrong!"}
      {/* Link to navigate back to the main page */}
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Update;
