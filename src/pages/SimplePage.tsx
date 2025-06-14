
import React from 'react';
import { Link } from 'react-router-dom';

const SimplePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dental-beige">
      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-dental-navy">Dr. Zembel Dental Clinic</h1>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-dental-navy hover:text-dental-orange">Home</Link>
              <Link to="/about" className="text-dental-navy hover:text-dental-orange">About</Link>
              <Link to="/contact" className="text-dental-navy hover:text-dental-orange">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-dental-navy mb-6">
            Welcome to Dr. Zembel Dental Clinic
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Professional dental care with a personal touch. We provide comprehensive dental services 
            for the whole family in a comfortable and modern environment.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-dental-navy mb-4">Children's Dentistry</h3>
              <p className="text-gray-600">Gentle and caring dental treatment for children of all ages.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-dental-navy mb-4">Preventive Care</h3>
              <p className="text-gray-600">Regular checkups and cleanings to maintain optimal oral health.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-dental-navy mb-4">Aesthetic Treatments</h3>
              <p className="text-gray-600">Cosmetic procedures to enhance your smile and confidence.</p>
            </div>
          </div>

          <div className="mt-12">
            <button className="bg-dental-orange text-white px-8 py-3 rounded-lg font-semibold hover:bg-dental-orange/90 transition-colors">
              Book Appointment
            </button>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-dental-navy text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Dr. Zembel Dental Clinic</h3>
            <p className="text-gray-300 mb-4">Professional dental care in the heart of the city</p>
            <p className="text-gray-300">Phone: 03-566-6915</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SimplePage;
