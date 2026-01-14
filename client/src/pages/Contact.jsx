import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Mail, Phone, MapPin, Check, AlertCircle } from 'lucide-react';
import api from '../api/axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await api.post('/contact', formData);
            setSuccess(true);
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            console.error(err);
            setError('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-32">
                <div className="bg-brand-dark text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Contact Us</h1>
                        <p className="text-xl text-gray-300 max-w-2xl">
                            Get in touch with us for queries, partnerships, or support.
                        </p>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reach Out</h2>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <MapPin className="h-6 w-6 text-brand-teal mr-4 mt-1" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Address</h3>
                                        <p className="text-gray-600">
                                            IIM Bodh Gaya, Prabandh Vihar,<br />
                                            Bodh Gaya, Bihar 824234
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="h-6 w-6 text-brand-teal mr-4" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Email</h3>
                                        <p className="text-gray-600">inspire@iimbg.ac.in</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-6 w-6 text-brand-teal mr-4" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Phone</h3>
                                        <p className="text-gray-600">+91 123 456 7890</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {success && (
                                    <div className="p-4 bg-green-50 text-green-700 rounded-md flex items-center">
                                        <Check className="w-5 h-5 mr-2" />
                                        Message sent successfully!
                                    </div>
                                )}
                                {error && (
                                    <div className="p-4 bg-red-50 text-red-700 rounded-md flex items-center">
                                        <AlertCircle className="w-5 h-5 mr-2" />
                                        {error}
                                    </div>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-teal focus:border-brand-teal"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-teal focus:border-brand-teal"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        rows="4"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-teal focus:border-brand-teal"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-brand-dark text-white py-3 rounded-md font-bold hover:bg-brand-teal transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
