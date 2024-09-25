import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const TextSearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/text-search/textResult?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
                    <button onClick={() => navigate("/")} className="mr-4 hover:bg-gray-100 rounded-full p-1 transition duration-200">
                        <ArrowLeft className="h-6 w-6 text-gray-600" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-800">Search</h1>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-grow flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
                <div className="w-full max-w-md mb-8">
                    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-gray-400 focus-within:border-transparent transition duration-200">
                        <div className="flex">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleInputChange}
                                placeholder="Medicine name or keyword..."
                                className="flex-grow px-4 py-3 text-gray-800 bg-white focus:outline-none"
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-gray-800 text-white px-6 py-3 hover:bg-gray-700 focus:outline-none focus:bg-gray-900 transition duration-200"
                            >
                                <Search className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Outlet for nested routes */}
                <Outlet />
            </main>
        </div>
    );
};
export default TextSearchPage;