import { Database, Settings, PenTool } from 'lucide-react';

const activities = [
    {
        time: "Jul 8 at 11:24 AM",
        icon: <Database className="w-4 h-4 text-indigo-600" />,
        bg: "bg-indigo-50",
        title: "Dataset",
        detail: "production",
        action: "was created",
    },
    {
        time: "Jul 8 at 11:24 AM",
        icon: <PenTool className="w-4 h-4 text-emerald-600" />,
        bg: "bg-emerald-50",
        title: "Project",
        detail: "GOStore",
        action: "was created",
    },
    {
        time: "Jul 8 at 11:24 AM",
        icon: <Settings className="w-4 h-4 text-orange-600" />,
        bg: "bg-orange-50",
        title: "Plan",
        detail: "Growth Trial",
        action: "initialized",
    },
];

const ActivityCard = () => {
    return (
        <div className="w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-0 relative border-l border-gray-100 ml-3">
                {activities.map((activity, index) => (
                    <div
                        key={index}
                        className="flex gap-4 mb-8 relative pl-6 group"
                    >
                        {/* Timeline Dot */}
                        <div className={`absolute -left-[9px] top-1 p-1 rounded-full border border-white shadow-sm ring-1 ring-gray-100 bg-white`}>
                            <div className={`w-2 h-2 rounded-full ${activity.action.includes("created") ? "bg-emerald-500" : "bg-indigo-500"}`}></div>
                        </div>

                        <div className="flex-1 -mt-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`p-1.5 rounded-md ${activity.bg}`}>{activity.icon}</span>
                                <span className="text-sm font-bold text-gray-900">{activity.title}</span>
                            </div>

                            <p className="text-sm text-gray-600 mb-1">
                                <span className="font-medium text-black">{activity.detail}</span> {activity.action}
                            </p>
                            <div className="text-xs text-gray-400 font-medium">{activity.time}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center pt-2">
                <button className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors">Load more activity</button>
            </div>
        </div>
    );
};

export default ActivityCard;
