import React from 'react';
import { Link } from 'react-router-dom'

const NavbarHome = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a>ZeroLatency</a>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/" >Home</Link>
                </li>

                <li>
                    <Link to="/auth" >Register</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavbarHome;