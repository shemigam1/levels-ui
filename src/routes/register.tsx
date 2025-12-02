import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { type UserInfo, useBooking } from "../context/BookingContext";
import { useForm } from "react-hook-form";
import App from "../App";
import axios from "axios";


export const Route = createFileRoute("/register")({
  component: App,
});

// Package Selection UI Component
export const PackageSelection = ({ onNext }: { onNext: () => void }) => {
  const { selectedPackage, setSelectedPackage  } = useBooking();
  const [lengthSelection, setLengthSelection] = useState<
    "day" | "week" | "month" | null
  >(selectedPackage?.type || null);

  const packages = [
    {
      type: "day" as const,
      price: 3000,
      label: "Daily Package",
      description: "Perfect for short-term needs",
    },
    {
      type: "week" as const,
      price: 30000,
      label: "Weekly Package",
      description: "Great for project work",
    },
    {
      type: "month" as const,
      price: 90000,
      label: "Monthly Package",
      description: "Best value for regular use",
    },
  ];

  const navigate = useNavigate();


  const handleNext = () => {
    if (lengthSelection) {
      const pkg = packages.find((p) => p.type === lengthSelection);
      if (pkg) {
        setSelectedPackage({ type: pkg.type, price: pkg.price });
        onNext();
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl w-full m-auto pt-8">
        {/* Centered Box Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 mt-26">
        
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-lg md:text-2xl text-blue-800 font-bold">
              Choose Your Space
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select your preferred subscription package to book your workspace.
              Choose from daily, weekly, or monthly options that best suit your
              needs.
            </p>
          </div>

          {/* Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {packages.map((pkg) => (
              <div
                key={pkg.type}
                onClick={() => setLengthSelection(pkg.type)}
                className={`bg-linear-to-br rounded-xl shadow-md p-6 cursor-pointer transition-all border-2 ${
                  lengthSelection === pkg.type
                    ? "border-indigo-500 shadow-xl from-indigo-50 to-purple-50 scale-105"
                    : "border-transparent hover:border-indigo-200 from-white to-gray-50 hover:shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-800">{pkg.label}</h3>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      lengthSelection === pkg.type
                        ? "border-indigo-500 bg-indigo-500"
                        : "border-gray-300"
                    }`}
                  >
                    {lengthSelection === pkg.type && (
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <span className="bg-blue-500 font-bold bg-clip-text text-transparent">
                    &#8358;{pkg.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500">/{pkg.type}</span>
                </div>
                <p className="text-gray-600 text-sm">{pkg.description}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button
              onClick={()=>  navigate({ to: "/" })}
              className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm hover:shadow-md"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!lengthSelection}
              className={`px-8 py-3 rounded-xl transition-all font-medium ${
                lengthSelection
                  ? "bg-slate-800 text-white shadow-lg hover:opacity-90"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Registration Form UI Component
export const RegistrationForm = ({
  onPrevious,
  onSubmit,
}: {
  onPrevious: () => void;
  onSubmit: () => void;
}) => {
  const { userInfo, setUserInfo, selectedPackage, bookings, setBookings } = useBooking();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
    },
  });

  const onFormSubmit = async (data: UserInfo) => {
    
    setUserInfo(data);

    // Prepare booking data for backend
    const bookingData = {
      ...data,
      id: crypto.randomUUID(),
      date: new Date().toISOString(), 
      price: selectedPackage?.price,
      type_of_booking: selectedPackage?.type,
    };
    
    try {
      setLoading(true);

      const response = await axios.post("https://levels-server-hipc.onrender.com", bookingData);

      setLoading(false);

      if (response.data.success) {

        console.log("Booking successful:", response.data.data);

        setBookings([...bookings, response.data.data])

        navigate({ to: "/payment" });
        onSubmit(); 
      } else {
        alert("Booking failed: " + response.data.error);
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      alert("An error occurred while booking. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-white/80 backdrop-blur-sm mt-20 rounded-2xl shadow-xl p-1 md:p-12">

          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="space-y-4">
            <h1 className="mb-6 text-xl text-gray-800 text-center ">Allocation Form</h1>
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Name can only contain letters and spaces",
                    },
                  })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 transition-all ${
                    errors.name ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 transition-all ${
                    errors.email ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9+\-\s()]+$/,
                      message: "Please enter a valid phone number",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must be at least 10 digits",
                    },
                  })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 transition-all ${
                    errors.phone ? "border-red-400" : "border-gray-200"
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onPrevious}
                className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm hover:shadow-md"
              >
                Previous
              </button>
              <button
                type="submit"
                disabled={!isValid || loading}
                className={`px-8 py-3 rounded-xl transition-all font-medium ${
                  isValid
                    ? "bg-slate-700 shadow-lg text-white hover:opacity-90 hover:shadow-xl"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? "Registering..." : "Proceed to Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
