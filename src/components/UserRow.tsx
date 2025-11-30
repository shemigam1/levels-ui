import { useState } from "react";
import type { UserRowProps } from "../types";
import { Edit, Mail, MoreVertical, Phone, Trash2, User } from "lucide-react";

export const UserRow: React.FC<UserRowProps> = ({
  user,
  onDelete,
  getStatusBadge,
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          {user.name}
        </div>
      </td>
      <td className="px-6 py-4 text-sm">
        <div className="flex items-center gap-2 text-gray-900">
          <Mail className="w-4 h-4 text-gray-400" />
          {user.email}
        </div>
      </td>
      <td className="px-6 py-4 text-sm">
        <div className="flex items-center gap-2 text-gray-900">
          <Phone className="w-4 h-4 text-gray-400" />
          {user.phone}
        </div>
      </td>

      <td className="px-6 py-4 text-sm">{getStatusBadge(user.status)}</td>
      <td className="px-6 py-4 text-sm">
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {showActions && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setShowActions(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};
