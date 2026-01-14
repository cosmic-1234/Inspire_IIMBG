import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import api from '../api/axios';

const Blog = () => {
    const [blogs, setBlogs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await api.get('/resources?type=blog');
                setBlogs(response.data);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4">Insights & Blog</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Latest updates, trends, and insights from the startup ecosystem.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-teal"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <div key={blog.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
                                    <div className="text-xs font-bold text-brand-teal uppercase tracking-wide mb-2">Article</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{blog.title}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{blog.description}</p>
                                    <a href={blog.url} className="text-brand-dark font-medium hover:text-brand-teal transition-colors">
                                        Read More &rarr;
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Blog;
