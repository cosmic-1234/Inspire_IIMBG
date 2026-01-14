import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Calendar, Clock } from 'lucide-react';

const ProgramDetails = () => {
    const { type } = useParams();

    // Program data mapping
    const programData = {
        'pre-incubation': {
            title: "Pre-Incubation Program",
            description: "Transform your idea into a prototype. This 3-month intensive program is designed for early-stage student entrepreneurs.",
            features: [
                "Idea Validation Workshops",
                "Prototype Development Grant",
                "Mentorship from Alumni",
                "Access to Co-working Space"
            ],
            timeline: "3 Months",
            deadline: "Apply by Jan 30, 2025"
        },
        'incubation': {
            title: "Incubation Program",
            description: "Scale your startup with seed funding and strategic support. For startups with a MVP and initial traction.",
            features: [
                "Seed Funding up to ₹25 Lakhs",
                "Dedicated Office Space",
                "Legal & Compliance Support",
                "Investor Connects"
            ],
            timeline: "12-24 Months",
            deadline: "Rolling Applications"
        },
        'women': {
            title: "Women Startup Program",
            description: "Empowering women entrepreneurs to build scalable businesses. A dedicated initiative to bridge the gender gap in entrepreneurship.",
            features: [
                "Specialized Bootcamps",
                "Women Mentor Network",
                "Zero Equity Grant",
                "Family Support Counseling"
            ],
            timeline: "6 Months",
            deadline: "Apply by Feb 15, 2025"
        },
        'social': {
            title: "Social Entrepreneurship",
            description: "For ventures solving critical social problems. We support impact-driven startups in education, healthcare, and agriculture.",
            features: [
                "Impact Assessment Framework",
                "CSR Funding Access",
                "Field Immersion",
                "Government Partnerships"
            ],
            timeline: "12 Months",
            deadline: "Apply by Mar 01, 2025"
        }
    };

    const data = programData[type] || programData['incubation']; // Default to incubation if not found

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <main className="flex-grow pt-32">
                {/* Hero Section */}
                <div className="bg-brand-dark text-white py-20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-block px-4 py-1 bg-brand-teal/30 rounded-full text-sm font-semibold mb-6 border border-brand-teal/50">
                                Open for Applications
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">{data.title}</h1>
                            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                                {data.description}
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Program Highlights</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                {data.features.map((feature, index) => (
                                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                                        <CheckCircle className="h-6 w-6 text-brand-teal mr-3 flex-shrink-0" />
                                        <span className="text-gray-700 font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Eligibility</h2>
                            <ul className="list-disc list-inside space-y-3 text-gray-600 mb-12 text-lg">
                                <li>Must be an Indian citizen.</li>
                                <li>Startup must be registered as a private limited company or LLP.</li>
                                <li>Innovative product or service with scalable business model.</li>
                            </ul>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Key Details</h3>

                                <div className="space-y-6 mb-8">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mr-4">
                                            <Clock className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Duration</p>
                                            <p className="font-semibold text-gray-900">{data.timeline}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mr-4">
                                            <Calendar className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Deadline</p>
                                            <p className="font-semibold text-gray-900">{data.deadline}</p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to="/apply"
                                    className="block w-full py-4 bg-brand-dark text-white text-center font-bold rounded-lg hover:bg-brand-teal transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                                >
                                    Apply Now
                                </Link>
                                <p className="text-xs text-center text-gray-500 mt-4">
                                    Need help? Contact inspire@iimbg.ac.in
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProgramDetails;
