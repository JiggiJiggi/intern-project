import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="flex justify-between items-center p-4 bg-blue-800 shadow-md">
            <div className="text-lg font-bold">LOGO</div>
            <div className="flex space-x-4">
                <a href="https://x.com/crackinterviewH" className="hover:text-black">Twitter</a>
                <a href="https://www.facebook.com/profile.php?id=61564629252308" className="hover:text-black">Facebook</a>
                <a href="https://www.linkedin.com/company/crackinterview/?viewAsMember=true" className="hover:text-black">LinkedIn</a>
            </div>
        </footer>
    );
}

export default Footer;