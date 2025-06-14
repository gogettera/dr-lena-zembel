
import React from 'react';
import { Link } from 'react-router-dom';

const SimpleContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dental-beige">
      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-dental-navy">Dr. Zembel Dental Clinic</Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-dental-navy hover:text-dental-orange">Home</Link>
              <Link to="/about" className="text-dental-navy hover:text-dental-orange">About</Link>
              <Link to="/contact" className="text-dental-navy hover:text-dental-orange font-semibold">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-dental-navy mb-8 text-center">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-dental-navy mb-6">Get in Touch</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-dental-navy">Phone</h3>
                <p className="text-gray-600">03-566-6915</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-dental-navy">Address</h3>
                <p className="text-gray-600">123 Main Street<br />Tel Aviv, Israel</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-dental-navy">Hours</h3>
                <p className="text-gray-600">
                  Sunday - Thursday: 9:00 AM - 6:00 PM<br />
                  Friday: 9:00 AM - 2:00 PM<br />
                  Saturday: Closed
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <button className="w-full bg-dental-orange text-white py-3 rounded-lg font-semibold hover:bg-dental-orange/90 transition-colors">
                Call Now
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-dental-navy mb-6">Send Message</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-dental-orange"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  type="tel" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-dental-orange"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-dental-orange"
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-dental-navy text-white py-3 rounded-lg font-semibold hover:bg-dental-navy/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SimpleContactPage;
