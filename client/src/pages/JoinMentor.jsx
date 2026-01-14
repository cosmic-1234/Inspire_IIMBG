import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const JoinMentor = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-serif font-bold text-brand-dark mb-8">Become a Mentor</h1>
                    <p className="text-lg text-gray-600">Join our network of industry experts and guide the next generation of entrepreneurs.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default JoinMentor;
