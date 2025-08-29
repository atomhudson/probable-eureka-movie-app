import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  const activeLinkStyle = {
    textDecoration: "underline",
    color: "#4d17d4",
  };

  return (
    <>
      <header className="site-header">
        <nav className="absolute top-0 left-0 w-full px-4 lg:px-6 py-3 z-20 bg-transparent">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <NavLink to="/" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="MovieApp Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                MovieApp
              </span>
            </NavLink>
            <div className="flex items-center lg:order-2">
              <button
                data-collapse-toggle="mobile-menu"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-200 
                  rounded-lg lg:hidden hover:bg-gray-800 focus:outline-none 
                  focus:ring-2 focus:ring-gray-600"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <NavLink
                    to="/"
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : undefined
                    }
                    className="block py-2 pr-4 pl-3 text-white hover:text-violet-400 lg:p-0"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : undefined
                    }
                    className="block py-2 pr-4 pl-3 text-white hover:text-violet-400 lg:p-0"
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/developer"
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : undefined
                    }
                    className="block py-2 pr-4 pl-3 text-white hover:text-violet-400 lg:p-0"
                  >
                    Developer
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className="pattern"></div>
        <div className="wrapper">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
