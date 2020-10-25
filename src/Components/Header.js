import React from 'react'
import { Container } from 'react-bootstrap';

function Header({handleLogout}) {
    return (
        <div className=" topnav">
            <a href="" onClick={handleLogout}>Logout</a>
            <a href="#home">Home</a>
            <a href="#news">News</a>
            <a href="#contact">Contact</a>
        </div>
    )
}

export default Header
