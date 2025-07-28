import React from 'react';

const AboutBuilding = () => {
    return (
           <section className="max-w-5xl mx-auto px-6 py-16 bg-white rounded-lg shadow-lg my-12">
      <h2 className="text-4xl font-extrabold text-blue-700 mb-4 text-center tracking-wide">
        About the Building
      </h2>
      <div className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded"></div>
      
      <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto text-center">
        Welcome to OneBuilding — a modern, thoughtfully designed residential complex located in the heart of the city. 
        Our building combines sleek architecture with sustainable materials, offering residents a comfortable, 
        secure, and vibrant living environment.
      </p>
      
      <p className="text-gray-600 text-base leading-relaxed max-w-3xl mx-auto mt-6 text-center">
        Equipped with state-of-the-art amenities including 24/7 security, high-speed internet connectivity, 
        dedicated parking spaces, and beautifully landscaped common areas, OneBuilding is the perfect place to call home. 
        Experience luxury and convenience in one community.
      </p>
    </section>

    );
};

export default AboutBuilding;