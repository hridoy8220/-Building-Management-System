import React from 'react';
import image from '../assets/Bannerphotos/error-404-concept-landing-page_52683-13616-IhwTiIYU.png'

const Error = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 font-sans">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="relative mb-6">
          
            <img
              src={image}
              alt="404 Robot"
              className="w-full rounded-xl"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h1 className="text-5xl font-bold">404</h1>
              <p className="text-lg">Page not found</p>
            </div>
          </div>
          <h2 className="text-2xl text-pink-600 font-bold mb-2">404 - Page Not Found</h2>
          <p className="text-gray-600 mb-4">Oops! The page you’re looking for doesn’t exist.</p>
          <a
            href="/"
            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
          >
            Go Back Home
          </a>
        </div>
      </div>
    );
};

export default Error;