import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { contactUsContent } from '../../data/mockData';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Furniture By Panchal</h3>
            <p className="mb-4 text-sm leading-relaxed">
              Premium furniture for your home and office. Quality craftsmanship since 2005.
            </p>
            <div className="flex space-x-4">
              <a 
                href={contactUsContent.socialMedia.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={contactUsContent.socialMedia.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href={contactUsContent.socialMedia.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-primary transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-primary transition-colors">My Account</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              </li>
               <li>
                <Link to="/t&c" className="hover:text-primary transition-colors">Term & Conditions</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/living-room" className="hover:text-primary transition-colors">Living Room</Link>
              </li>
              <li>
                <Link to="/category/bedroom" className="hover:text-primary transition-colors">Bedroom</Link>
              </li>
              <li>
                <Link to="/category/dining-room" className="hover:text-primary transition-colors">Dining Room</Link>
              </li>
              <li>
                <Link to="/category/office" className="hover:text-primary transition-colors">Office</Link>
              </li>
              <li>
                <Link to="/category/outdoor" className="hover:text-primary transition-colors">Outdoor</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                <span>{contactUsContent.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <span>{contactUsContent.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                <span>{contactUsContent.email}</span>
              </li>
              <li>
                <p className="text-sm mt-2">{contactUsContent.hours}</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Furniture By Panchal. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/shipping-policy" className="hover:text-primary transition-colors">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;