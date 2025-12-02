import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Lock, X } from "lucide-react";
import paystack from "../assets/paystack.jpg";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/payment")({
  component: Payment,
});

function Payment() {
  const { selectedPackage, userInfo } = useBooking();
  const amount = selectedPackage?.price || 5000;
  const [email, setEmail] = useState(userInfo?.email || "");
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(true);

  // PAYSTACK INLINE PAYMENT FUNCTION
  const verifyPayment = async (response: any) => {
    setIsVerifying(true);

    try {
      const res = await fetch("http://localhost:3000/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: response.reference }),
      });

      const data = await res.json();

      if (data.status === true) {
        alert("Booking Confirmed! Receipt sent to " + email);
      } else {
        alert("Verification failed. Please contact support.");
      }
    } catch (err) {
      console.error(err);
      alert("Error verifying payment");
    } finally {
      setIsVerifying(false);
    }
  };

  const payWithPaystack = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    const handler = (window as any).PaystackPop.setup({
      key: "pk_test_3c5f3c7aa7f157bcdd7428a30cd327cc8522b244",
      email: email,
      amount: amount * 100,
      ref: new Date().getTime().toString(),

      callback: function (response: any) {
        verifyPayment(response);
      },

      onClose: function () {
        alert("Payment cancelled.");
      },
    });

    handler.openIframe();
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {showPaymentModal && (
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500  flex items-center justify-center">
                <img src={paystack} alt="paystack-logo" />
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">{email}</div>
                <div className="text-lg font-semibold text-green-600">
                  Pay NGN {amount.toLocaleString()}
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate({ to: "/register" })}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Email Input Section */}
          <div className="px-6 py-8">
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="motoyosilove@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 focus:bg-white transition-colors text-gray-900"
              />
              <p className="text-xs text-gray-500 mt-2">
                We'll send your booking confirmation here.
              </p>
            </div>

            <button
              onClick={payWithPaystack}
              disabled={isVerifying}
              className="w-full bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-lg font-semibold transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isVerifying ? "Verifying..." : `Pay ₦${amount.toLocaleString()}`}
            </button>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-center gap-2 text-sm text-gray-600">
            <Lock size={14} />
            <span>Secured by</span>
            <span className="font-bold text-gray-900">paystack</span>
          </div>
        </div>
      )}
    </div>
  );
}
