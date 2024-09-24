import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Camera, Repeat, X, ChevronLeft, Upload } from 'lucide-react';
import { APP_API_URL } from '/config.js';
import { uploadImages} from '../api/service.jsx';

const CameraPage = () => {
    const [facingMode, setFacingMode] = useState('environment');
    const [capturedImage, setCapturedImage] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);


    const handleCapture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    }, []);

    const handleRetake = () => {
        setCapturedImage(null);
        setUploadStatus(null);
    };

    const flipCamera = () => {
        setFacingMode(prevMode => prevMode === 'user' ? 'environment' : 'user');
    };

    const handleConfirmAndUpload = async () => {
        setUploading(true);
        setUploadStatus(null);

        try {
            console.log('Starting image upload...');
            const response = await uploadImages(capturedImage);
            setUploadStatus('Upload successful');

            // 延迟导航到结果页面
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
        <div className="fixed inset-0 bg-black flex flex-col">
            <div className="flex justify-between items-center p-4 bg-gray-900">
                <button onClick={() => navigate('/')} className="text-white">
                    {isMobile ? <ChevronLeft size={24} /> : <X size={24} />}
                </button>
                <button onClick={flipCamera} className="text-white">
                    <Repeat size={24} />
                </button>
            </div>
            {/* 相机视图区域 */}
            <div className="flex-grow relative h-[60vh]">
                {capturedImage ? (
                    <img src={capturedImage} alt="Captured" className="w-full h-full object-contain" />
                ) : (
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{ facingMode, aspectRatio: isMobile ? 9 / 16 : 16 / 9 }}
                        className="w-full h-full object-cover"
                    />
                )}
            </div>
            <div className="p-4 flex justify-center items-center bg-gray-900">
                {capturedImage ? (
                    <div className="flex space-x-4">
                        <button
                            onClick={handleRetake}
                            className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold"
                            disabled={uploading}
                        >
                            Retake
                        </button>
                        <button
                            onClick={handleConfirmAndUpload}
                            className={`${uploading ? 'bg-gray-500' : 'bg-blue-500'} text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center justify-center`}
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : (
                                <>
                                    <Upload size={20} className="mr-2" />
                                    Upload
                                </>
                            )}
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleCapture}
                        className="bg-white rounded-full p-6 shadow-lg"
                    >
                        <Camera size={40} className="text-black" />
                    </button>
                )}
            </div>
            {uploadStatus && (
                <div className={`p-4 text-center ${uploadStatus.includes('successful') ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                    {uploadStatus}
                </div>
            )}
        </div>
    );
};

export default CameraPage;