import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { Check, ChevronRight, Upload, AlertCircle } from 'lucide-react';
import api from '../api/axios';

const Apply = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        founderName: '',
        founderEmail: '',
        founderPhone: '',
        startupName: '',
        industry: '',
        stage: 'Ideation',
        website: '',
        description: '',
        logo: null,
        pitchDeck: null
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    // OTP State
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpError, setOtpError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files[0] }));
    };

    const handleSendOtp = async () => {
        if (!formData.founderEmail) {
            setOtpError('Please enter an email address first.');
            return;
        }
        setOtpLoading(true);
        setOtpError(null);
        try {
            await api.post('/otp/send', { email: formData.founderEmail });
            setOtpSent(true);
            setOtpError(null);
            alert('OTP sent to your email!');
        } catch (err) {
            console.error(err);
            setOtpError(err.response?.data?.error || 'Failed to send OTP');
        } finally {
            setOtpLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            setOtpError('Please enter the OTP.');
            return;
        }
        setOtpLoading(true);
        setOtpError(null);
        try {
            await api.post('/otp/verify', { email: formData.founderEmail, otp });
            setEmailVerified(true);
            setOtpSent(false); // Hide OTP input
            setOtpError(null);
            alert('Email verified successfully!');
        } catch (err) {
            console.error(err);
            setOtpError(err.response?.data?.error || 'Invalid OTP');
        } finally {
            setOtpLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        try {
            await api.post('/apply', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccess(true);
        } catch (err) {
            console.error(err);
            setError('Failed to submit application. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow pt-32 pb-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4">Apply for Incubation</h1>
                        <p className="text-lg text-gray-600">Join the next cohort of visionary founders.</p>
                    </div>

                    {success ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl shadow-xl p-12 text-center"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
                            <p className="text-gray-600 mb-8">
                                Thank you for applying to Inspire IIM Bodh Gaya. Our team will review your application and get back to you shortly.
                            </p>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="px-8 py-3 bg-brand-dark text-white rounded-lg font-bold hover:bg-brand-teal transition-colors"
                            >
                                Return Home
                            </button>
                        </motion.div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            {/* Progress Bar */}
                            <div className="bg-gray-100 h-2 w-full">
                                <div
                                    className="bg-brand-teal h-full transition-all duration-500"
                                    style={{ width: `${(step / 3) * 100}%` }}
                                ></div>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 md:p-12">
                                {error && (
                                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
                                        <AlertCircle className="w-5 h-5 mr-2" />
                                        {error}
                                    </div>
                                )}

                                {/* Step 1: Founder Info */}
                                {step === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Founder Details</h3>
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="founderName"
                                                    value={formData.founderName}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="email"
                                                        name="founderEmail"
                                                        value={formData.founderEmail}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                            setEmailVerified(false); // Reset verification on change
                                                            setOtpSent(false);
                                                        }}
                                                        className={`w-full px-4 py-3 rounded-lg border ${emailVerified ? 'border-green-500 bg-green-50' : 'border-gray-300'} focus:ring-2 focus:ring-brand-teal focus:border-transparent`}
                                                        required
                                                        disabled={emailVerified}
                                                    />
                                                    {!emailVerified && (
                                                        <button
                                                            type="button"
                                                            onClick={handleSendOtp}
                                                            disabled={otpLoading || !formData.founderEmail}
                                                            className="px-4 py-2 bg-brand-teal text-white rounded-lg font-medium hover:bg-teal-600 disabled:opacity-50 whitespace-nowrap"
                                                        >
                                                            {otpLoading ? 'Sending...' : 'Verify'}
                                                        </button>
                                                    )}
                                                    {emailVerified && (
                                                        <span className="flex items-center text-green-600 font-medium px-3">
                                                            <Check className="w-5 h-5 mr-1" /> Verified
                                                        </span>
                                                    )}
                                                </div>
                                                {otpSent && !emailVerified && (
                                                    <div className="mt-3 flex gap-2 animate-fadeIn">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter 6-digit OTP"
                                                            value={otp}
                                                            onChange={(e) => setOtp(e.target.value)}
                                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-teal"
                                                            maxLength={6}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={handleVerifyOtp}
                                                            disabled={otpLoading}
                                                            className="px-4 py-2 bg-brand-dark text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 whitespace-nowrap"
                                                        >
                                                            {otpLoading ? 'Verifying...' : 'Submit OTP'}
                                                        </button>
                                                    </div>
                                                )}
                                                {otpError && (
                                                    <p className="mt-2 text-sm text-red-600">{otpError}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="founderPhone"
                                                    value={formData.founderPhone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-8 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                disabled={!emailVerified}
                                                className="flex items-center px-6 py-3 bg-brand-dark text-white rounded-lg font-bold hover:bg-brand-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                title={!emailVerified ? "Please verify your email first" : ""}
                                            >
                                                Next Step <ChevronRight className="ml-2 w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Startup Info */}
                                {step === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Startup Details</h3>
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Startup Name</label>
                                                <input
                                                    type="text"
                                                    name="startupName"
                                                    value={formData.startupName}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                                                    <select
                                                        name="industry"
                                                        value={formData.industry}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                                                        required
                                                    >
                                                        <option value="">Select Industry</option>
                                                        <option value="AgriTech">AgriTech</option>
                                                        <option value="EdTech">EdTech</option>
                                                        <option value="FinTech">FinTech</option>
                                                        <option value="HealthTech">HealthTech</option>
                                                        <option value="CleanTech">CleanTech</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
                                                    <select
                                                        name="stage"
                                                        value={formData.stage}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                                                    >
                                                        <option value="Ideation">Ideation</option>
                                                        <option value="MVP">MVP</option>
                                                        <option value="Early Revenue">Early Revenue</option>
                                                        <option value="Scaling">Scaling</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Website URL (Optional)</label>
                                                <input
                                                    type="url"
                                                    name="website"
                                                    value={formData.website}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Brief Description</label>
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    rows="4"
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-teal focus:border-transparent"
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="mt-8 flex justify-between">
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className="px-6 py-3 text-gray-600 font-bold hover:text-brand-dark transition-colors"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                className="flex items-center px-6 py-3 bg-brand-dark text-white rounded-lg font-bold hover:bg-brand-teal transition-colors"
                                            >
                                                Next Step <ChevronRight className="ml-2 w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Documents */}
                                {step === 3 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Documents</h3>
                                        <div className="space-y-6">
                                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-brand-teal transition-colors">
                                                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Startup Logo</label>
                                                <input
                                                    type="file"
                                                    name="logo"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    id="logo-upload"
                                                    accept="image/*"
                                                />
                                                <label htmlFor="logo-upload" className="cursor-pointer text-brand-teal font-bold hover:underline">
                                                    {formData.logo ? formData.logo.name : "Click to upload logo"}
                                                </label>
                                            </div>

                                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-brand-teal transition-colors">
                                                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Pitch Deck (PDF)</label>
                                                <input
                                                    type="file"
                                                    name="pitchDeck"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    id="deck-upload"
                                                    accept=".pdf"
                                                />
                                                <label htmlFor="deck-upload" className="cursor-pointer text-brand-teal font-bold hover:underline">
                                                    {formData.pitchDeck ? formData.pitchDeck.name : "Click to upload pitch deck"}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="mt-8 flex justify-between">
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className="px-6 py-3 text-gray-600 font-bold hover:text-brand-dark transition-colors"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="flex items-center px-8 py-3 bg-brand-dark text-white rounded-lg font-bold hover:bg-brand-teal transition-colors disabled:opacity-50"
                                            >
                                                {loading ? 'Submitting...' : 'Submit Application'}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </form>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Apply;
