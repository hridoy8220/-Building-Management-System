import React from 'react';

const Footer = () => {
    return (
       <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto text-center space-y-2">
        <h3 className="text-lg font-semibold">OneBuilding Management</h3>
        <p>Email: info@onebuilding.com | Phone: +880 123-456-789</p>
        <div className="flex justify-center gap-4 text-xl">
          <a href="https://facebook.com" target="_blank">🌐 Facebook</a>
          <a href="https://twitter.com" target="_blank">🐦 Twitter</a>
          <a href="https://linkedin.com" target="_blank">💼 LinkedIn</a>
        </div>
        <p className="text-sm text-gray-400 mt-2">&copy; {new Date().getFullYear()} OneBuilding. All rights reserved.</p>
      </div>
    </footer>
    );
};

export default Footer;