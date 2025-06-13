import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-10 pb-6 px-4 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">

        {/* Popular Locations */}
        <div>
          <h3 className="font-bold mb-3">Popular Locations</h3>
          <ul>
            <li>Kolkata</li>
            <li>Mumbai</li>
            <li>Chennai</li>
            <li>Pune</li>
          </ul>
        </div>

        {/* Trending Locations */}
        <div>
          <h3 className="font-bold mb-3">Trending Locations</h3>
          <ul>
            <li>Bhubaneshwar</li>
            <li>Hyderabad</li>
            <li>Chandigarh</li>
            <li>Nashik</li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="font-bold mb-3">About Us</h3>
          <ul>
            <li>Tech@OLX</li>
            <li>Careers</li>
            <li>OLX</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Help / Legal */}
        <div>
          <h3 className="font-bold mb-3">Help & Legal</h3>
          <ul>
            <li>Help</li>
            <li>Sitemap</li>
            <li>Legal & Privacy information</li>
            <li>Vulnerability Disclosure Program</li>
          </ul>
        </div>
      </div>

      {/* Social icons & copyright */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 border-t pt-4 text-sm">
        <p className="mb-3 md:mb-0">&copy; {new Date().getFullYear()} OLX. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF className="text-gray-600 hover:text-blue-600" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter className="text-gray-600 hover:text-blue-400" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="text-gray-600 hover:text-pink-500" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn className="text-gray-600 hover:text-blue-700" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
