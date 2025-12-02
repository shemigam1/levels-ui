import { createContext, useContext, useState, type ReactNode } from "react";

export interface Package {
  type: "day" | "week" | "month";
  price: number;
}

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

interface BookingContextType {
  selectedPackage: Package | null;
  setSelectedPackage: (pkg: Package | null) => void;
  userInfo: UserInfo;
  setUserInfo: (info: UserInfo) => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    phone: "",
  });

  const clearBooking = () => {
    setSelectedPackage(null);
    setUserInfo({ name: "", email: "", phone: "" });
  };

  return (
    <BookingContext.Provider
      value={{
        selectedPackage,
        setSelectedPackage,
        userInfo,
        setUserInfo,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
