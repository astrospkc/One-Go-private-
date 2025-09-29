import { Clock, Database, Settings } from 'lucide-react';

const activities = [
    {
        time: "Jul 8 at 11:24 AM",
        icon: <Database className="w-5 h-5 text-white" />,
        title: "Dataset",
        detail: "production",
        action: "was created",
    },
    {
        time: "Jul 8 at 11:24 AM",
        icon: (
            <div className="bg-white w-5 h-5 text-black text-xs font-bold flex items-center justify-center rounded-sm">
                ✍️
            </div>
        ),
        title: "Project",
        detail: "GOStore",
        action: "was created",
    },
    {
        time: "Jul 8 at 11:24 AM",
        icon: <Settings className="w-5 h-5 text-white" />,
        title: "Plan",
        detail: "Growth Trial",
        action: "initialized",
    },
];

const ActivityCard = () => {
    return (
        <div className="bg-[#0D0D10] text-white p-6 rounded-md w-full max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Activity</h2>
            <div className="space-y-6">
                {activities.map((activity, index) => (
                    <div
                        key={index}
                        className="flex items-start space-x-4 border-b border-gray-800 pb-4"
                    >
                        <div className="relative">
                            <div className="bg-gray-800 p-2 rounded-full">
                                {activity.icon}
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full flex items-center justify-center text-xs text-black">
                                +
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center justify-between text-gray-400 text-sm">
                                <span>{activity.time}</span>
                                <span className="cursor-pointer">↗</span>
                            </div>
                            <p className="text-sm mt-1">
                                <span className="font-semibold">{activity.title}</span>{' '}
                                <span className="font-bold">{activity.detail}</span> {activity.action}
                            </p>
                        </div>
                    </div>
                ))}
                <div className="text-center py-3 text-gray-500">...</div>
            </div>
        </div>
    );
};

export default ActivityCard;
