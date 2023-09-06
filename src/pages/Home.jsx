import React from 'react'
import '../Home.css';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className='home'>
        <div className='homeContent'>
            <h1 className='title'>Welcome to LMS</h1>
            <div className='buttonContainer'>
                <Link to="/add"><button>Add Book</button></Link>
                <Link to="/books"><button>View Books</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Home