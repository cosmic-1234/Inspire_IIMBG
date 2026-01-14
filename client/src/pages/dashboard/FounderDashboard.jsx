import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import api from '../../api/axios';

const FounderDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/dashboard/founder');
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'text-green-600 bg-green-100';
            case 'rejected': return 'text-red-600 bg-red-100';
            default: return 'text-yellow-600 bg-yellow-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return <CheckCircle className="w-6 h-6" />;
            case 'rejected': return <XCircle className="w-6 h-6" />;
            default: return <Clock className="w-6 h-6" />;
        }
    };

    return (
        <DashboardLayout role="founder">
            <div className="max-w-4xl mx-auto">
                {/* Welcome Section */}
                <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Welcome back, {data?.startup?.name || 'Founder'}!
                    </h2>
                    <p className="text-gray-600">
                        Track your application status and manage your startup profile here.
                    </p>
                </div>

                {/* Application Status */}
                <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Application Status</h3>

                    {data?.applications?.length > 0 ? (
                        <div className="space-y-6">
                            {data.applications.map((app) => (
                                <div key={app.id} className="border border-gray-200 rounded-lg p-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Application ID: {app.id}</p>
                                        <p className="font-medium text-gray-900">Incubation Program 2025</p>
                                        <p className="text-sm text-gray-500 mt-1">Submitted on {new Date(app.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className={`flex items-center px-4 py-2 rounded-full ${getStatusColor(app.status)}`}>
                                        <span className="mr-2">{getStatusIcon(app.status)}</span>
                                        <span className="font-bold capitalize">{app.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">You haven't submitted any applications yet.</p>
                        </div>
                    )}
                </div>

                {/* Startup Details Preview */}
                {data?.startup && (
                    <div className="bg-white rounded-xl shadow-sm p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Startup Profile</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Industry</label>
                                <p className="text-gray-900 font-medium">{data.startup.industry}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Stage</label>
                                <p className="text-gray-900 font-medium">{data.startup.stage}</p>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-500">Description</label>
                                <p className="text-gray-900 mt-1">{data.startup.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default FounderDashboard;
