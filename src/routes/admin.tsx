import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  Users,
  Calendar,
  Search,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import type { UserType, Booking } from "../types";
import { mockUsers, mockBookings } from "../data";
import { BookingRow } from "../components/BookingRow";
import { StatCard } from "../components/statCard";
import { UserRow } from "../components/UserRow";
import nithub from "../assets/nithub-image.png";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

function Admin() {
  const [activeTab, setActiveTab] = useState<"bookings" | "users">("bookings");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [users, setUsers] = useState<UserType[]>(mockUsers);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleDeleteBooking = (id: string) => {
    setBookings(bookings.filter((b) => b.id !== id));
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleUpdateBookingStatus = (id: string, status: string) => {
    setBookings(
      bookings.map((b) =>
        b.id === id
          ? { ...b, status: status as "confirmed" | "pending" | "cancelled" }
          : b
      )
    );
  };

  const getStatusBadge = (status: string) => {
    const config: Record<
      string,
      { bg: string; text: string; icon: React.ReactNode }
    > = {
      confirmed: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: <CheckCircle className="w-4 h-4" />,
      },
      pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: <AlertCircle className="w-4 h-4" />,
      },
      cancelled: {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: <AlertCircle className="w-4 h-4" />,
      },
      active: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: <CheckCircle className="w-4 h-4" />,
      },
      inactive: {
        bg: "bg-gray-100",
        text: "text-gray-800",
        icon: <AlertCircle className="w-4 h-4" />,
      },
    };
    const c = config[status] || config.pending;
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${c.bg} ${c.text}`}
      >
        {c.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen w-full relative">
      <div className="bg-gray-100">
        {/* Nav */}
        <div className=" border-b w-full border-gray-200">
          <div className=" px-4 sm:px-6  lg:px-20 py-3 bg-gray-50">
            <div className="flex w-full items-start bg-gray-50">
              {/* Logo */}
              <img
                src={nithub}
                className="h-18 w-auto object-contain"
                alt="logo"
              />
              <div className="flex flex-col text-center w-full">
                <h1 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 text-sm md:text-lg">
                  Manage bookings and workspace users
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Total Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard
              icon={Calendar}
              label="Total Bookings"
              value={bookings.length.toString()}
              color="blue"
            />
            <StatCard
              icon={CheckCircle}
              label="Confirmed"
              value={bookings
                .filter((b) => b.status === "confirmed")
                .length.toString()}
              color="green"
            />
            <StatCard
              icon={AlertCircle}
              label="Pending"
              value={bookings
                .filter((b) => b.status === "pending")
                .length.toString()}
              color="yellow"
            />
          </div>

          {/* Tabs */}
          <div className="mb-6 flex gap-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-4 py-2 font-medium cursor-pointer border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "bookings"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Calendar className="w-4 h-4" />
              Bookings
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 font-medium cursor-pointer border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "users"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              <Users className="w-4 h-4" />
              Users
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-6 flex-col sm:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or space..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {activeTab === "bookings" && (
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option className="bg-slate-200" value="all">
                  All Status
                </option>
                <option className="bg-slate-200" value="confirmed">
                  Confirmed
                </option>
                <option className="bg-slate-200" value="pending">
                  Pending
                </option>
                <option className="bg-slate-200" value="cancelled">
                  Cancelled
                </option>
              </select>
            )}
          </div>

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-linear-to-r from-slate-100 to-slate-200 border-b-2 w-full border-slate-300">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-800">
                        ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-800">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-800">
                        Payment Plan
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-800">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-800">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-800">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredBookings.map((booking) => (
                      <BookingRow
                        key={booking.id}
                        booking={booking}
                        onDelete={() => handleDeleteBooking(booking.id)}
                        onStatusChange={(status) =>
                          handleUpdateBookingStatus(booking.id, status)
                        }
                        getStatusBadge={getStatusBadge}
                      />
                    ))}
                  </tbody>
                </table>
                {filteredBookings.length === 0 && (
                  <div className="px-6 py-12 text-center">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No bookings found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-linear-to-r from-slate-100 to-slate-200 border-b-2 w-full border-slate-300">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-800">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-800">
                        Email
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-black text-slate-800">
                        Phone
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-black text-slate-800">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <UserRow
                        key={user.id}
                        user={user}
                        onDelete={() => handleDeleteUser(user.id)}
                        getStatusBadge={getStatusBadge}
                      />
                    ))}
                  </tbody>
                </table>
                {filteredUsers.length === 0 && (
                  <div className="px-6 py-12 text-center">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No users found</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
