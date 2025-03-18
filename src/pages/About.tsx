import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About ShopHub</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your premier destination for quality products and exceptional shopping experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, ShopHub has grown from a small local store to a leading
              online marketplace. We're passionate about providing our customers with
              the best products and shopping experience possible.
            </p>
            <p className="text-gray-600">
              Our commitment to quality, customer service, and innovation has made us
              a trusted name in e-commerce. We carefully select each product in our
              catalog to ensure it meets our high standards.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
              alt="Team meeting"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To provide our customers with high-quality products and an exceptional
              shopping experience that exceeds their expectations.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To become the most trusted and preferred online shopping destination
              for customers worldwide.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Our Values</h3>
            <p className="text-gray-600">
              Quality, integrity, customer satisfaction, and continuous innovation
              drive everything we do.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Visit Our Store
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start space-x-3">
              <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">123 Shopping Street, NY 10001</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">info@shophub.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Hours</h3>
                <p className="text-gray-600">Mon-Sat: 9AM - 8PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};