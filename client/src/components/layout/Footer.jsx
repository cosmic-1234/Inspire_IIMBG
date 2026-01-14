import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';

import logo from '../../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-brand-dark text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <img src={logo} alt="Inspire Logo" className="h-12 w-12 rounded-full object-contain bg-white p-1" />
                            <div className="flex flex-col">
                                <span className="font-serif text-2xl font-bold text-white leading-none">Inspire</span>
                                <span className="text-xs font-medium text-brand-muted tracking-widest uppercase">IIM Bodh Gaya</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 mb-6">
                            Empowering the next generation of entrepreneurs with world-class resources and mentorship.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-brand-light transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-brand-light transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-brand-light transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-brand-light transition-colors"><Facebook size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-brand-light">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/programs" className="text-gray-400 hover:text-white transition-colors">Programs</Link></li>
                            <li><Link to="/portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</Link></li>
                            <li><Link to="/mentors" className="text-gray-400 hover:text-white transition-colors">Mentors</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Programs */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-brand-light">Programs</h4>
                        <ul className="space-y-3">
                            <li><Link to="/programs/social" className="text-gray-400 hover:text-white transition-colors">Social Entrepreneurship</Link></li>
                            <li><Link to="/programs/women" className="text-gray-400 hover:text-white transition-colors">Women Startup Program</Link></li>
                            <li><Link to="/programs/pre-incubation" className="text-gray-400 hover:text-white transition-colors">Pre-Incubation</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-brand-light">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 text-brand-light mr-3 mt-1" />
                                <span className="text-gray-400">
                                    IIM Bodh Gaya, Prabandh Vihar,<br />
                                    Bodh Gaya, Bihar 824234
                                </span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 text-brand-light mr-3" />
                                <span className="text-gray-400">inspire@iimbg.ac.in</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 text-brand-light mr-3" />
                                <span className="text-gray-400">+91 123 456 7890</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} IIM Bodh Gaya Inspire. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
