
import React from 'react';
import { Link } from 'react-router-dom';

const SimpleAboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dental-beige">
      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-dental-navy">Dr. Zembel Dental Clinic</Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-dental-navy hover:text-dental-orange">Home</Link>
              <Link to="/about" className="text-dental-navy hover:text-dental-orange font-semibold">About</Link>
              <Link to="/contact" className="text-dental-navy hover:text-dental-orange">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-dental-navy mb-8 text-center">About Dr. Zembel</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold text-dental-navy mb-4">Professional Experience</h2>
              <p className="text-gray-600 mb-4">
                Dr. Zembel has been providing exceptional dental care for over 15 years. 
                With a focus on patient comfort and advanced treatment techniques, our clinic 
                has become a trusted choice for families seeking quality dental care.
              </p>
              <h3 className="text-xl font-semibold text-dental-navy mb-2">Specializations:</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• Children's Dentistry</li>
                <li>• Preventive Medicine</li>
                <li>• Aesthetic Treatments</li>
                <li>• Root Canal Treatment</li>
                <li>• Orthodontics</li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="w-32 h-32 bg-dental-navy rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">DZ</span>
              </div>
              <h3 className="text-xl font-semibold text-dental-navy">Dr. Zembel</h3>
              <p className="text-gray-600">DDS, Specialist in Family Dentistry</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SimpleAboutPage;
