// "use client";

// import React, { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';

// const OrderSummary = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const serviceName = searchParams.get('serviceName') || '';
//   const meetingTime = searchParams.get('meetingTime') || '';
//   const price = searchParams.get('price') || '0';

//   // State to track the user's email input
//   const [email, setEmail] = useState('');

//   // Function to handle the confirmation and send email
//   const handleBookingConfirmation = async () => {
//     // Validate email input
//     if (!email) {
//       alert('Please enter your email.');
//       return;
//     }

//     // Confirm with the user before proceeding
//     if (confirm(`Do you really want to book ${serviceName} on ${meetingTime}?`)) {
//       // Call the API to send the confirmation email
//       try {
//         const response = await fetch('/api/send-email', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             to: email,
//             name: 'CrackInterview',
//             subject: `Booking Confirmation for ${serviceName}`,
//             body: `<p>Hello,</p>
//                    <p>You have successfully scheduled a new meeting with Hanan Fadel.</p>
//                    <p><strong>Meeting Details:</strong><br>
//                    - Service: ${serviceName}<br>
//                    - Time: ${meetingTime}<br>
//                    - Location/Platform: Google Meet</p>
//                    <p>If you have any questions or need to reschedule, please let us know.<br>
//                    Best wishes,<br>Crack Interview</p>`
//           }),
//         });

//         // Check response and redirect to confirmation page
//         if (response.ok) {
//           router.push(`/confirmation?serviceName=${encodeURIComponent(serviceName)}&mentorName=Hanan Fadel&meetingTime=${encodeURIComponent(meetingTime)}&customerEmail=${encodeURIComponent(email)}`);
//         } else {
//           throw new Error('Failed to send email');
//         }
//       } catch (error) {
//         console.error('Error sending confirmation email:', error);
//         alert('There was an issue sending the confirmation email. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 flex flex-col items-center min-h-screen justify-center text-center">
//       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-2xl">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h1>

//         <div className="flex flex-col items-center">
//           <p className="text-lg mb-2">1 x {serviceName}</p>
//           <p className="text-lg font-bold mb-2">${price}</p>
//         </div>

//         <hr className="my-4" />

//         <div className="flex flex-col items-center">
//           <p className="text-lg font-bold">Total</p>
//           <p className="text-lg font-bold mb-2">${price}</p>
//         </div>

//         <p className="text-gray-600 text-sm mt-4">Payments are 100% secure & encrypted</p>

       

//         <div className="mt-4 flex justify-center">
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
//           Confirm & Send Email
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;

// import nodemailer from 'nodemailer';

// export async function POST(req: Request) {
//   try {
//     // Extract necessary data from the request body
//     const { serviceName, meetingTime, customerEmail } = await req.json();

//     // Check if parameters exist
//     if (!serviceName || !meetingTime || !customerEmail) {
//       return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
//     }

//     // Delay the email sending by 5 minutes
//     setTimeout(async () => {
//       try {
//         // Create the transporter for sending emails
//         const transporter = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//             user: process.env.SMTP_EMAIL,
//             pass: process.env.SMTP_PASSWORD
//           }
//         });

//         // Sending email
//         await transporter.sendMail({
//           from: process.env.SMTP_EMAIL,
//           to: customerEmail,
//           subject: `Booking Confirmation: ${serviceName}`,
//           html: `
//             <p>Dear customer,</p>
//             <p>Your booking for the service <strong>${serviceName}</strong> is confirmed for ${meetingTime}.</p>
//             <p>Thank you for choosing us!</p>
//             <p>Best Regards,<br/>CrackInterview</p>`
//         });

//         console.log(`Email sent to ${customerEmail}`);

//       } catch (error) {
//         console.error('Error sending email:', error);
//       }
//     }, 300000); // 5-minute delay (300,000 ms)

//     // Return success response
//     return new Response(JSON.stringify({ success: true }), { status: 200 });

//   } catch (error) {
//     console.error('Error processing request:', error);
//     return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
//   }
// }


