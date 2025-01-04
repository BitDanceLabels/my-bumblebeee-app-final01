import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

// import component 👇
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'
import { List, X } from '@phosphor-icons/react';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  return (
    <div className="w-full md:w-1/6 bg-gray-950 sticky top-0 z-30 flex md:flex-col py-2 md:py-4 items-center px-1 md:min-h-screen">
      <img
        src="https://static.ybox.vn/2023/10/6/1698477954059-pham-minh-nhut10fk619l-avatar.png"
        alt=""
        className="w-10 mx-2 md:w-1/3 md:mt-1 rounded-full md:mx-auto "
      />
      <p className="text-l w-full text-left md:mt-2 md:text-center text-semibold text-white">
        Bitdance Entertaiment
      </p>
      <ul className="w-full list-none hidden md:flex flex-col justify-start color-white font-semibold border-t-1 border-solid border-white mt-4">
        <Link
          to="/"
          className="flex px-2 text-white font-semibold no-underline w-full py-4 text-sm rounded-xl hover:bg-[#c1c1c1] hover:text-black"
        >
          Dashboard
        </Link>
        <Link
          to="/rank"
          className="px-2 text-white font-semibold no-underline w-full py-4 text-sm rounded-xl hover:bg-[#c1c1c1] hover:text-black"
        >
          Ranking
        </Link>

      </ul>
      <button className='text-white md:hidden pr-2' onClick={toggleDrawer}>
        <List size={24} color='white' />
      </button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='right'
        className='bla bla bla'
      >
        <div className='w-full h-screen p-4'>
          <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Menu</h5>
          <button type="button" onClick={() => setIsOpen(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
            <X size={24} color='black' />
          </button>
          <div className="py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                  <span className="ms-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/rank"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                  <span className="flex-1 ms-3 whitespace-nowrap">Ranking</span>
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Sidebar