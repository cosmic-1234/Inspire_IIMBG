import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import api from '../api/axios';

const Mentors = () => {
    const [mentors, setMentors] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await api.get('/mentors');
                const formattedMentors = response.data.map(mentor => ({
                    id: mentor.id,
                    name: mentor.name,
                    role: "Mentor", // Default role as it's not in DB yet
                    expertise: mentor.expertise,
                    image: mentor.image_url,
                    linkedin: mentor.linkedin_url
                }));
                setMentors(formattedMentors);
            } catch (error) {
                console.error('Failed to fetch mentors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-teal"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">
                            Our Mentors
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Guided by industry leaders and academic experts.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {mentors.map((mentor, index) => (
                            <motion.div
                                key={mentor.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-center group"
                            >
                                <div className="relative h-48 bg-brand-light/20 overflow-hidden">
                                    <img
                                        src={mentor.image}
                                        alt={mentor.name}
                                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{mentor.name}</h3>
                                    <p className="text-brand-teal font-medium text-sm mb-3">{mentor.role}</p>
                                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 mb-4">
                                        {mentor.expertise}
                                    </div>
                                    <div className="flex justify-center space-x-3">
                                        <button className="text-gray-400 hover:text-brand-dark transition-colors">
                                            <Linkedin className="h-5 w-5" />
                                        </button>
                                        <button className="text-gray-400 hover:text-brand-dark transition-colors">
                                            <Mail className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Mentors;
