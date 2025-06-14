
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, Mail, Send } from 'lucide-react';

const SimpleContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will contact you soon.');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

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
              <Link to="/about" className="text-dental-navy hover:text-dental-orange font-medium">About</Link>
              <Link to="/contact" className="text-dental-navy hover:text-dental-orange font-medium border-b-2 border-dental-orange">Contact</Link>
            </nav>
            
            <a href="tel:03-566-6915" className="bg-dental-orange text-white px-4 py-2 rounded-lg font-semibold hover:bg-dental-orange/90 transition-colors flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </header>

      {/* Contact Hero */}
      <section className="bg-gradient-to-br from-dental-navy to-dental-ocean text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl opacity-90">
            Get in touch to schedule your appointment or ask any questions
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-dental-navy mb-6">Get in Touch</h2>
                <p className="text-lg text-gray-600 mb-8">
                  We're here to help you achieve optimal oral health. Contact us today to schedule 
                  your appointment or learn more about our services.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-dental-orange/10 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-dental-orange" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-dental-navy">Phone</h3>
                      <p className="text-gray-600">03-566-6915</p>
                      <p className="text-sm text-gray-500">Call for appointments and emergencies</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-dental-sky/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-dental-sky" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-dental-navy">Address</h3>
                      <p className="text-gray-600">123 Main Street<br />Tel Aviv, Israel</p>
                      <p className="text-sm text-gray-500">Convenient city center location</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-dental-azure/10 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-dental-azure" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-dental-navy">Hours</h3>
                      <div className="text-gray-600">
                        <p>Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                        <p>Friday: 9:00 AM - 2:00 PM</p>
                        <p>Saturday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-dental-navy text-white p-6 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">Emergency Care</h3>
                <p className="mb-4">
                  For dental emergencies outside regular hours, please call our emergency line.
                </p>
                <a href="tel:03-566-6915" className="bg-dental-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-dental-orange/90 transition-colors inline-flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Emergency Line</span>
                </a>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-dental-navy mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-dental-orange focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-dental-orange focus:border-transparent transition-colors"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-dental-orange focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-dental-orange focus:border-transparent transition-colors resize-vertical"
                    placeholder="Tell us about your needs or questions..."
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-dental-navy text-white py-4 rounded-lg font-semibold hover:bg-dental-navy/90 transition-colors flex items-center justify-center space-x-2 text-lg"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>

              <div className="mt-6 p-4 bg-dental-beige rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  <Mail className="w-4 h-4 inline mr-2" />
                  We typically respond within 24 hours during business days
                </p>
              </div>
            </div>
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

export default SimpleContactPage;
