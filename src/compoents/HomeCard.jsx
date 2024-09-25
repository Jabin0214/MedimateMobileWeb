import React from 'react';

const HomeCard = ({ onClick, icon: Icon, text }) => {
    return (
        <button
            onClick={onClick}
            className="aspect-square bg-white text-gray-800 font-bold text-lg rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-50 flex flex-col items-center justify-center"
        >
            {Icon && <Icon className="w-1/2 h-1/2 mb-4" />}
            <span>{text}</span>
        </button>
    );
};

export default HomeCard;