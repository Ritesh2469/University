
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { University } from '../types';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors duration-200"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )}
        </button>
    );
};


const Header: React.FC<{ universities: University[] }> = ({ universities }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const currentUniversity = universities.find(u => `/${u.slug}` === location.pathname);

    return (
        <header className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm dark:shadow-md dark:shadow-black/20 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        {currentUniversity && (
                            <img className="h-10 object-contain" src={currentUniversity.logoUrl} alt={`${currentUniversity.name} Logo`} />
                        )}
                    </div>
                    <nav className="hidden md:flex items-center space-x-2">
                        <div className="flex items-baseline space-x-4">
                            {universities.map((uni) => (
                                <NavLink
                                    key={uni.id}
                                    to={`/${uni.slug}`}
                                    className={({ isActive }) =>
                                        `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                            isActive
                                                ? 'bg-primary text-white'
                                                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white'
                                        }`
                                    }
                                >
                                    {uni.name}
                                </NavLink>
                            ))}
                        </div>
                         <ThemeToggle />
                    </nav>
                    <div className="md:hidden flex items-center">
                        <ThemeToggle />
                        <button onClick={() => setIsOpen(!isOpen)} className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:text-white dark:hover:text-white hover:bg-primary dark:hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                            <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden border-t border-neutral-200 dark:border-neutral-700`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {universities.map((uni) => (
                         <NavLink
                            key={uni.id}
                            to={`/${uni.slug}`}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-primary text-white'
                                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white'
                                }`
                            }
                        >
                            {uni.name}
                        </NavLink>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;
