
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Star, Users, Shield, Heart } from 'lucide-react';

const SimplePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dental-beige">
      {/* Professional Header */}
      <header className="bg-white shadow-lg border-b-2 border-dental-orange">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-dental-navy rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">DZ</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-dental-navy">Dr. Zembel Dental Clinic</h1>
                <p className="text-sm text-gray-600">Professional Dental Care</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-dental-navy hover:text-dental-orange font-medium border-b-2 border-dental-orange">Home</Link>
              <Link to="/about" className="text-dental-navy hover:text-dental-orange font-medium">About</Link>
              <Link to="/contact" className="text-dental-navy hover:text-dental-orange font-medium">Contact</Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <a href="tel:03-566-6915" className="bg-dental-orange text-white px-4 py-2 rounded-lg font-semibold hover:bg-dental-orange/90 transition-colors flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dental-navy to-dental-ocean text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Welcome to Dr. Zembel Dental Clinic
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Professional dental care with a personal touch. We provide comprehensive dental services 
            for the whole family in a comfortable and modern environment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-dental-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-dental-orange/90 transition-colors text-lg">
              Book Your Appointment
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-dental-navy transition-colors text-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-dental-navy mb-4">Our Services</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive dental care tailored to your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-dental-orange/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-dental-orange" />
              </div>
              <h4 className="text-2xl font-semibold text-dental-navy mb-4">Children's Dentistry</h4>
              <p className="text-gray-600 mb-6">Gentle and caring dental treatment for children of all ages in a friendly environment.</p>
              <button className="text-dental-orange font-semibold hover:text-dental-navy transition-colors">Learn More →</button>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-dental-sky/10 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-dental-sky" />
              </div>
              <h4 className="text-2xl font-semibold text-dental-navy mb-4">Preventive Care</h4>
              <p className="text-gray-600 mb-6">Regular checkups and cleanings to maintain optimal oral health and prevent issues.</p>
              <button className="text-dental-orange font-semibold hover:text-dental-navy transition-colors">Learn More →</button>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-dental-azure/10 rounded-full flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-dental-azure" />
              </div>
              <h4 className="text-2xl font-semibold text-dental-navy mb-4">Aesthetic Treatments</h4>
              <p className="text-gray-600 mb-6">Cosmetic procedures to enhance your smile and boost your confidence.</p>
              <button className="text-dental-orange font-semibold hover:text-dental-navy transition-colors">Learn More →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-dental-navy mb-6">Why Choose Dr. Zembel?</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-dental-orange rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-dental-navy mb-2">15+ Years Experience</h4>
                    <p className="text-gray-600">Extensive experience in all aspects of dental care with thousands of satisfied patients.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-dental-sky rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-dental-navy mb-2">Modern Technology</h4>
                    <p className="text-gray-600">State-of-the-art equipment and latest techniques for optimal treatment results.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-dental-azure rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-dental-navy mb-2">Patient-Centered Care</h4>
                    <p className="text-gray-600">Personalized treatment plans focused on your comfort and individual needs.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-dental-beige p-8 rounded-xl">
              <div className="text-center">
                <div className="w-32 h-32 bg-dental-navy rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">DZ</span>
                </div>
                <h4 className="text-2xl font-semibold text-dental-navy mb-2">Dr. Zembel</h4>
                <p className="text-gray-600 mb-4">DDS, Specialist in Family Dentistry</p>
                <div className="flex justify-center space-x-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-dental-orange fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic">
                  "Dedicated to providing exceptional dental care with compassion and expertise."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="bg-dental-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-dental-orange rounded-full flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Call Us</h4>
              <p className="text-gray-300">03-566-6915</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-dental-orange rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Visit Us</h4>
              <p className="text-gray-300">123 Main Street<br />Tel Aviv, Israel</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-dental-orange rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Hours</h4>
              <p className="text-gray-300">Sun-Thu: 9AM-6PM<br />Fri: 9AM-2PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-dental-textDark text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Dr. Zembel Dental Clinic</h3>
              <p className="text-gray-400">Professional dental care in the heart of the city</p>
            </div>
            
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Dr. Zembel Dental Clinic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SimplePage;
