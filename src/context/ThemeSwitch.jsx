import React from 'react';
import { useTheme } from './ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button className='mx-4 p-2 rounded-full  hover:bg-gray-600 '>
            <div onClick={toggleTheme}>
                {theme === "light" ? (
                    
                    <FaMoon></FaMoon>
                ) : (
                    <FaSun></FaSun>
                )}
            </div>
        </button>
    );
};

export default ThemeSwitch;