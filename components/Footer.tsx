
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary-dark dark:bg-neutral-900 text-neutral-300">
            <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
                <p>&copy; {new Date().getFullYear()} University Admissions Portal. All Rights Reserved.</p>
                <p className="text-sm text-neutral-400 mt-1">This is a fictional website created for demonstration purposes.</p>
            </div>
        </footer>
    );
};

export default Footer;
