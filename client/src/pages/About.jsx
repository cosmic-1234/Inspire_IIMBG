import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AboutSection from '../components/layout/About'; // Reusing the About component

const AboutPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-32">
                <div className="bg-brand-dark text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">About Inspire</h1>
                        <p className="text-xl text-gray-300 max-w-2xl">
                            Fostering innovation and entrepreneurship at IIM Bodh Gaya.
                        </p>
                    </div>
                </div>
                <AboutSection />
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;
