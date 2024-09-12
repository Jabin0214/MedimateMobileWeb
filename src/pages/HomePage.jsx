import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Image, Info } from 'lucide-react';

const HomePage = () => {
    const navigate = useNavigate();

    const handleCameraClick = () => {
        navigate('/camera');
    };

    const handleUploadClick = () => {
        navigate('/upload-search');
    };

    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md flex-grow flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full">
                    <button
                        onClick={handleCameraClick}
                        className="aspect-square bg-white text-gray-800 font-bold text-lg rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-50 flex flex-col items-center justify-center"
                    >
                        <Camera className="w-1/2 h-1/2 mb-2" />
                        <span>Camera Search</span>
                    </button>
                    <button
                        onClick={handleUploadClick}
                        className="aspect-square bg-white text-gray-800 font-bold text-lg rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-50 flex flex-col items-center justify-center">
                        <Image className="w-1/2 h-1/2 mb-2" />
                        <span>Image Search</span>
                    </button>
                </div>
            </div>
            <div className="w-full max-w-md mt-8 bg-blue-100 rounded-lg p-4 flex items-center justify-center shadow-md">
                <Info className="text-blue-500 mr-2" size={20} />
                <p className="text-blue-800 text-sm text-center">
                    Our website is continuously improving. Stay tuned for exciting new features!
                </p>
            </div>
        </div>
    );
};

export default HomePage;