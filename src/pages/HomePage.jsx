import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Image } from 'lucide-react';

const HomePage = () => {
    const navigate = useNavigate();

    const handleCameraClick = () => {
        navigate('/camera');
    };

    const handleUploadClick = () => {
        navigate('/upload-search');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md">
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={handleCameraClick}
                        className="aspect-square bg-white text-gray-800 font-bold text-lg rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-50 flex flex-col items-center justify-center"
                    >
                        <Camera className="w-1/2 h-1/2 mb-2" />
                        <span>Open Camera</span>
                    </button>
                    <button
                        onClick={handleUploadClick}
                        className="aspect-square bg-white text-gray-800 font-bold text-lg rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-50 flex flex-col items-center justify-center">
                        <Image className="w-1/2 h-1/2 mb-2" />
                        <span>Record</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;