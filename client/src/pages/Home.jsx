import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/layout/Hero';
import Stats from '../components/layout/Stats';
import Programs from '../components/layout/Programs';
import About from '../components/layout/About';
import Footer from '../components/layout/Footer';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Hero />
                <Stats />
                <Programs />
                <About />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
