/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapPin, AlertCircle, Loader, Clock, Calendar } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic2lkZC1teXNlbGYiLCJhIjoiY2xvOWhvNDg5MGNtbzJpbXdkY2o3bXozdSJ9.qGKwgoOPTTQtv6TigPM4oA';

function Footprints() {
    const { id } = useParams();
    const [footprintData, setFootprintData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getFootprints = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(
                `https://siddharthapro.in/app4/api/v1/user/get-footprint?email=${encodeURIComponent(id)}`
            );
            setFootprintData(response.data);
        } catch (error) {
            console.error('Error fetching footprints:', error);
            setError(error.response?.data?.message || 'Failed to fetch footprint data');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const timer = setInterval(() => window.location.reload(), 10000);
        return () => clearInterval(timer);
    }, []);
    
    useEffect(() => {
        if (id) {
            getFootprints();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center space-y-4">
                    <Loader className="w-8 h-8 animate-spin text-blue-500" />
                    <p className="text-gray-600">Loading footprint data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    if (!footprintData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-yellow-500" />
                    <p className="text-yellow-600">No footprint data found for this user.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-semibold">User Footprints</h1>
                    <p className="text-gray-600 text-sm mt-1">{id}</p>

                    {/* Journey Timing Information */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-600">Journey Started:</span>
                            <span className="font-medium">
                                {new Date(footprintData.createdAt).toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-600">Last Updated:</span>
                            <span className="font-medium">
                                {new Date(footprintData.updatedAt).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

                <FootprintMap data={footprintData} />

                <div className="p-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                            <p className="text-gray-600">Start Point</p>
                            <p className="font-medium">
                                {footprintData.startPoint.latitude}, {footprintData.startPoint.longitude}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">End Point</p>
                            <p className="font-medium">
                                {footprintData.endPoint.latitude}, {footprintData.endPoint.longitude}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-gray-600">Total Waypoints</p>
                            <p className="font-medium">{footprintData.coordinates.length}</p>
                        </div>
                    </div>

                    {/* Coordinate Timeline */}
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-4">Journey Timeline</h2>
                        <div className="max-h-64 overflow-y-auto">
                            <div className="space-y-3">
                                {footprintData.coordinates.map((coord, index) => (
                                    <div
                                        key={coord._id}
                                        className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded"
                                    >
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs text-blue-600">
                                            {index + 1}
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-sm font-medium">
                                                {coord.latitude}, {coord.longitude}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(parseInt(coord.time)).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// FootprintMap component remains the same as in your original code
const FootprintMap = ({ data }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!data) return;

        mapboxgl.accessToken = MAPBOX_TOKEN;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [parseFloat(data.startPoint.longitude), parseFloat(data.startPoint.latitude)],
            zoom: 13
        });

        map.current.on('load', () => {
            setLoading(false);

            new mapboxgl.Marker({
                element: createCustomMarker('bg-green-500', 'Start Point')
            })
                .setLngLat([parseFloat(data.startPoint.longitude), parseFloat(data.startPoint.latitude)])
                .setPopup(new mapboxgl.Popup().setHTML('<div class="font-bold">Start Point</div>'))
                .addTo(map.current);

            new mapboxgl.Marker({
                element: createCustomMarker('bg-red-500', 'End Point')
            })
                .setLngLat([parseFloat(data.endPoint.longitude), parseFloat(data.endPoint.latitude)])
                .setPopup(new mapboxgl.Popup().setHTML('<div class="font-bold">End Point</div>'))
                .addTo(map.current);

            data.coordinates.forEach((coord, index) => {
                new mapboxgl.Marker({
                    element: createCustomMarker('bg-blue-500', `Point ${index + 1}`)
                })
                    .setLngLat([parseFloat(coord.longitude), parseFloat(coord.latitude)])
                    .setPopup(
                        new mapboxgl.Popup().setHTML(`
                            <div class="font-bold">Point ${index + 1}</div>
                            <div class="text-sm">${new Date(parseInt(coord.time)).toLocaleString()}</div>
                        `)
                    )
                    .addTo(map.current);
            });

            const coordinates = [
                [parseFloat(data.startPoint.longitude), parseFloat(data.startPoint.latitude)],
                ...data.coordinates.map(coord => [parseFloat(coord.longitude), parseFloat(coord.latitude)]),
                [parseFloat(data.endPoint.longitude), parseFloat(data.endPoint.latitude)]
            ];

            map.current.addSource('route', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: coordinates
                    }
                }
            });

            map.current.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#888',
                    'line-width': 4
                }
            });

            const bounds = coordinates.reduce((bounds, coord) => {
                return bounds.extend(coord);
            }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

            map.current.fitBounds(bounds, {
                padding: 50
            });
        });

        return () => map.current.remove();
    }, [data]);

    const createCustomMarker = (bgColor, title) => {
        const el = document.createElement('div');
        el.className = `flex items-center justify-center w-8 h-8 ${bgColor} rounded-full border-2 border-white shadow-lg cursor-pointer`;

        const icon = document.createElement('div');
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;
        el.appendChild(icon);

        return el;
    };

    return (
        <div className="relative">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                    <Loader className="w-8 h-8 animate-spin text-blue-500" />
                </div>
            )}
            <div ref={mapContainer} className="w-full h-96" />
            <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md">
                <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                        <span>Start</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                        <span>Waypoints</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                        <span>End</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footprints;