import type { UserType, Booking } from "./types";

export const mockUsers: UserType[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234-567-8900",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234-567-8901",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1 234-567-8902",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+1 234-567-8903",
  },
];

export const mockBookings: Booking[] = [
  {
    id: "001",
    userId: "1",
    userName: "John Doe",
    userEmail: "john@example.com",
    paymentPlan: "Daily",
    price: 3000,
    status: "confirmed",
    createdAt: "2024-11-27T14:30:00Z",
  },
  {
    id: "002",
    userId: "2",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    paymentPlan: "Monthly",
    price: 90000,
    status: "confirmed",
    createdAt: "2024-11-26T10:15:00Z",
  },
  {
    id: "003",
    userId: "3",
    userName: "Mike Johnson",
    userEmail: "mike@example.com",
    paymentPlan: "Weekly",
    price: 20000,
    status: "pending",
    createdAt: "2024-11-28T09:00:00Z",
  },
  {
    id: "004",
    userId: "1",
    userName: "John Doe",
    userEmail: "john@example.com",
    paymentPlan: "Daily",
    price: 3000,
    status: "cancelled",
    createdAt: "2024-11-25T16:45:00Z",
  },
];
