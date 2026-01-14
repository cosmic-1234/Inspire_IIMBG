import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { ExternalLink, Tag } from 'lucide-react';
import api from '../api/axios';

const Portfolio = () => {
    const [startups, setStartups] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchStartups = async () => {
            try {
                const response = await api.get('/startups');
                // Map backend data to frontend format
                const formattedStartups = response.data.map(startup => ({
                    id: startup.id,
                    name: startup.name,
                    description: startup.description,
                    sector: startup.industry,
                    logo: startup.logo_url,
                    website: startup.website_url
                }));
                setStartups(formattedStartups);
            } catch (error) {
                console.error('Failed to fetch startups:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStartups();
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
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">
                            Startup Portfolio
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Discover the innovative ventures incubated at IIM Bodh Gaya Inspire.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {startups.map((startup, index) => (
                            <motion.div
                                key={startup.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <img
                                            src={startup.logo}
                                            alt={startup.name}
                                            className="w-16 h-16 rounded-lg shadow-sm"
                                        />
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-light/30 text-brand-dark">
                                            <Tag className="w-3 h-3 mr-1" />
                                            {startup.sector}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-teal transition-colors">
                                        {startup.name}
                                    </h3>
                                    <p className="text-gray-600 mb-6 line-clamp-2">
                                        {startup.description}
                                    </p>
                                    <a
                                        href={startup.website}
                                        className="inline-flex items-center text-sm font-semibold text-brand-dark hover:text-brand-teal transition-colors"
                                    >
                                        Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
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

export default Portfolio;
