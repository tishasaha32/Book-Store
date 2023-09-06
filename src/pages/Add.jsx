import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  // State to hold the new book's information
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
    copies:0,
  });
  
  // State to manage error state
  const [error, setError] = useState(false);

  // Hook to navigate to other routes
  const navigate = useNavigate();

  // Function to handle input changes
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle adding a new book
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to add the new book
      await axios.post("http://localhost:8800/books", book);
      // Navigate back to the main page after successful addition
      navigate("/");
    } catch (err) {
      console.log(err);
      // Set error state in case of an error during addition
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>New Book Entry</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Book desc"
        name="desc"
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="cover"
        onChange={handleChange}
      />
      {/* <input
        type="number"
        placeholder="Number of copies available"
        name="copies"
        onChange={handleChange}
      /> */}
      <button onClick={handleClick}>Add</button>
      {/* Display an error message if an error occurred */}
      {error && "Something went wrong!"}
      {/* Link to navigate back to the main page */}
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Add;
