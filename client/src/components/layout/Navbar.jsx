import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import logo from '../../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        {
            title: 'Programs',
            links: [
                { name: 'Social Entrepreneurship', path: '/programs/social' },
                { name: 'Women Startup Program', path: '/programs/women' },
                { name: 'Pre-Incubation', path: '/programs/pre-incubation' },
            ]
        },
        {
            title: 'Portfolio',
            links: [
                { name: 'Startup Grid', path: '/portfolio' },
                { name: 'Success Stories', path: '/portfolio/success-stories' },
            ]
        },
        {
            title: 'Mentors',
            links: [
                { name: 'Find a Mentor', path: '/mentors' },
                { name: 'Become a Mentor', path: '/mentors/join' },
            ]
        },
        {
            title: 'Resources',
            links: [
                { name: 'Blog', path: '/resources/blog' },
                { name: 'Impact Reports', path: '/resources/impact' },
            ]
        }
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4 shadow-sm'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                            <img src={logo} alt="Inspire Logo" className="h-12 w-auto" />
                            <div className="flex flex-col">
                                <span className="font-serif text-2xl font-bold text-brand-dark leading-none">Inspire</span>
                                <span className="text-xs font-medium text-brand-teal tracking-widest uppercase">IIM Bodh Gaya</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <div
                                key={item.title}
                                className="relative"
                                onMouseEnter={() => setActiveDropdown(item.title)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <button className="flex items-center font-medium text-gray-700 hover:text-brand-dark transition-colors duration-200">
                                    {item.title}
                                    <ChevronDown className="ml-1 h-4 w-4 text-brand-teal" />
                                </button>

                                <AnimatePresence>
                                    {activeDropdown === item.title && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 py-2 overflow-hidden border-t-4 border-brand-teal"
                                        >
                                            {item.links.map((link) => (
                                                <Link
                                                    key={link.name}
                                                    to={link.path}
                                                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-dark transition-colors border-b border-gray-50 last:border-0"
                                                >
                                                    {link.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                        <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                            <Link
                                to="/login"
                                className="font-medium text-gray-700 hover:text-brand-dark transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/apply"
                                className="px-6 py-2.5 rounded-md font-medium transition-all duration-300 shadow-md hover:shadow-lg bg-brand-dark text-white hover:bg-brand-teal"
                            >
                                Apply Now
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-brand-dark focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100 shadow-xl"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-2">
                            {menuItems.map((item) => (
                                <div key={item.title} className="space-y-1">
                                    <div className="px-3 py-2 text-sm font-bold text-brand-teal uppercase tracking-wider">{item.title}</div>
                                    {item.links.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            className="block pl-6 pr-3 py-2 text-base font-medium text-gray-600 hover:text-brand-dark hover:bg-gray-50 rounded-md"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            ))}
                            <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col gap-3">
                                <Link to="/login" className="block text-center px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-dark">Login</Link>
                                <Link to="/apply" className="block text-center px-3 py-3 text-base font-medium bg-brand-dark text-white rounded-md hover:bg-brand-teal">Apply Now</Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
