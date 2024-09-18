import React from 'react';
import { useContext } from'react';
import NavbarHome from './NavbarHome';
import NavbarUser from './NavbarUser';
import { AuthContext } from '../../App';


const Navbar = () => {
    const {isLoggedIn}= useContext(AuthContext)
    return (
        <div>
            {isLoggedIn ? <NavbarUser /> : <NavbarHome />}
        </div>
    );
}

export default Navbar;