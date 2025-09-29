import React from 'react';

const usageData = [
    { label: 'API CDN Requests', value: '0', limit: '1m' },
    { label: 'API Requests', value: '0', limit: '250k' },
    { label: 'Assets', value: '0 B', limit: '100 GB' },
    { label: 'Bandwidth', value: '0 B', limit: '100 GB' },
    { label: 'Datasets', value: '1', limit: '2' },
    { label: 'Documents', value: '0', limit: '10k' },
    { label: 'User seats', value: '1', limit: '20' },
];

const UsageDashboard = () => {
    return (
        <div className="bg-[#0D0D10] text-white p-6 rounded-lg w-full max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Usage</h2>
                <a href="#" className="text-sm text-blue-400 hover:underline">View more →</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {usageData.map((item, idx) => (
                    <div key={idx} className="border border-gray-700 rounded-lg p-4 bg-[#1A1A1D] flex flex-col justify-between">
                        <div className="text-sm text-gray-400">{item.label}</div>
                        <div className="text-xl font-semibold mt-1">
                            {item.value} <span className="text-gray-500">/ {item.limit}</span>
                        </div>
                        <div className="mt-2">
                            <div className="h-[1px] bg-gray-600 w-full opacity-50"></div>
                            <div className="mt-1 text-xs text-right text-gray-600 italic">📈</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsageDashboard;
