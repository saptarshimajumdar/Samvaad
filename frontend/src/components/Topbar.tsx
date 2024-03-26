import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type OnSearchFunction = (filter: string) => void;

interface TopbarProps {
    onSearch: OnSearchFunction;
}

const Topbar: React.FC<TopbarProps> = ({ onSearch }) => {
    const [filter, setFilter] = useState("");

    const handleSearch = () => {
        // Call the onSearch function passed from the parent component
        onSearch(filter);
    };

    return (
        <div className="bg-gray-800 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
            <div className='flex justify-between'>
                <Link to="/" className="text-white text-3xl font-semibold mr-8">
                    संवाद
                </Link>

                <div className="flex items-center justify-center bg-gray-800">
                    <div className="relative text-gray-600 focus-within:text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button onClick={handleSearch} className="p-1 focus:outline-none focus:shadow-outline">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                        </span>
                        <input
                            type="search"
                            name="q"
                            className="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                            placeholder="Search..."
                            onChange={(e) => {
                                setFilter(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>

            <Link to="/dashboard">
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:shadow-outline">
                    Profile
                </button>
            </Link>
        </div>
    );
};

export default Topbar;
