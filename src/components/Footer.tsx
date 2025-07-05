
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-navy text-ivory">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="font-playfair text-2xl md:text-3xl font-bold mb-4">
              Stay in Style
            </h4>
            <p className="font-inter text-gray-300 mb-6">
              Subscribe to our newsletter for exclusive offers, style tips, and first access to new collections.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-ivory placeholder:text-gray-400 font-inter"
              />
              <Button className="bg-gold hover:bg-gold/90 text-white font-inter font-semibold whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-4 font-inter">
              Get 15% off your first order with code ELEGANT15
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <h5 className="font-playfair text-xl font-bold mb-4">TrendVibe Threads</h5>
            <p className="font-inter text-gray-300 text-sm mb-4">
              Premium fashion for every generation. Crafting timeless elegance with attention to detail and sustainable practices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.988-5.367 11.988-11.988C24.005 5.367 18.638.001 12.017.001zM8.449 16.988c-2.137 0-3.864-1.729-3.864-3.866s1.727-3.866 3.864-3.866c2.136 0 3.864 1.729 3.864 3.866s-1.728 3.866-3.864 3.866z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">
                <span className="sr-only">Pinterest</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.372 0 12.017 0 16.4 2.331 20.027 5.686 21.852c-.076-.664-.145-1.685.03-2.409.157-.652 1.005-4.238 1.005-4.238s-.257-.513-.257-1.27c0-1.191.692-2.078 1.553-2.078.732 0 1.085.549 1.085 1.207 0 .735-.468 1.834-.708 2.853-.202.855.428 1.552 1.27 1.552 1.524 0 2.693-1.606 2.693-3.926 0-2.052-1.476-3.486-3.585-3.486-2.442 0-3.878 1.832-3.878 3.72 0 .737.284 1.529.639 1.955a.361.361 0 01.083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.265-.4.159-1.112-.518-1.806-2.142-1.806-3.447 0-2.811 2.043-5.398 5.885-5.398 3.09 0 5.491 2.201 5.491 5.146 0 3.073-1.937 5.547-4.627 5.547-.903 0-1.754-.469-2.044-1.029l-.555 2.12c-.202.783-.747 1.763-1.111 2.36.835.259 1.717.398 2.632.398 6.626 0 12-5.373 12-12.017C24 5.372 18.626.001 12.001.001z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h6 className="font-inter font-semibold mb-4">Shop</h6>
            <ul className="space-y-2 font-inter text-sm">
              <li><a href="#" className="text-gray-300 hover:text-ivory transition-colors">Men's Collection</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ivory transition-colors">Women's Collection</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ivory transition-colors">Children's Collection</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ivory transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ivory transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h6 className="font-inter font-semibold mb-4">Customer Service</h6>
            <ul className="space-y-2 font-inter text-sm">
              <li><a href="#" className="text-gray-300 hover:text-ivory transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ivory transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ivory transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ivory transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ivory transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h6 className="font-inter font-semibold mb-4">Company</h6>
            <ul className="space-y-2 font-inter text-sm">
              <li><a href="#" className="text-gray-300 hover:text-ivory transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ivory transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ivory transition-colors">Sustainability</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ivory transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-300 hover:text-ivory transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-inter text-sm text-gray-400">
              © 2024 TrendVibe Threads. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="font-inter text-sm text-gray-400 hover:text-ivory transition-colors">
                Terms of Service
              </a>
              <a href="#" className="font-inter text-sm text-gray-400 hover:text-ivory transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-inter text-sm text-gray-400 hover:text-ivory transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
