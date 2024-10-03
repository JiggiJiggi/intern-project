'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

const OrderSummary: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const serviceName = searchParams.get('serviceName') || '';
  const meetingTime = searchParams.get('meetingTime') || '';
  const price = searchParams.get('price') || '0';
  const priceId = searchParams.get('price_id') || '';

  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleBookingConfirmation = async () => {
    if (!email) {
      alert('Please enter your email.');
      return;
    }
  
    if (!priceId) {
      alert('Price ID is missing.');
      return;
    }
  
    setLoading(true);
  
    try {
      // Log the serviceName and meetingTime to ensure they are correct
      console.log("serviceName:", serviceName);
      console.log("meetingTime:", meetingTime);
  
      // Make a POST request to create a checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          email,
          serviceName,  // Ensure serviceName is passed
          meetingTime,  // Ensure meetingTime is passed
        }),
      });
  
      const session = await response.json();
  
      // Check if the session has been created and sessionId is present
      if (!session.id) {
        throw new Error("Session ID is missing from the response.");
      }
  
      // Stripe Checkout: Use the session ID to redirect to the payment page
      const stripe = await stripePromise;
      if (stripe) {
        console.log('Redirecting to Stripe Checkout with session ID:', session.id);
        await stripe.redirectToCheckout({ sessionId: session.id });
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      setError('Error during checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center text-center">
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>

        <div className="flex flex-col items-center">
          <p className="text-lg mb-2">Service: {serviceName}</p>
          <p className="text-lg mb-2">Scheduled Time: {meetingTime}</p>
          <p className="text-xl font-bold mb-2">${price}</p>
        </div>

        <div className="mt-0 flex justify-center">
          <div className="w-fit">
            <label htmlFor="email" className="block text-gray-700 mb-2 text-center">
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input mt-1 block w-fit border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleBookingConfirmation}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Confirm & Proceed to Payment'}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;




function setError(arg0: string) {
  throw new Error('Function not implemented.');
}
// 'use client';

// import React, { useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

// const OrderSummary: React.FC = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const serviceName = searchParams.get('serviceName') || '';
//   const meetingTime = searchParams.get('meetingTime') || '';
//   const price = searchParams.get('price') || '0';
//   const priceId = searchParams.get('price_id') || ''; // Fetching the price_id

//   const [email, setEmail] = useState<string>('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null); // Allow both string and null

//   const handleBookingConfirmation = async () => {
//     if (!email) {
//       alert('Please enter your email.');
//       return;
//     }

//     if (!priceId) {
//       alert('Price ID is missing.');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Make a POST request to create a checkout session
//       const response = await fetch('/api/create-checkout-session', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           priceId,   // Dynamically fetched price ID
//           email,     // Customer email
//           serviceName,  // Dynamic service name
//           meetingTime,  // Dynamic meeting time
//         }),
//       });
  
//       const session = await response.json();
  
//       const stripe = await stripePromise;
//       if (stripe) {
//         await stripe.redirectToCheckout({ sessionId: session.id });
//       }
//     } catch (error) {
//       console.error('Error during checkout:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center text-center">
//       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-2xl">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>

//         <div className="flex flex-col items-center">
//           <p className="text-lg mb-2">Service: {serviceName}</p>
//           <p className="text-lg mb-2">Scheduled Time: {meetingTime}</p>
//           <p className="text-xl font-bold mb-2">${price}</p>
//         </div>

//         <div className="mt-0 flex justify-center">
//           <div className="w-fit">
//             <label htmlFor="email" className="block text-gray-700 mb-2 text-center">
//               Email:
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-fit border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//             />
//           </div>
//         </div>

//         <button
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={handleBookingConfirmation}
//           disabled={loading}
//         >
//           {loading ? 'Processing...' : 'Confirm & Proceed to Payment'}
//         </button>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//         <p className="text-gray-600 text-sm mt-4">Payments are 100% secure & encrypted</p>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;

// 'use client';

// import React, { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

// const OrderSummary = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const serviceName = searchParams.get('serviceName') || '';
//   const meetingTime = searchParams.get('meetingTime') || '';
//   const price = searchParams.get('price') || '0';
//   const priceId = searchParams.get('price_id') || '';

//   const [email, setEmail] = useState<string>(''); // Ensure email is always a string
//   const [loading, setLoading] = useState(false);

//   const handleBookingConfirmation = async () => {
//     if (!email) {
//       alert('Please enter your email.');
//       return;
//     }

//     if (!priceId) {
//       alert('Price ID is missing.');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Make a POST request to create a checkout session
//       const response = await fetch('/api/create-checkout-session', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           priceId,
//           email,
//         }),
//       });

//       const session = await response.json();
//       const stripe = await stripePromise;

//       if (stripe) {
//         const { sessionId } = session;

//         // Redirect to Stripe Checkout
//         const result = await stripe.redirectToCheckout({ sessionId });

//         if (result.error) {
//           console.error('Error redirecting to checkout:', result.error.message);
//         } else {
//           // Wait for the successful payment
//           await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate payment confirmation delay

//           // Send confirmation email
//           await fetch('/api/send-email', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               customerEmail: email,
//               serviceName,
//               meetingTime,
//             }),
//           });

//           // Show a popup for email sent
//           alert('Email sent successfully!');

//           // Redirect to the confirmation page after sending the email
//           router.push(`/confirmation?serviceName=${encodeURIComponent(serviceName)}&meetingTime=${encodeURIComponent(meetingTime)}&customerEmail=${encodeURIComponent(email)}`);
//         }
//       }
//     } catch (error) {
//       console.error('Error during booking confirmation:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center text-center">
//       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-2xl">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>

//         <div className="flex flex-col items-center">
//           <p className="text-lg mb-2">Service: {serviceName}</p>
//           <p className="text-lg mb-2">Scheduled Time: {meetingTime}</p>
//           <p className="text-xl font-bold mb-2">${price}</p>
//         </div>

//         <div className="mt-4">
//           <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="block w-full border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>

//         <button
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={handleBookingConfirmation}
//           disabled={loading}
//         >
//           {loading ? 'Processing...' : 'Confirm & Proceed to Payment'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;


// 'use client';

// import React, { useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

// const OrderSummary = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const serviceName = searchParams.get('serviceName') || '';
//   const meetingTime = searchParams.get('meetingTime') || '';
//   const price = searchParams.get('price') || '0';
//   const priceId = searchParams.get('price_id') || '';

//   const [email, setEmail] = useState<string>(''); 
//   const [loading, setLoading] = useState(false);

//   const handleBookingConfirmation = async () => {
//     if (!email) {
//       alert('Please enter your email.');
//       return;
//     }

//     if (!priceId) {
//       alert('Price ID is missing.');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Create a Stripe Checkout session
//       const response = await fetch('/api/create-checkout-session', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           priceId, // Stripe Price ID
//           email,  // Customer's email
//         }),
//       });

//       const session = await response.json();

//       const stripe = await stripePromise;
//       if (stripe) {
//         const { sessionId } = session;
//         await stripe.redirectToCheckout({ sessionId });
//       }
//     } catch (error) {
//       console.error('Error redirecting to checkout:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center text-center">
//       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-2xl">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>

//         <div className="flex flex-col items-center">
//           <p className="text-lg mb-2">Service: {serviceName}</p>
//           <p className="text-lg mb-2">Scheduled Time: {meetingTime}</p>
//           <p className="text-xl font-bold mb-2">${price}</p>
//         </div>

//         <div className="mt-4">
//           <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="block w-full border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>

//         <button
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={handleBookingConfirmation}
//           disabled={loading}
//         >
//           {loading ? 'Processing...' : 'Confirm & Proceed to Payment'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;

// 'use client';
// import React, { useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

// const OrderSummary = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   // Retrieve query parameters from the URL and provide fallback values if they are null
//   const serviceName = searchParams.get('serviceName') || '';  // Fallback to an empty string
//   const meetingTime = searchParams.get('meetingTime') || '';  // Fallback to an empty string
//   const price = searchParams.get('price') || '0';  // Fallback to '0'
//   const priceId = searchParams.get('price_id') || '';  // Fallback to an empty string

//   const [email, setEmail] = useState<string>(''); // Ensure email is always a string
//   const [loading, setLoading] = useState(false);

//   const handleBookingConfirmation = async () => {
//     if (!email) {
//       alert('Please enter your email.');
//       return;
//     }

//     if (!priceId) {
//       alert('Price ID is missing.');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Make a POST request to create a checkout session
//       const response = await fetch('/api/create-checkout-session', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           priceId, // Ensure this is never null
//           email,  // Pass the email of the customer
//         }),
//       });

//       const session = await response.json();

//       // Ensure session ID exists in the response
//       if (!session.id) {
//         throw new Error('Session ID missing from Stripe response');
//       }

//       // Redirect to Stripe Checkout
//       const stripe = await stripePromise;
//       if (stripe) {
//         await stripe.redirectToCheckout({ sessionId: session.id });
//       }

//       // After successful payment, redirect to the success page with the session and other details
//       router.push(`/success?session_id=${session.id}&serviceName=${encodeURIComponent(serviceName)}&meetingTime=${encodeURIComponent(meetingTime)}&customerEmail=${encodeURIComponent(email)}`);
      
//     } catch (error) {
//       console.error('Error redirecting to checkout:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center text-center">
//       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-2xl">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>

//         <div className="flex flex-col items-center">
//           <p className="text-lg mb-2">Service: {serviceName}</p>
//           <p className="text-lg mb-2">Scheduled Time: {meetingTime}</p>
//           <p className="text-xl font-bold mb-2">${price}</p>
//         </div>

//         <div className="mt-4">
//           <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="block w-full border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>

//         <button
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={handleBookingConfirmation}
//           disabled={loading}
//         >
//           {loading ? 'Processing...' : 'Confirm & Proceed to Payment'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;


// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

// const OrderSummary = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   // Retrieve query parameters from the URL and provide fallback values if they are null
//   const serviceName = searchParams.get('serviceName') || '';
//   const meetingTime = searchParams.get('meetingTime') || '';
//   const price = searchParams.get('price') || '0';
//   const priceId = searchParams.get('price_id') || '';

//   const [email, setEmail] = useState(''); // Ensure email is always a string
//   const [loading, setLoading] = useState(false);

//   const handleBookingConfirmation = async () => {
//     if (!email) {
//       alert('Please enter your email.');
//       return;
//     }

//     if (!priceId) {
//       alert('Price ID is missing.');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Make a POST request to create a checkout session
//       const response = await fetch('/api/create-checkout-session', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           priceId, // Ensure this is never null
//           email, // Pass the email of the customer
//         }),
//       });

//       const session = await response.json();

//       // Redirect to Stripe Checkout
//       const stripe = await stripePromise;
//       if (stripe) {
//         const { sessionId } = session; // Ensure sessionId is available
//         await stripe.redirectToCheckout({ sessionId });

//         // If the payment is successful, Stripe will automatically redirect back to your success page
//         // Add a success redirection with additional parameters.
//         router.push(
//           `/success?session_id=${sessionId}&serviceName=${encodeURIComponent(serviceName)}&meetingTime=${encodeURIComponent(meetingTime)}&customerEmail=${encodeURIComponent(email)}`
//         );
//       }
//     } catch (error) {
//       console.error('Error redirecting to checkout:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center text-center">
//       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-2xl">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>

//         <div className="flex flex-col items-center">
//           <p className="text-lg mb-2">Service: {serviceName}</p>
//           <p className="text-lg mb-2">Scheduled Time: {meetingTime}</p>
//           <p className="text-xl font-bold mb-2">${price}</p>
//         </div>

//         <div className="mt-4">
//           <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="block w-full border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>

//         <button
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={handleBookingConfirmation}
//           disabled={loading}
//         >
//           {loading ? 'Processing...' : 'Confirm & Proceed to Payment'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;



// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

// const OrderSummary = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   // Retrieve query parameters from the URL
//   const serviceName = searchParams.get('serviceName');
//   const meetingTime = searchParams.get('meetingTime');
//   const price = searchParams.get('price');
//   const priceId = searchParams.get('price_id') // Provide a default empty string if undefined

//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleBookingConfirmation = async () => {
//     if (!email) {
//       alert('Please enter your email.');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Make a POST request to create a checkout session
//       const response = await fetch('/api/create-checkout-session', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           priceId, // Pass the price ID for Stripe
//           email, // Pass the email of the customer
//         }),
//       });

//       const session = await response.json();

//       // Redirect to Stripe Checkout
//       const stripe = await stripePromise;
//       if (stripe) {
//         await stripe.redirectToCheckout({ sessionId: session.id });
//       }
//     } catch (error) {
//       console.error('Error redirecting to checkout:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center text-center">
//       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-2xl">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>

//         <div className="flex flex-col items-center">
//           <p className="text-lg mb-2">Service: {serviceName}</p>
//           <p className="text-lg mb-2">Scheduled Time: {meetingTime}</p>
//           <p className="text-xl font-bold mb-2">${price}</p>
//         </div>

//         <div className="mt-4">
//           <label htmlFor="email" className="block text-gray-700 mb-2">
//             Email:
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="block w-full border border-gray-300 rounded-md shadow-sm"
//           />
//         </div>

//         <button
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={handleBookingConfirmation}
//           disabled={loading}
//         >
//           {loading ? 'Processing...' : 'Confirm & Proceed to Payment'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;


// 'use client';

// import React, { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useShoppingCart } from 'use-shopping-cart';

// const OrderSummary: React.FC = () => {
//   const {
//     redirectToCheckout,
//   } = useShoppingCart();

//   const searchParams = useSearchParams();
//   const router = useRouter();
  
//   const serviceName = searchParams.get('serviceName') || '';
//   const meetingTime = searchParams.get('meetingTime') || '';
//   const price = searchParams.get('price') || 'error'; 
//   const priceId = searchParams.get('price_id') || ''; // Fetching the price_id
  
//   const [email, setEmail] = useState<string>('');

//   const handleBookingConfirmation = async () => {
//     if (!email) {
//       alert('Please enter your email.');
//       return;
//     }

//     if (confirm(`Do you really want to book ${serviceName} on ${meetingTime}?`)) {
//       // Redirect to Stripe checkout
//       try {
//         const result = await redirectToCheckout();
//         if (result?.error) {
//           console.error("Error redirecting to checkout:", result.error);
//         }
//       } catch (error) {
//         console.error("Error redirecting to checkout:", error);
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center text-center">
//       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-2xl">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>

//         <div className="flex flex-col items-center">
//           <p className="text-lg mb-2">1 x {serviceName}</p>
//           <p className="text-xl font-bold mb-2">${price}</p>
//         </div>

//         <div className="mt-0 flex justify-center">
//           <div className="w-fit">
//             <label htmlFor="email" className="block text-gray-700 mb-2 text-center">
//               Email:
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-fit border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//             />
//           </div>
//         </div>

//         <button
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={handleBookingConfirmation}
//         >
//           Confirm & Proceed to Payment
//         </button>
//         <p className="text-gray-600 text-sm mt-4">Payments are 100% secure & encrypted</p>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;


// 'use client';

// import React, { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';

// const OrderSummary = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const serviceName = searchParams.get('serviceName') || '';
//   const meetingTime = searchParams.get('meetingTime') || '';
//   const price = searchParams.get('price') || 'error'; 
  
//   const [email, setEmail] = useState('');

//   const handleBookingConfirmation = () => {
//     if (!email) {
//       alert('Please enter your email.');
//       return;
//     }

//     if (confirm(`Do you really want to book ${serviceName} on ${meetingTime}?`)) {
//       // Redirect to the checkout page with price and email as query params
//       router.push(`/checkout?serviceName=${encodeURIComponent(serviceName)}&meetingTime=${encodeURIComponent(meetingTime)}&price=${encodeURIComponent(price)}&email=${encodeURIComponent(email)}`);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center text-center">
//       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-2xl">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>

//         <div className="flex flex-col items-center">
//           <p className="text-lg mb-2">1 x {serviceName}</p>
//           <p className="text-xl font-bold mb-2">${price}</p>
//         </div>

//         <div className="mt-0 flex justify-center">
//           <div className="w-fit">
//             <label htmlFor="email" className="block text-gray-700 mb-2 text-center">
//               Email:
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-fit border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
//             />
//           </div>
//         </div>

//         <button
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//           onClick={handleBookingConfirmation}
//         >
//           Confirm & Proceed to Payment
//         </button>
//         <p className="text-gray-600 text-sm mt-4">Payments are 100% secure & encrypted</p>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;

// // 'use client';

// // import React, { useState } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';

// // const OrderSummary = () => {
// //   const searchParams = useSearchParams();
// //   const router = useRouter();
// //   const serviceName = searchParams.get('serviceName') || '';
// //   const meetingTime = searchParams.get('meetingTime') || '';
// //   const price = searchParams.get('price') || '0'; // Ensure the price is fetched from query params
  
// //   const [email, setEmail] = useState('');

// //   const handleBookingConfirmation = async () => {
// //     if (!email) {
// //       alert('Please enter your email.');
// //       return;
// //     }
  
// //     if (confirm(`Do you really want to book ${serviceName} on ${meetingTime}?`)) {
// //       // Redirect to the checkout page with relevant information
// //       router.push(`/checkout?serviceName=${encodeURIComponent(serviceName)}&meetingTime=${encodeURIComponent(meetingTime)}&price=${encodeURIComponent(price)}&email=${encodeURIComponent(email)}`);
// //     }
// //   };
  

// //   return (
// //     <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center text-center">
// //       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-2xl">
// //         <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>

// //         <div className="flex flex-col items-center">
// //           <p className="text-lg mb-2">1 x {serviceName}</p>
// //           <p className="text-xl font-bold mb-2">${price}</p>
// //         </div>

// //         <div className="mt-0 flex justify-center">
// //           <div className="w-fit">
// //             <label htmlFor="email" className="block text-gray-700 mb-2 text-center">
// //               Email:
// //             </label>
// //             <input
// //               id="email"
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="mt-1 block w-fit border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
// //             />
// //           </div>
// //         </div>

// //         <button
// //           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
// //           onClick={handleBookingConfirmation}
// //         >
// //           Confirm & Proceed to Payment
// //         </button>
// //         <p className="text-gray-600 text-sm mt-4">Payments are 100% secure & encrypted</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OrderSummary;

// // 'use client';

// // import React, { useState } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';

// // const OrderSummary = () => {
// //   const searchParams = useSearchParams();
// //   const router = useRouter();
// //   const serviceName = searchParams.get('serviceName') || '';
// //   const meetingTime = searchParams.get('meetingTime') || '';
// //   const price = searchParams.get('price') || 'error'; // Price is fetched from query params
  
// //   const [email, setEmail] = useState('');

// //   const handleBookingConfirmation = async () => {
// //     if (!email) {
// //       alert('Please enter your email.');
// //       return;
// //     }
  
// //     if (confirm(`Do you really want to book ${serviceName} on ${meetingTime}?`)) {
// //       // Redirect immediately to confirmation page
// //       router.push(`/confirmation?serviceName=${encodeURIComponent(serviceName)}&mentorName=Hanan Fadel&meetingTime=${encodeURIComponent(meetingTime)}&customerEmail=${encodeURIComponent(email)}`);
  
// //       try {
// //         const response = await fetch('/api/send-email', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({
// //             to: email,
// //             name: 'CrackInterview',
// //             subject: `Booking Confirmation for ${serviceName}`,
// //             body: `<p>Hello,</p>
// //                    <p>You have successfully scheduled a new meeting with Hanan Fadel.</p>
// //                    <p><strong>Meeting Details:</strong><br>
// //                    - Service: ${serviceName}<br>
// //                    - Time: ${meetingTime}<br>
// //                    - Location/Platform: Google Meet</p>
// //                    <p>If you have any questions or need to reschedule, please let us know.<br>
// //                    Best wishes,<br>Crack Interview</p>`
// //           }),
// //         });
  
// //         if (!response.ok) {
// //           console.error('Failed to send email');
// //         }
// //       } catch (error) {
// //         console.error('Error sending confirmation email:', error);
// //       }
// //     }
// //   };
  

// //   return (
// //     <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center text-center">
// //       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-2xl">
// //         <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>

// //         <div className="flex flex-col items-center">
// //           <p className="text-lg mb-2">1 x {serviceName}</p>
// //           <p className="text-xl font-bold mb-2">${price}</p>
// //         </div>

// // {/* 
// //         <div className="flex flex-col items-center">
// //           <p className="text-lg font-bold">Total</p>
// //           <p className="text-lg font-bold mb-2">${price}</p>
// //         </div> */}


// //         <div className="mt-0 flex justify-center">
// //           <div className="w-fit">
// //             <label htmlFor="email" className="block text-gray-700 mb-2 text-center">
// //               Email:
// //             </label>
// //             <input
// //               id="email"
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="mt-1 block w-fit border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
// //             />
// //           </div>
// //         </div>

// //         <button
// //           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
// //           onClick={handleBookingConfirmation}
// //         >
// //           Confirm & Send Email
// //         </button>
// //         <p className="text-gray-600 text-sm mt-4">Payments are 100% secure & encrypted</p>

// //       </div>
// //     </div>
// //   );
// // };

// // export default OrderSummary;

// // "use client";

// // import React, { useState } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';

// // const OrderSummary = () => {
// //   const searchParams = useSearchParams();
// //   const router = useRouter();

// //   const serviceName = searchParams.get('serviceName') || '';
// //   const meetingTime = searchParams.get('meetingTime') || '';
// //   const price = searchParams.get('price') || '0';

// //   // State to track the user's email input
// //   const [email, setEmail] = useState('');

// //   // Function to handle the confirmation and send email
// //   const handleBookingConfirmation = async () => {
// //     // Validate email input
// //     if (!email) {
// //       alert('Please enter your email.');
// //       return;
// //     }

// //     // Confirm with the user before proceeding
// //     if (confirm(`Do you really want to book ${serviceName} on ${meetingTime}?`)) {
// //       // Call the API to send the confirmation email
// //       try {
// //         const response = await fetch('/api/send-email', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({
// //             to: email,
// //             name: 'CrackInterview',
// //             subject: `Booking Confirmation for ${serviceName}`,
// //             body: `<p>Hello,</p>
// //                    <p>You have successfully scheduled a new meeting with Hanan Fadel.</p>
// //                    <p><strong>Meeting Details:</strong><br>
// //                    - Service: ${serviceName}<br>
// //                    - Time: ${meetingTime}<br>
// //                    - Location/Platform: Google Meet</p>
// //                    <p>If you have any questions or need to reschedule, please let us know.<br>
// //                    Best wishes,<br>Crack Interview</p>`
// //           }),
// //         });

// //         // Check response and redirect to confirmation page
// //         if (response.ok) {
// //           router.push(`/confirmation?serviceName=${encodeURIComponent(serviceName)}&mentorName=Hanan Fadel&meetingTime=${encodeURIComponent(meetingTime)}&customerEmail=${encodeURIComponent(email)}`);
// //         } else {
// //           throw new Error('Failed to send email');
// //         }
// //       } catch (error) {
// //         console.error('Error sending confirmation email:', error);
// //         alert('There was an issue sending the confirmation email. Please try again.');
// //       }
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center text-center">
// //       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-2xl">
// //         <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>

// //         <div className="flex flex-col items-center">
// //           <p className="text-lg mb-2">1 x {serviceName}</p>
// //           <p className="text-lg font-bold mb-2">${price}</p>
// //         </div>

// //         <hr className="my-4" />

// //         <div className="flex flex-col items-center">
// //           <p className="text-lg font-bold">Total</p>
// //           <p className="text-lg font-bold mb-2">${price}</p>
// //         </div>

// //         <p className="text-gray-600 text-sm mt-4">Payments are 100% secure & encrypted</p>

// //         <div className="mt-4 flex justify-center">
// //           <div className="w-fit">
// //             <label htmlFor="email" className="block text-gray-700 mb-2 text-center">
// //               Email:
// //             </label>
// //             <input
// //               id="email"
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               className="mt-1 block w-fit border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
// //             />
// //           </div>
// //         </div>

// //         <button
// //           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
// //           onClick={handleBookingConfirmation}
// //         >
// //           Confirm & Send Email
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OrderSummary;

// // // "use client";

// // // import React, { useState } from 'react';
// // // import { useRouter, useSearchParams } from 'next/navigation';

// // // const OrderSummary = () => {
// // //   const searchParams = useSearchParams();
// // //   const router = useRouter();

// // //   const serviceName = searchParams.get('serviceName') || '';
// // //   const meetingTime = searchParams.get('meetingTime') || '';
// // //   const price = searchParams.get('price') || '0';

// // //   // State to track the user's email input
// // //   const [email, setEmail] = useState('');

// // //   // Function to handle the confirmation and send email
// // //   const handleBookingConfirmation = async () => {
// // //     // Validate email input
// // //     if (!email) {
// // //       alert('Please enter your email.');
// // //       return;
// // //     }

// // //     // Confirm with the user before proceeding
// // //     if (confirm(`Do you really want to book ${serviceName} on ${meetingTime}?`)) {
// // //       // Call the API to send the confirmation email
// // //       try {
// // //         const response = await fetch('/api/send-email', {
// // //           method: 'POST',
// // //           headers: { 'Content-Type': 'application/json' },
// // //           body: JSON.stringify({
// // //             to: email,
// // //             name: 'CrackInterview',
// // //             subject: `Booking Confirmation for ${serviceName}`,
// // //             body: `<p>Hello,</p>
// // //                    <p>You have successfully scheduled a new meeting with Hanan Fadel.</p>
// // //                    <p><strong>Meeting Details:</strong><br>
// // //                    - Service: ${serviceName}<br>
// // //                    - Time: ${meetingTime}<br>
// // //                    - Location/Platform: Google Meet</p>
// // //                    <p>If you have any questions or need to reschedule, please let us know.<br>
// // //                    Best wishes,<br>Crack Interview</p>`
// // //           }),
// // //         });

// // //         // Check response and redirect to confirmation page
// // //         if (response.ok) {
// // //           router.push(`/confirmation?serviceName=${encodeURIComponent(serviceName)}&mentorName=Hanan Fadel&meetingTime=${encodeURIComponent(meetingTime)}&customerEmail=${encodeURIComponent(email)}`);
// // //         } else {
// // //           throw new Error('Failed to send email');
// // //         }
// // //       } catch (error) {
// // //         console.error('Error sending confirmation email:', error);
// // //         alert('There was an issue sending the confirmation email. Please try again.');
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center text-center">
// // //       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-2xl">
// // //         <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>

// // //         <div className="flex flex-col items-center">
// // //           <p className="text-lg mb-2">1 x {serviceName}</p>
// // //           <p className="text-lg font-bold mb-2">${price}</p>
// // //         </div>

// // //         <hr className="my-4" />

// // //         <div className="flex flex-col items-center">
// // //           <p className="text-lg font-bold">Total</p>
// // //           <p className="text-lg font-bold mb-2">${price}</p>
// // //         </div>

// // //         <p className="text-gray-600 text-sm mt-4">Payments are 100% secure & encrypted</p>

       

// // //         <div className="mt-4 flex justify-center">
// // //           <div className="w-fit">
// // //             <label htmlFor="email" className="block text-gray-700 mb-2 text-center">
// // //               Email:
// // //             </label>
// // //             <input
// // //               id="email"
// // //               type="email"
// // //               value={email}
// // //               onChange={(e) => setEmail(e.target.value)}
// // //               className="mt-1 block w-fit border border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
// // //             />
// // //           </div>
// // //         </div>

// // //         <button
// // //           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
// // //           onClick={handleBookingConfirmation}
// // //         >
// // //           Confirm & Send Email
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default OrderSummary;
