import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const About = () => {
    const features = [
        "World-class Mentorship Network",
        "Seed Funding & Investor Access",
        "State-of-the-art Infrastructure",
        "Global Alumni Connections"
    ];

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full bg-brand-light/30 text-brand-dark font-semibold text-sm mb-6">
                            About Inspire
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6 leading-tight">
                            Cultivating the Spirit of <span className="text-brand-teal relative">
                                Enterprise
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-light -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
                            Inspire, the Entrepreneurship Cell of IIM Bodh Gaya, is dedicated to creating a vibrant ecosystem for startups. We provide mentorship, funding opportunities, and a network of industry experts to help founders turn their vision into reality.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-brand-teal flex-shrink-0" />
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button className="group inline-flex items-center text-brand-dark font-bold text-lg hover:text-brand-teal transition-colors duration-200">
                            Read Our Full Story
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
                            {/* Placeholder for Campus Image */}
                            <div className="w-full h-full bg-gray-900 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-brand-teal opacity-50"></div>
                                <span className="relative z-10 text-white/50 text-xl font-light tracking-widest uppercase">Campus Visual</span>

                                {/* Hover Reveal Overlay */}
                                <div className="absolute inset-0 bg-brand-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                        <ArrowRight className="text-white h-6 w-6" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-light rounded-full mix-blend-multiply filter blur-xl opacity-70"
                        ></motion.div>
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -top-10 -right-10 w-40 h-40 bg-brand-teal rounded-full mix-blend-multiply filter blur-xl opacity-70"
                        ></motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
