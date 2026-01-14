import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut, Home, Settings } from 'lucide-react';
import logo from '../../assets/logo.png';

const DashboardLayout = ({ children, role }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        // Clear auth token (cookie is httpOnly, so we might need an API call or just redirect)
        // For now, let's assume we just redirect to login
        navigate('/login');
    };

    const links = role === 'admin' ? [
        { name: 'Overview', path: '/dashboard/admin', icon: LayoutDashboard },
        { name: 'Applications', path: '/dashboard/admin/applications', icon: FileText },
    ] : [
        { name: 'Overview', path: '/dashboard/founder', icon: LayoutDashboard },
        { name: 'My Startup', path: '/dashboard/founder/startup', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-brand-dark text-white flex flex-col">
                <div className="p-6 flex items-center gap-3 border-b border-gray-800">
                    <img src={logo} alt="Logo" className="h-8 w-8 rounded-full bg-white p-0.5" />
                    <span className="font-bold text-lg">Inspire Dashboard</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-brand-teal text-white font-medium'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5 mr-3" />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-800 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                    >
                        <Home className="w-5 h-5 mr-3" />
                        Back to Home
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm p-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {role === 'admin' ? 'Admin Portal' : 'Founder Portal'}
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                            {role === 'admin' ? 'A' : 'F'}
                        </div>
                    </div>
                </header>
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
