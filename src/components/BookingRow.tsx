import { useState } from "react";
import type { BookingRowProps } from "../types";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  MoreVertical,
  Trash2,
} from "lucide-react";

export const BookingRow: React.FC<BookingRowProps> = ({
  booking,
  onStatusChange,
  getStatusBadge,
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 text-sm font-mono font-medium text-blue-600">
        {booking.id}
      </td>
      <td className="px-6 py-4 text-sm">
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{booking.userName}</span>
          <span className="text-gray-600 text-xs">{booking.userEmail}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm">
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{booking.spaceName}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm">
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">
            {booking.bookingDate}
          </span>
          <span className="text-gray-600 text-xs flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {booking.startTime} - {booking.endTime}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        {booking.duration}h
      </td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-1">
        <DollarSign className="w-4 h-4" />
        {booking.price}
      </td>
      <td className="px-6 py-4 text-sm">{getStatusBadge(booking.status)}</td>
      <td className="px-6 py-4 text-sm">
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  onStatusChange("confirmed");
                  setShowActions(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
              >
                <CheckCircle className="w-4 h-4" />
                Confirm
              </button>
              <button
                onClick={() => {
                  onStatusChange("pending");
                  setShowActions(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                Mark Pending
              </button>
              <button
                onClick={() => {
                  onStatusChange("cancelled");
                  setShowActions(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                Cancel Booking
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};
