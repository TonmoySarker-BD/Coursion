import React from 'react';
import { Link } from 'react-router';
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content px-[5%] py-10 mt-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <img src={logo} alt="Coursion" className="w-10" />
                        <span className="text-xl font-bold">Coursion</span>
                    </div>
                    <p className="text-sm">Empowering learners to achieve their goals with quality online courses.</p>
                    <div className="flex gap-4 mt-4 text-xl">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
                        <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-lg mb-2">Explore</h4>
                    <ul className="space-y-1">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/courses">Courses</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-lg mb-2">Account</h4>
                    <ul className="space-y-1">
                        <li><Link to="/signin">Sign In</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/terms&conditions">Terms & Conditions</Link></li>
                    </ul>
                </div>
            </div>

            <div className="text-center mt-10 border-t pt-5 text-sm text-gray-500">
                © {new Date().getFullYear()} Coursion. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;