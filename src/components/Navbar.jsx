import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import Contextpage from '../Contextpage';
import logo from "../assets/images/logo.png";
import User from '../assets/images/User.jpg';
import { auth } from '../../firebase';
import { toast } from "react-toastify";

function Navbar() {
    const { user } = useContext(Contextpage);
    const [activemobile, setActivemobile] = useState(false);

    const Navdata = [
        { id: 1, Name: "GENRES", link: "/" },
        { id: 2, Name: "TRENDING", link: "/trending" },
        { id: 3, Name: "UPCOMING", link: "/upcoming" },
        { id: 4, Name: "FAVOURITES", link: "/favorite" },
        { id: 5, Name: "CONNECT", link: "/connect" }
    ];

    return (
        <>
            <button className="z-50 text-3xl text-white fixed top-5 right-5 m-6 p-4 rounded-full bg-pink-500 md:hidden"
                onClick={() => setActivemobile(!activemobile)}>
                {activemobile ? <HiX /> : <HiMenuAlt1 />}
            </button>

            <nav className={`fixed top-0 inset-x-0 bg-gray-900 md:bg-transparent z-40 md:flex md:items-center md:justify-between md:py-4 md:px-8 sticky`}>
                <div className="flex justify-between items-center px-4 py-2 md:px-8 md:py-4 gap-8">
                    <Link to="/" className="flex items-center gap-4" onClick={() => setActivemobile(false)}>
                        {/* <img src={logo} alt="Logo" className="w-24 hidden md:block" /> */}
                        <span className="text-xl md:text-2xl font-bold text-pink-500">ONE TV</span>
                    </Link>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <ul className="md:flex md:gap-12">  {/* Increased gap for better spacing */}
                            {Navdata.map(item => (
                                <Link key={item.id} to={item.link}
                                      className="block text-white p-2 hover:bg-pink-700 rounded transition duration-300"
                                      onClick={() => setActivemobile(false)}>
                                    {item.Name}
                                </Link>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {user ? (
                    <div className="flex items-center gap-4 p-4">
                        <img src={user.photoURL || User} alt="User" className="h-10 w-10 rounded-full" />
                        <span className="text-white">{user.displayName}</span>
                        <button onClick={() => { auth.signOut(); toast.error("Logged out successfully"); }}
                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition duration-300">
                            Log out
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="text-white bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded transition duration-300"
                          onClick={() => setActivemobile(false)}>
                        Log in
                    </Link>
                )}
            </nav>
        </>
    );
}

export default Navbar;
