import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Upload, X, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import { APP_API_URL } from '/config.js';

const UploadSearchPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);
    const navigate = useNavigate();

    const handleImageSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setSelectedImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setSelectedImage(e.target.result);
            reader.readAsDataURL(file);
        }
    }, []);

    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);

        try {
            const response = await axios.post(`${APP_API_URL}/message/image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error("No products detected, please try another image");
            } else if (error.request) {
                throw new Error('No response from server, please try again later');
            } else {
                throw new Error(`Request setup error: ${error.message}`);
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedImage) return;

        setUploading(true);
        setUploadStatus(null);

        try {
            console.log('Starting image upload...');
            const imageFile = await fetch(selectedImage).then(r => r.blob());
            const response = await uploadImage(imageFile);
            setUploadStatus('Upload successful');

            setTimeout(() => {
                navigate('/result', {
                    state: { productData: response.data.records },
                    replace: true
                });
            }, 1000);
        } catch (error) {
            console.error('Error during upload:', error);
            setUploadStatus(`Upload failed: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-100 flex flex-col">
            <div className="flex justify-between items-center p-4 bg-white shadow">
                <button onClick={() => navigate('/')} className="text-gray-600">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-xl font-semibold">Upload Image</h1>
                <div className="w-6"></div>
            </div>
            <div className="flex-grow p-4 flex flex-col items-center justify-center"
                 onDrop={handleDrop}
                 onDragOver={(e) => e.preventDefault()}>
                {selectedImage ? (
                    <div className="relative w-full max-w-md aspect-square mb-4">
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 bg-white rounded-full p-1"
                        >
                            <X size={20} className="text-gray-600" />
                        </button>
                    </div>
                ) : (
                    <label className="w-full max-w-md aspect-square mb-4 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-white cursor-pointer">
                        <ImageIcon size={48} className="text-gray-400 mb-2" />
                        <p className="text-gray-500 text-center">Drag and drop an image here or click to select</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageSelect}
                            className="hidden"
                        />
                    </label>
                )}
                <button
                    onClick={handleUpload}
                    disabled={!selectedImage || uploading}
                    className={`${
                        selectedImage && !uploading ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300'
                    } text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center justify-center transition-colors duration-300`}
                >
                    {uploading ? 'Uploading...' : (
                        <>
                            <Upload size={20} className="mr-2" />
                            Upload and Search
                        </>
                    )}
                </button>
            </div>
            {uploadStatus && (
                <div className={`p-4 text-center ${uploadStatus.includes('successful') ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {uploadStatus}
                </div>
            )}
        </div>
    );
};

export default UploadSearchPage;