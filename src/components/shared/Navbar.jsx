import React, { use } from 'react';
import { Link, useNavigate } from 'react-router';
import ThemeSwitch from '../../context/ThemeSwitch';
import logo from "../../assets/logo.png";
import { AuthContext } from '../../context/Auth/AuthContext';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
const Navbar = () => {
    const { user, logout } = use(AuthContext);
    const navigate = useNavigate();


    const handleLogout = async () => {
        try {
            await logout();
            navigate("/signin");
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };
    const menu = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            {user && <li><Link to="/my-courses">My Courses</Link></li>}
            {user && <li><Link to="/add-course">Add Course</Link></li>}
            {user && <li><Link to="/manage-courses">Manage Courses</Link></li>}
        </>
    );

    return (
        <div className="navbar bg-success/50 shadow-sm px-[5%]">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <Link to="/" className="text-xl font-bold flex items-center gap-2">
                    <img className="w-10" src={logo} alt="Coursion" />
                    Coursion
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{menu}</ul>
            </div>

            <div className="navbar-end flex items-center">
                <ThemeSwitch />
                {!user ? (
                    <div className="flex gap-2">
                        <Link to="/signin" className="btn btn-sm btn-outline">Sign In</Link>
                        <Link to="/register" className="hidden md:flex btn btn-sm btn-outline">Register</Link>
                    </div>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user.photoURL || "https://i.ibb.co/MBtjqXQ/default-avatar.png"} alt="Profile" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-20 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li><p className="text-sm"><FaUser></FaUser> {user.displayName}</p></li>
                            <li><button onClick={handleLogout}> <FaSignOutAlt></FaSignOutAlt> Logout</button></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
