import React from 'react';
import { Link } from 'react-router-dom'


const NavbarUser = () => {
    const HandleLogout = () => {
        document.cookie =`jwt= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        window.location.reload();
    }
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a>ZeroLatency</a>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/stream" >Stream</Link>
                </li>

                <li>
                    <Link to="/auth" >WatchStream</Link>
                </li>

                <li>
                    <Link to="/" onClick={HandleLogout} >Logout</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavbarUser;