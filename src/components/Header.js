import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/OIP.jpeg'; 




const Header = () => {
    return (
        <div className='flex gap-36 items-center justify-center mt-2'>
            <img src={logo} className='w-[50px]' alt="Logo"/>
            <ul className='flex gap-4 md:gap-14 text-center'>
                <li className='hover:text-orange-500 cursor-pointer'>
                    <Link to="/">Accueil</Link>
                </li>
                <li className='hover:text-orange-500 cursor-pointer'>
                    <Link to="/Add">Add a post</Link>
                </li>
            </ul>
        </div>
    );
};

export default Header; 