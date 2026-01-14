import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Users, FileText, CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react';
import api from '../../api/axios';

const AdminDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('/dashboard/admin');
            setData(response.data);
        } catch (error) {
            console.error('Failed to fetch admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await api.put(`/dashboard/admin/applications/${id}`, { status: newStatus });
            fetchData(); // Refresh data
        } catch (error) {
            console.error('Failed to update status:', error);
            alert('Failed to update status');
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <DashboardLayout role="admin">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Total Applications</p>
                            <h3 className="text-2xl font-bold text-gray-900">{data?.stats?.total || 0}</h3>
                        </div>
                        <FileText className="text-blue-500 w-8 h-8" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Pending</p>
                            <h3 className="text-2xl font-bold text-gray-900">{data?.stats?.pending || 0}</h3>
                        </div>
                        <Clock className="text-yellow-500 w-8 h-8" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Accepted</p>
                            <h3 className="text-2xl font-bold text-gray-900">{data?.stats?.accepted || 0}</h3>
                        </div>
                        <CheckCircle className="text-green-500 w-8 h-8" />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Rejected</p>
                            <h3 className="text-2xl font-bold text-gray-900">{data?.stats?.rejected || 0}</h3>
                        </div>
                        <XCircle className="text-red-500 w-8 h-8" />
                    </div>
                </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900">Recent Applications</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
                            <tr>
                                <th className="px-6 py-3">Startup</th>
                                <th className="px-6 py-3">Founder</th>
                                <th className="px-6 py-3">Stage</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data?.applications?.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{app.Startup?.name}</div>
                                        <div className="text-xs text-gray-500">{app.Startup?.industry}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">{app.Startup?.User?.name}</div>
                                        <div className="text-xs text-gray-500">{app.Startup?.User?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{app.Startup?.stage}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full uppercase ${app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            {app.status === 'submitted' && (
                                                <>
                                                    <button
                                                        onClick={() => updateStatus(app.id, 'accepted')}
                                                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                                                        title="Approve"
                                                    >
                                                        <CheckCircle className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(app.id, 'rejected')}
                                                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                        title="Reject"
                                                    >
                                                        <XCircle className="w-5 h-5" />
                                                    </button>
                                                </>
                                            )}
                                            {app.submission_data?.pitch_deck_url && (
                                                <a
                                                    href={`http://localhost:5000${app.submission_data.pitch_deck_url}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                                    title="View Pitch Deck"
                                                >
                                                    <ExternalLink className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
