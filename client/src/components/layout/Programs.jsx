import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Rocket, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

const Programs = () => {
    const programs = [
        {
            title: "Pre-Incubation",
            icon: <Lightbulb className="h-8 w-8 text-brand-teal" />,
            description: "For early-stage ideas. Validate your problem statement and build a prototype.",
            link: "/programs/pre-incubation",
            color: "bg-blue-50 border-blue-100"
        },
        {
            title: "Incubation",
            icon: <Rocket className="h-8 w-8 text-brand-dark" />,
            description: "For MVPs with traction. Get seed funding, office space, and mentorship.",
            link: "/programs/incubation",
            color: "bg-teal-50 border-teal-100"
        },
        {
            title: "Women Startup Program",
            icon: <Users className="h-8 w-8 text-purple-600" />,
            description: "Dedicated support for women entrepreneurs to build scalable ventures.",
            link: "/programs/women",
            color: "bg-purple-50 border-purple-100"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                        Our Programs
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Tailored support for every stage of your entrepreneurial journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {programs.map((program, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-8 rounded-2xl border ${program.color} hover:shadow-lg transition-all duration-300 group`}
                        >
                            <div className="mb-6 p-4 bg-white rounded-xl inline-block shadow-sm group-hover:scale-110 transition-transform duration-300">
                                {program.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{program.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {program.description}
                            </p>
                            <Link
                                to={program.link}
                                className="inline-flex items-center font-semibold text-brand-dark hover:text-brand-teal transition-colors"
                            >
                                Learn More <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Programs;
