import React from 'react';
import { motion } from 'framer-motion';

const StatItem = ({ number, label, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        className="relative group p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-dark to-brand-teal rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="text-5xl md:text-6xl font-serif font-bold text-brand-dark mb-3 tracking-tight">
            {number}
        </div>
        <div className="text-sm text-gray-500 font-semibold uppercase tracking-widest">
            {label}
        </div>
    </motion.div>
);

const Stats = () => {
    return (
        <div className="relative py-24 bg-gray-50 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-10 right-10 w-64 h-64 bg-brand-dark rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-teal rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatItem number="50+" label="Startups Incubated" delay={0} />
                    <StatItem number="₹10Cr+" label="Funds Raised" delay={0.1} />
                    <StatItem number="200+" label="Jobs Created" delay={0.2} />
                    <StatItem number="30+" label="Corporate Partners" delay={0.3} />
                </div>
            </div>
        </div>
    );
};

export default Stats;
