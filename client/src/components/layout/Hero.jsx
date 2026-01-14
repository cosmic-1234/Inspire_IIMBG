import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative min-h-[90vh] flex items-center bg-gray-50 pt-32">
            {/* Background Split */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-light/10 hidden lg:block"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light/20 border border-brand-teal/20 mb-8">
                            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
                            <span className="text-brand-dark text-sm font-bold tracking-wide uppercase">Admissions Open for 2025</span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-gray-900 mb-6 leading-[1.1]">
                            Incubating <br />
                            <span className="text-brand-dark">Dreams.</span> <br />
                            Inspiring <span className="text-brand-teal">Action.</span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                            IIM Bodh Gaya's premier launchpad for startups. We provide the capital, mentorship, and network you need to scale globally.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/apply"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-brand-dark rounded-md shadow-lg hover:bg-brand-teal transition-all duration-300 hover:-translate-y-1"
                            >
                                Apply for Incubation
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>

                            <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-brand-dark bg-white border-2 border-gray-200 rounded-md hover:border-brand-dark transition-all duration-300">
                                <Play className="mr-2 h-5 w-5 fill-current" />
                                Watch Video
                            </button>
                        </div>

                        <div className="mt-12 flex items-center gap-8 text-gray-500">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                                        {/* Placeholder for avatars */}
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm font-medium">
                                <span className="text-brand-dark font-bold">500+</span> Founders Joined
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual - Events Gallery Carousel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <Carousel />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const Carousel = () => {
    const [current, setCurrent] = React.useState(0);

    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Startup Summit 2025",
            tag: "UPCOMING EVENT",
            desc: "Join 500+ founders and investors for the biggest entrepreneurial gathering in Bihar."
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Women Entrepreneurship Bootcamp",
            tag: "WORKSHOP",
            desc: "Empowering women leaders with skills, mentorship, and funding opportunities."
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "FinTech Hackathon",
            tag: "HACKATHON",
            desc: "48 hours of coding, innovation, and disruption in the financial sector."
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Investor Demo Day",
            tag: "LIVE PITCH",
            desc: "Selected startups pitch to top VCs and Angel Investors for seed funding."
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            title: "Social Impact Conclave",
            tag: "CONFERENCE",
            desc: "Discussing sustainable solutions for rural development and social change."
        }
    ];

    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    React.useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-gray-900 group">
            {/* Slides */}
            <div className="absolute inset-0">
                {slides.map((slide, index) => (
                    <motion.div
                        key={slide.id}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: index === current ? 1 : 0,
                            scale: index === current ? 1.05 : 1
                        }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent"></div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-8 z-10">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: index === current ? 0 : 20, opacity: index === current ? 1 : 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-teal/90 text-white text-xs font-bold mb-4">
                                    {slide.tag}
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-white mb-2">{slide.title}</h3>
                                <p className="text-gray-300 mb-6 line-clamp-2">
                                    {slide.desc}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-8 right-8 flex gap-2 z-20">
                <button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-dark transition-all"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-brand-dark transition-all"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute top-8 right-8 flex gap-2 z-20">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 rounded-full transition-all duration-300 ${index === current ? 'w-8 bg-brand-teal' : 'w-2 bg-white/30'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
