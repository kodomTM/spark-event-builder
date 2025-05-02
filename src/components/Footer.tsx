
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-8">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-event">BanditBoyzWorld Events</h3>
            <p className="text-gray-400 text-sm">Creating memorable experiences</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} BanditBoyzWorld Events. All rights reserved.
            </p>
            <div className="flex gap-4 mt-2 justify-center md:justify-end">
              <a href="#" className="text-gray-400 hover:text-event">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-event">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
