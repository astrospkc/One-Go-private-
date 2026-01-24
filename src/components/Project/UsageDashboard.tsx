import Link from 'next/link';
import React from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const usageData = [
    { label: 'API CDN Requests', value: '0', limit: '1m', color: 'bg-blue-500' },
    { label: 'API Requests', value: '0', limit: '250k', color: 'bg-indigo-500' },
    { label: 'Assets', value: '0 B', limit: '100 GB', color: 'bg-emerald-500' },
    { label: 'Bandwidth', value: '0 B', limit: '100 GB', color: 'bg-orange-500' },
    { label: 'Datasets', value: '1', limit: '2', color: 'bg-purple-500' },
    { label: 'Documents', value: '0', limit: '10k', color: 'bg-pink-500' },
    { label: 'User seats', value: '1', limit: '20', color: 'bg-gray-800' },
];

const UsageDashboard = () => {
    return (
        <div className="w-full h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Usage Stats</h2>
                <Link href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
                    View full report <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {usageData.map((item, idx) => (
                    <div key={idx} className="group border border-gray-100 rounded-xl p-4 bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                        <div className="flex justify-between items-start mb-2">
                            <div className="text-sm font-medium text-gray-500">{item.label}</div>
                            <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                        </div>

                        <div className="flex items-baseline gap-1 mt-1">
                            <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                            <div className="text-xs text-gray-400 font-medium">/ {item.limit}</div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full ${item.color.replace('bg-', 'bg-')}`} style={{ width: '5%' }}></div>
                            </div>
                            {/* <div className="ml-2 text-xs text-emerald-600 flex items-center gap-0.5">
                                <TrendingUp className="w-3 h-3" />
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsageDashboard;
