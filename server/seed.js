const { sequelize, Startup, Mentor, Resource } = require('./models');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });

        // Seed Startups
        const startups = [
            {
                name: "EcoVibe",
                description: "Sustainable packaging solutions for e-commerce businesses.",
                logo_url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60",
                industry: "Sustainability",
                stage: "Growth",
                website_url: "https://ecovibe.com",
                featured: true
            },
            {
                name: "AgriTech Solutions",
                description: "IoT-based soil monitoring for precision agriculture.",
                logo_url: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=800&auto=format&fit=crop&q=60",
                industry: "Agriculture",
                stage: "Seed",
                website_url: "https://agritech.com",
                featured: true
            },
            {
                name: "EduLearn",
                description: "AI-powered personalized learning platform for K-12 students.",
                logo_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=60",
                industry: "EdTech",
                stage: "Idea",
                website_url: "https://edulearn.com",
                featured: false
            },
            {
                name: "HealthConnect",
                description: "Telemedicine platform connecting rural patients with specialists.",
                logo_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60",
                industry: "HealthTech",
                stage: "Growth",
                website_url: "https://healthconnect.com",
                featured: true
            }
        ];

        for (const startup of startups) {
            await Startup.create(startup);
        }
        console.log('Startups seeded');

        // Seed Mentors
        const mentors = [
            {
                name: "Dr. Rajesh Kumar",
                expertise: "Strategy & Operations",
                bio: "Ex-McKinsey consultant with 15 years of experience in scaling startups.",
                image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60",
                linkedin_url: "https://linkedin.com"
            },
            {
                name: "Priya Sharma",
                expertise: "Marketing & Branding",
                bio: "CMO at TechGiant, helped 3 startups reach unicorn status.",
                image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=60",
                linkedin_url: "https://linkedin.com"
            },
            {
                name: "Amit Singh",
                expertise: "Finance & Fundraising",
                bio: "Angel investor and VC partner, specializing in early-stage funding.",
                image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=60",
                linkedin_url: "https://linkedin.com"
            }
        ];

        for (const mentor of mentors) {
            await Mentor.create(mentor);
        }
        console.log('Mentors seeded');

        // Seed Resources
        const resources = [
            {
                title: "How to Build a Pitch Deck",
                description: "A comprehensive guide to creating a winning pitch deck for investors.",
                type: "blog",
                url: "#"
            },
            {
                title: "Impact Report 2024",
                description: "Annual report highlighting the social and economic impact of our startups.",
                type: "report",
                url: "#"
            },
            {
                title: "Marketing 101 for Startups",
                description: "Essential marketing strategies for early-stage ventures.",
                type: "blog",
                url: "#"
            }
        ];

        for (const resource of resources) {
            await Resource.create(resource);
        }
        console.log('Resources seeded');

        console.log('Database seeding completed successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Failed to seed database:', err);
        if (err.errors) {
            err.errors.forEach(e => console.error(e.message));
        }
        process.exit(1);
    }
};

seedDatabase();
