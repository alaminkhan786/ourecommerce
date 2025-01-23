import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Us</h2>
          <p className="mt-4 text-lg text-gray-500">Discover our story and mission</p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="relative">
              <img
                className="w-full rounded-lg shadow-lg"
                src="https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Our store"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900">Our Story</h3>
              <p className="mt-4 text-lg text-gray-500">
                Founded in 2024, our e-commerce platform has been dedicated to providing exceptional shopping experiences. 
                We believe in quality products, excellent customer service, and building lasting relationships with our customers.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                Our mission is to make online shopping seamless, enjoyable, and accessible to everyone. We carefully curate our 
                product selection to ensure we offer only the best quality items at competitive prices.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 text-center">Our Values</h3>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900">Quality First</h4>
                <p className="mt-4 text-gray-500">
                  We never compromise on quality. Every product in our store meets our high standards.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900">Customer Focus</h4>
                <p className="mt-4 text-gray-500">
                  Your satisfaction is our priority. We're here to help you every step of the way.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900">Innovation</h4>
                <p className="mt-4 text-gray-500">
                  We continuously improve our platform to enhance your shopping experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
