import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import api from '../api/axios';

const Impact = () => {
    const [reports, setReports] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await api.get('/resources?type=report');
                setReports(response.data);
            } catch (error) {
                console.error('Failed to fetch reports:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4">Impact Reports</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Measuring our contribution to the economy and society.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-teal"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {reports.map((report) => (
                                <div key={report.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 border border-gray-100 flex flex-col md:flex-row gap-6 items-center">
                                    <div className="w-16 h-16 bg-brand-light/20 rounded-lg flex items-center justify-center text-brand-dark flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex-grow text-center md:text-left">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{report.title}</h3>
                                        <p className="text-gray-600 mb-4">{report.description}</p>
                                        <a href={report.url} className="inline-flex items-center px-4 py-2 bg-brand-dark text-white rounded-md hover:bg-brand-teal transition-colors">
                                            Download Report
                                        </a>
                                    </div>
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

export default Impact;
