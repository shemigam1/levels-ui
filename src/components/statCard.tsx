import type { StatCardProps } from "../types";

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  color,
}) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    purple: "bg-purple-50 text-purple-700",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
      <div
        className={`w-12 h-12 rounded-lg ${colorMap[color]} flex items-center justify-center mb-4`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <p className="text-gray-600 text-sm font-medium">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
};
