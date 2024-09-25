import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';

const TextResult = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || '';
    const uniqueIdCounter = useRef(0);

    const fetchResults = useCallback(async (pageNum) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://52.64.142.47:8080/api/products', {
                params: {
                    page: pageNum,
                    pageSize: 10,
                    productName: query,
                    manufacturerName: ""
                }
            });
            const newResults = response.data.data.records.map(product => ({
                ...product,
                uniqueKey: `item-${uniqueIdCounter.current++}`
            }));
            setResults(prevResults => [...prevResults, ...newResults]);
            setHasMore(newResults.length === 10);
            setPage(pageNum);
        } catch (error) {
            console.error('Error fetching results:', error);
            setError('Failed to fetch results. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [query]);

    useEffect(() => {
        setResults([]);
        setPage(1);
        uniqueIdCounter.current = 0;
        fetchResults(1);
    }, [query, fetchResults]);

    const loadMore = () => {
        if (!loading && hasMore) {
            fetchResults(page + 1);
        }
    };

    const handleProductClick = (product) => {
        navigate(`/result/${product.productId}`, { state: { product } });
    };

    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <div className="p-4 bg-white shadow-md">
                <h1 className="text-2xl font-bold text-center">Search Results for "{query}"</h1>
            </div>
            <div className="flex-grow overflow-auto p-4">
                <InfiniteScroll
                    dataLength={results.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={<h4 className="text-center mt-4 text-gray-600">Loading...</h4>}
                    endMessage={
                        <p className="text-center mt-4 text-gray-600">
                            {results.length === 0 ? "No results found" : "You have seen it all"}
                        </p>
                    }
                >
                    {results.map((product) => (
                        <div 
                            key={product.uniqueKey}
                            className="bg-white rounded-lg shadow-md mb-4 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                            onClick={() => handleProductClick(product)}
                        >
                            <div className="flex items-center">
                                <img
                                    src={product.imageSrc}
                                    alt={product.productName}
                                    className="w-24 h-24 object-cover"
                                />
                                <div className="flex-grow p-4">
                                    <h2 className="text-sm font-semibold mb-2 line-clamp-2">
                                        {product.productName}
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-2">Price: {product.productPrice}</p>
                                </div>
                                <ChevronRight className="mr-4 text-gray-400" />
                            </div>                
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default TextResult;