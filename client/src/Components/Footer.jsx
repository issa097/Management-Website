import React from 'react';

function Footer() {
    return (
        <footer className="bg-indigo-500 text-white py-4 mt-32">
          <div className="container mx-auto flex justify-center items-center">
            <p className="text-sm mr-4">© {new Date().getFullYear()} Travelers. All Rights Reserved.</p>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white mx-2 hover:text-gray-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white mx-2 hover:text-gray-300">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white mx-2 hover:text-gray-300">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </footer>
      );
    };
    

export default Footer;
