import React from 'react';
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="hidden md:flex justify-end items-center p-3 bg-transparent shadow-sm w-full rounded-sm h-10">
      <Link className='text-semibold ms-5 text-gray-600 ' to="/">
        <i className="fa-solid fa-bell"></i>
      </Link>
      <Link className='text-semibold ms-5 text-gray-600 ' to="/">Log out</Link>
    </div>
  );
}

export default Header