import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { useForm } from 'react-hook-form';
import App from '../App';
import nithubLogo from '../assets/nithubLogo.png';
import nithub from '../assets/nithub.png';


export const Route = createFileRoute('/register')({
  component: App,
});


// Header
export const Header = () => {
  return (
    <header className='flex w-full bg-gradient-to-r from-indigo-500 to-purple-600 p-1'>
        <img src ={nithubLogo} alt="nithub logo" className="w-12 h-14 object-contain mr-4" />
        <img src ={nithub} alt="nithub logo" className="h-12 object-contain"/>
      </header>
  );
};

// Package Selection UI Component
export const PackageSelection = ({ onNext }: { onNext: () => void }) => {
  const { selectedPackage, setSelectedPackage, clearBooking } = useBooking();
  const [localSelection, setLocalSelection] = useState<'daily' | 'weekly' | 'monthly' | null>(
    selectedPackage?.type || null
  );

  const packages = [
    { type: 'daily' as const, price: 50, label: 'Daily Package', description: 'Perfect for short-term needs' },
    { type: 'weekly' as const, price: 300, label: 'Weekly Package', description: 'Great for project work' },
    { type: 'monthly' as const, price: 1000, label: 'Monthly Package', description: 'Best value for regular use' }
  ];

  const handleCancel = () => {
    setLocalSelection(null);
    clearBooking();
  };

  const handleNext = () => {
    if (localSelection) {
      const pkg = packages.find(p => p.type === localSelection);
      if (pkg) {
        setSelectedPackage({ type: pkg.type, price: pkg.price });
        onNext();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ">
      <div className="max-w-4xl w-full m-auto pt-8">
        {/* Centered Box Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header with Logo */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-28 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <span className="text-white tracking-wide">WORK-SPACE</span>
            </div>
            <h1 className="mb-3 text-gray-800">Choose Your Space</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select your preferred subscription package to book your workspace. Choose from daily, weekly, or monthly options that best suit your needs.
            </p>
          </div>

          {/* Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {packages.map((pkg) => (
              <div
                key={pkg.type}
                onClick={() => setLocalSelection(pkg.type)}
                className={`bg-gradient-to-br rounded-xl shadow-md p-6 cursor-pointer transition-all border-2 ${
                  localSelection === pkg.type
                    ? 'border-indigo-500 shadow-xl from-indigo-50 to-purple-50 scale-105'
                    : 'border-transparent hover:border-indigo-200 from-white to-gray-50 hover:shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-800">{pkg.label}</h3>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      localSelection === pkg.type
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {localSelection === pkg.type && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">${pkg.price}</span>
                  <span className="text-gray-500">/{pkg.type}</span>
                </div>
                <p className="text-gray-600 text-sm">{pkg.description}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm hover:shadow-md"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              disabled={!localSelection}
              className={`px-8 py-3 rounded-xl transition-all font-medium ${
                localSelection
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
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
export const RegistrationForm = ({ onPrevious, onSubmit }: { onPrevious: () => void; onSubmit: () => void }) => {
  const { userInfo, setUserInfo } = useBooking();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone
    }
  });

  const onFormSubmit = (data: { name: string; email: string; phone: string }) => {
    setUserInfo(data);
    onSubmit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Centered Box Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-1 md:p-12">
          {/* Header */}
          <div className="mb-2 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-2 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="mb-1 text-gray-800">Register</h1>
            <p className="text-gray-600">Fill in the form to book your space</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: 'Name can only contain letters and spaces'
                    }
                  })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 transition-all ${
                    errors.name ? 'border-red-400' : 'border-gray-200'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email address is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 transition-all ${
                    errors.email ? 'border-red-400' : 'border-gray-200'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9+\-\s()]+$/,
                      message: 'Please enter a valid phone number'
                    },
                    minLength: {
                      value: 10,
                      message: 'Phone number must be at least 10 digits'
                    }
                  })}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 transition-all ${
                    errors.phone ? 'border-red-400' : 'border-gray-200'
                  }`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
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
                disabled={!isValid}
                className={`px-8 py-3 rounded-xl transition-all font-medium ${
                  isValid
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};