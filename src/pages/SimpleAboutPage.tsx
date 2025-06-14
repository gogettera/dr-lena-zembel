
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Star, Award, Users, Calendar, Shield } from 'lucide-react';

const SimpleAboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dental-beige">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-dental-orange">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-dental-navy rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">DZ</span>
              </div>
              <div>
                <Link to="/" className="text-2xl font-bold text-dental-navy hover:text-dental-orange transition-colors">Dr. Zembel Dental Clinic</Link>
                <p className="text-sm text-gray-600">Professional Dental Care</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-dental-navy hover:text-dental-orange font-medium">Home</Link>
              <Link to="/about" className="text-dental-navy hover:text-dental-orange font-medium border-b-2 border-dental-orange">About</Link>
              <Link to="/contact" className="text-dental-navy hover:text-dental-orange font-medium">Contact</Link>
            </nav>
            
            <a href="tel:03-566-6915" className="bg-dental-orange text-white px-4 py-2 rounded-lg font-semibold hover:bg-dental-orange/90 transition-colors flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </header>

      {/* About Hero */}
      <section className="bg-gradient-to-br from-dental-navy to-dental-ocean text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Dr. Zembel</h1>
          <p className="text-xl opacity-90">
            Dedicated to providing exceptional dental care with over 15 years of experience
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Doctor Profile */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="w-40 h-40 bg-dental-navy rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-6xl font-bold">DZ</span>
              </div>
              <h2 className="text-3xl font-semibold text-dental-navy mb-2">Dr. Zembel</h2>
              <p className="text-xl text-gray-600 mb-4">DDS, Specialist in Family Dentistry</p>
              <div className="flex justify-center space-x-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-dental-orange fill-current" />
                ))}
              </div>
              <div className="space-y-4 text-left">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-dental-orange" />
                  <span className="text-gray-700">Board Certified Dentist</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-dental-orange" />
                  <span className="text-gray-700">5000+ Satisfied Patients</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-dental-orange" />
                  <span className="text-gray-700">15+ Years Experience</span>
                </div>
              </div>
            </div>

            {/* Professional Story */}
            <div>
              <h2 className="text-3xl font-bold text-dental-navy mb-6">Professional Experience</h2>
              <div className="space-y-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Dr. Zembel has been providing exceptional dental care for over 15 years. 
                  With a focus on patient comfort and advanced treatment techniques, our clinic 
                  has become a trusted choice for families seeking quality dental care.
                </p>
                
                <p className="text-gray-700 text-lg leading-relaxed">
                  Our practice combines state-of-the-art technology with a warm, caring approach 
                  to ensure every patient feels comfortable and receives the best possible treatment.
                </p>

                <div className="bg-dental-beige p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-dental-navy mb-4">Our Philosophy</h3>
                  <p className="text-gray-700 italic">
                    "We believe that dental care should be accessible, comfortable, and tailored to each 
                    patient's unique needs. Our goal is not just to treat dental issues, but to educate 
                    and empower our patients to maintain optimal oral health for life."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-3xl font-bold text-dental-navy text-center mb-8">Specializations & Services</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "Children's Dentistry", desc: "Gentle care for young patients" },
                { icon: Star, title: "Preventive Medicine", desc: "Regular checkups and cleanings" },
                { icon: Award, title: "Aesthetic Treatments", desc: "Cosmetic dental procedures" },
                { icon: Users, title: "Root Canal Treatment", desc: "Advanced endodontic care" },
                { icon: Calendar, title: "Orthodontics", desc: "Teeth alignment solutions" },
                { icon: Shield, title: "Oral Rehabilitation", desc: "Comprehensive restoration" }
              ].map((service, index) => (
                <div key={index} className="text-center p-4">
                  <div className="w-16 h-16 bg-dental-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-dental-orange" />
                  </div>
                  <h4 className="text-lg font-semibold text-dental-navy mb-2">{service.title}</h4>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-dental-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Schedule Your Visit?</h3>
          <p className="text-xl mb-8 opacity-90">
            Experience the difference that personalized, professional dental care can make
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:03-566-6915" className="bg-dental-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-dental-orange/90 transition-colors text-lg">
              Call Now: 03-566-6915
            </a>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-dental-navy transition-colors text-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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

export default SimpleAboutPage;
