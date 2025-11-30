export interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  spaceId: string;
  spaceName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  duration: number;
  capacity: number;
  price: number;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
}

export interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: "blue" | "green" | "yellow" | "purple";
}

export interface BookingRowProps {
  booking: Booking;
  onDelete: () => void;
  onStatusChange: (status: string) => void;
  getStatusBadge: (status: string) => React.ReactNode;
}

export interface UserRowProps {
  user: UserType;
  onDelete: () => void;
  getStatusBadge: (status: string) => React.ReactNode;
}
