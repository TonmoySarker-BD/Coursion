import React from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div>
            <header>
                <Navbar></Navbar>
            </header>
            <main className='min-h-auto  md:min-h-[60vh]' style={{
                background: 'linear-gradient(135deg, rgba(255, 94, 170, 0.3), rgba(104, 68, 217, 0.3))'
            }}>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayout;