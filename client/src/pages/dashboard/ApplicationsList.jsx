import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Search, Filter, CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react';
import api from '../../api/axios';

const ApplicationsList = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await api.get('/dashboard/admin');
            setApplications(response.data.applications);
        } catch (error) {
            console.error('Failed to fetch applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await api.put(`/dashboard/admin/applications/${id}`, { status: newStatus });
            fetchApplications();
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const filteredApps = applications.filter(app => {
        const matchesFilter = filter === 'all' || app.status === filter;
        const matchesSearch = app.Startup?.name.toLowerCase().includes(search.toLowerCase()) ||
            app.Startup?.User?.name.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <DashboardLayout role="admin">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
                    <p className="text-gray-500">Manage and review startup applications</p>
                </div>

                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search startups..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-teal focus:border-brand-teal"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-teal focus:border-brand-teal"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="submitted">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                            {filteredApps.map((app) => (
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
                                            {app.submission_data?.pitch_deck_url && (
                                                <a
                                                    href={`${(api.defaults.baseURL || 'http://localhost:5000/api').replace('/api', '')}${app.submission_data.pitch_deck_url}`}
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
                    {filteredApps.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            No applications found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ApplicationsList;
