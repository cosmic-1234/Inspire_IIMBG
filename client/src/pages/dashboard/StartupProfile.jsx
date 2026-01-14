import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Save, Loader } from 'lucide-react';
import api from '../../api/axios';

const StartupProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        industry: '',
        stage: '',
        website_url: '',
        logo_url: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await api.get('/dashboard/founder');
            if (response.data.startup) {
                setFormData({
                    name: response.data.startup.name || '',
                    description: response.data.startup.description || '',
                    industry: response.data.startup.industry || '',
                    stage: response.data.startup.stage || '',
                    website_url: response.data.startup.website_url || '',
                    logo_url: response.data.startup.logo_url || ''
                });
            }
        } catch (error) {
            console.error('Failed to fetch startup data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            await api.put('/dashboard/founder/startup', formData);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            console.error('Update failed:', error);
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <DashboardLayout role="founder">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Startup Profile</h2>

                    {message && (
                        <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Startup Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-teal focus:border-brand-teal"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-teal focus:border-brand-teal"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                                <select
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-teal focus:border-brand-teal"
                                >
                                    <option value="">Select Industry</option>
                                    <option value="FinTech">FinTech</option>
                                    <option value="HealthTech">HealthTech</option>
                                    <option value="EdTech">EdTech</option>
                                    <option value="AgriTech">AgriTech</option>
                                    <option value="CleanTech">CleanTech</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                                <select
                                    name="stage"
                                    value={formData.stage}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-teal focus:border-brand-teal"
                                >
                                    <option value="">Select Stage</option>
                                    <option value="Idea">Idea</option>
                                    <option value="MVP">MVP</option>
                                    <option value="Early Traction">Early Traction</option>
                                    <option value="Growth">Growth</option>
                                    <option value="Scale">Scale</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                            <input
                                type="url"
                                name="website_url"
                                value={formData.website_url}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-brand-teal focus:border-brand-teal"
                                placeholder="https://example.com"
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center px-6 py-2 bg-brand-dark text-white rounded-lg hover:bg-brand-teal transition-colors disabled:opacity-50"
                            >
                                {saving ? <Loader className="w-5 h-5 animate-spin mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StartupProfile;
