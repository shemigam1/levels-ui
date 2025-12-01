import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { usePaystackPayment } from 'react-paystack';


export const Route = createFileRoute('/payment')({
  component: RouteComponent,
})


function RouteComponent() {


  const amount = 5000; // 5,000 Naira
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);




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
                <div className="flex justify-between">
                  <span className="text-gray-500">Space</span>
                  <span className="font-medium text-gray-500">Space (A2)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Due</span>
                  <span className="font-medium text-gray-500">₦{amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>


          {/* RIGHT COL: Action */}
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 h-full hover:-translate-y-2 hover:shadow-2xl">
              <h3 className="text-lg font-bold mb-4">Confirm Details</h3>


              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-black w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-green-500"
                />
                <p className="text-xs text-gray-400 mt-1">We'll send your booking confirmation here.</p>
              </div>


              <button
                onClick={() => {
                  if (!email) return alert("Please enter an email");
                  initializePayment({ onSuccess, onClose })
                }}
                disabled={isVerifying}
                className="w-full mt-13 bg-green-800 hover:bg-green-900 text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition-colors flex justify-center items-center gap-2"
              >
                {isVerifying ? "Verifying..." : `Pay ₦${amount.toLocaleString()}`}
              </button>


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



