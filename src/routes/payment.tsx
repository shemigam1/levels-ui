import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { usePaystackPayment } from 'react-paystack';
import { useForm } from 'react-hook-form';
import { useBooking } from '../context/BookingContext';



export const Route = createFileRoute('/payment')({
  component: RouteComponent,
})


function RouteComponent() {

  const { selectedPackage, userInfo } = useBooking();


  const amount = selectedPackage?.price || 100;
  const [isVerifying, setIsVerifying] = useState(false);

  type PaymentFormValues = {
    email: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<PaymentFormValues>({
    mode: "onChange"
  });

  const email = watch("email");



  // This function runs AFTER Paystack popup closes successfully
  const onSuccess = async (referenceObj: any) => {
    setIsVerifying(true);




    try {
      // Send the reference to the backend
      const response = await fetch('http://localhost:3000/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: referenceObj.reference })
      });


      const data = await response.json();


      if (data.status === true) {
        alert("Booking Confirmed! Receipt sent to " + email);
      } else {
        alert("Verification failed. Please contact support.");
      }
    } catch (error) {
      console.error(error);
      alert("Error verifying payment");
    } finally {
      setIsVerifying(false);
    }
  };


  const onClose = () => {
    alert("Payment cancelled.");
  };


  const config = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: amount * 100,
    publicKey: 'pk_test_3c5f3c7aa7f157bcdd7428a30cd327cc8522b244',
    onSuccess: onSuccess,
    onClose: onClose
  };


  const initializePayment = usePaystackPayment(config);

  const onPayClick = () => {
    initializePayment({ onSuccess, onClose });
  };

  const getPackageLabel = (type?: string) => {
    if (!type) return "No Plan Selected";
    return type.charAt(0).toUpperCase() + type.slice(1) + " Plan";
  };


  return <div>
    <div className="min-h-screen bg-gray-50 text-white py-8 px-4">




      {/* HEADER */}


      <div className="max-w-4xl mx-auto">
        <div className="mb-8 bg-gradient-to-r from-green-600 to-emerald-900 p-6 rounded-2xl shadow-2xl text-white text-center border border-green-500/30">
          <h1 className="text-3xl md:text-4xl font-bold font-momo mb-2 tracking-wide">
            Make Payment
          </h1>
          <p className="text-green-100 font-bellefair text-lg md:text-xl opacity-90">
            Finalize your booking for the Workspace
          </p>
        </div>


        <div className="flex flex-col md:flex-row gap-6 group">


          {/* LEFT COL: Summary */}
          <div className="w-full md:w-1/2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Booking Summary</h3>
              <div className="h-32 w-full bg-gray-200 rounded-lg overflow-hidden mb-4 flex items-center justify-center text-gray-400">
                <img
                  alt="Working Space"
                  src="/nithub-space.webp"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3 text-sm">
                {/* 1. Plan Name */}
                <div className="flex justify-between">
                  <span className="text-gray-500">Selected Plan</span>
                  <span className="font-bold text-gray-900">
                    {getPackageLabel(selectedPackage?.type)}
                  </span>
                </div>

                {/* 2. Guest Name */}
                <div className="flex justify-between">
                  <span className="text-gray-500">Reserved For</span>
                  <span className="font-bold text-gray-900 capitalize">
                    {userInfo?.name || "Guest"}
                  </span>
                </div>
                {/* 5. Total Price with Word Fallback */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-base">Total Due</span>
                    <span className={`font-bold text-gray-900 ${amount > 0 ? "text-green-700" : "text-gray-400"}`}>
                        {amount > 0 ? `₦${amount.toLocaleString()}` : "Select a Plan"}
                    </span>
                  </div>
              </div>
            </div>
          </div>


          {/* RIGHT COL: Action */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 h-full hover:-translate-y-2 hover:shadow-2xl">
              <h3 className="text-lg font-bold mb-4">Confirm Details</h3>

              <form onSubmit={handleSubmit(onPayClick)}>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`text-black w-full border p-3 rounded-lg focus:outline-none transition-all
                      ${errors.email ? 'border-red-500 focus:border-red-500 bg-red-50' : 'border-gray-300 focus:border-green-500'
                      }
                    `}
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address"
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">We'll send your booking confirmation here.</p>
                </div>


                <button
                  type="submit"
                  disabled={!isValid}
                  className={`w-full mt-8 text-white py-4 rounded-lg font-bold transition-colors flex justify-center items-center gap-2
                      ${(!isValid)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-800 hover:bg-green-900 shadow-md'
                    }
                    `}
                >
                  {isVerifying ? "Verifying..." : `Pay ₦${amount.toLocaleString()}`}
                </button>
              </form>



            </div>
          </div>


        </div>
      </div>
      <div className="mt-10 mb-6 flex justify-center">
        <img
          alt="Secured by Paystack"
          src="/Paystack-logo.jpg"
          width="150"
          height="70"
          loading="lazy"
        />
      </div>
    </div>
  </div>
}



