import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Image, Info, Search } from 'lucide-react';
import HomeCard from '../compoents/HomeCard';

const HomePage = () => {
    const navigate = useNavigate();

    const handleCameraClick = () => {
        navigate('/camera');
    };

    const handleUploadClick = () => {
        navigate('/upload-search');
    };

    const handleTextClick = () => {
        navigate('/text-search');
    };


    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md flex-grow flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full">
                    <HomeCard onClick={handleCameraClick} icon={Camera} text="Camera Search" />
                    <HomeCard onClick={handleUploadClick} icon={Image} text="Image upload" />
                    <HomeCard onClick={handleTextClick} icon={Search} text="Text Search" />

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