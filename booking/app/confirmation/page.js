'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ConfirmationPage = () => {
  const [confirmationData, setConfirmationData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = searchParams.get('session_id') ?? '';  // Fallback to an empty string if undefined
    const customerEmail = searchParams.get('customerEmail') ?? '';  // Same for customerEmail
    const serviceName = searchParams.get('serviceName') ?? '';
    const meetingTime = searchParams.get('meetingTime') ?? '';
    

if (!serviceName || !meetingTime || !customerEmail) {
  console.error('Missing required parameters');
  return;
}

    
    if (serviceName && meetingTime && customerEmail) {
      setConfirmationData({
        serviceName,
        meetingTime: new Date(meetingTime).toLocaleString(),
        customerEmail,
      });
    } else {
      console.error('Missing Parameters');
      router.push('/'); // Redirect to homepage if any data is missing
    }
  }, [router]);

  if (!confirmationData) return <div>Loading...</div>;

  return (
    <div className="justify-center container mx-auto p-4 flex flex-col items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 text-center w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Thanks for Scheduling a {confirmationData.serviceName} session
        </h2>
        <h1 className="text-3xl font-semibold mb-4">Please check your inbox for the email confirmation.</h1>

        <div className="flex justify-center items-center mb-4">
          <div className="text-left">
            <p>You are meeting on:</p>
            <h3 className="text-xl font-semibold">{confirmationData.meetingTime}</h3>
            <p className="text-gray-600">{confirmationData.customerEmail}</p>
          </div>
        </div>

        <p className="text-gray-600">
          We have sent you an email with complete details of this meeting and guidance to follow.
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;


// 'use client';
// import React from 'react';
// import { useSearchParams } from 'next/navigation';

// const ConfirmationPage = () => {
//   const searchParams = useSearchParams();
//   const serviceName = searchParams.get('serviceName');
//   const meetingTime = searchParams.get('meetingTime');
//   const customerEmail = searchParams.get('customerEmail');

//   return (
//     <div className="justify-center container mx-auto p-4 flex flex-col items-center min-h-screen">
//       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 text-center w-full max-w-2xl">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">
//           Thanks for Scheduling a {serviceName} session.
//         </h2>
//         <p className="text-lg">Meeting Time: {meetingTime}</p>
//         <p className="text-lg">Confirmation sent to: {customerEmail}</p>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationPage;


// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const ConfirmationPage = () => {
//   const [confirmationData, setConfirmationData] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const serviceName = params.get('serviceName');
//     const mentorName = params.get('mentorName');
//     const meetingTime = params.get('meetingTime');
//     const customerEmail = params.get('customerEmail');
    
//     if (serviceName && mentorName && meetingTime && customerEmail) {
//       setConfirmationData({
//         serviceName,
//         mentorName,
//         meetingTime: new Date(meetingTime).toLocaleString(),
//         customerEmail,
//       });
//     } else {
//       console.error('Missing Parameters');
//       router.push('/'); // Redirect to homepage if any data is missing
//     }
//   }, [router]);

//   if (!confirmationData) return <div>Loading...</div>;

//   return (
//     <div className="justify-center container mx-auto p-4 flex flex-col items-center min-h-screen">
//       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 text-center w-full max-w-2xl">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">
//           Thanks for Scheduling a {confirmationData.serviceName} session with {confirmationData.mentorName}
//         </h2>
//         <h1 className="text-3xl font-semibold mb-4">Please check your inbox for the email confirmation.</h1>

//         <div className="flex justify-center items-center mb-4">
//           <img src="/mentor.jpeg" alt="Mentor" className="w-16 h-16 rounded-full mr-4" />
//           <div className="text-left">
//             <p>You are meeting with:</p>
//             <h3 className="text-xl font-semibold">{confirmationData.mentorName}</h3>
//             <p className="text-gray-600">{confirmationData.customerEmail}</p>
//           </div>
//         </div>

//         <div className="flex items-center justify-center mb-4">
//           <span className="mr-2">📅</span>
//           <p>{confirmationData.meetingTime}</p>
//         </div>

//         <p className="text-gray-600">
//           We have sent you an email with complete details of this meeting and guidance to follow.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationPage;
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const ConfirmationPage = () => {
//   const [confirmationData, setConfirmationData] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const serviceName = params.get('serviceName');
//     const mentorName = params.get('mentorName');
//     const meetingTime = params.get('meetingTime');
//     const customerEmail = params.get('customerEmail');
    
//     if (serviceName && mentorName && meetingTime && customerEmail) {
//       setConfirmationData({
//         serviceName,
//         mentorName,
//         meetingTime: new Date(meetingTime).toLocaleString(),
//         customerEmail,
//       });
//     } else {
//       console.error('Missing Parameters');
//       router.push('/'); // Redirect to homepage if any data is missing
//     }
//   }, [router]);

//   if (!confirmationData) return <div>Loading...</div>;

//   return (
//     <div className="justify-center container mx-auto p-4 flex flex-col items-center min-h-screen">
//       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 text-center w-full max-w-2xl">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">
//           Thanks for Scheduling a {confirmationData.serviceName} session with {confirmationData.mentorName}
//         </h2>
//         <h1 className="text-3xl font-semibold mb-4">Please check your inbox for the email confirmation.</h1>

//         <div className="flex justify-center items-center mb-4">
//           <img src="/mentor.jpeg" alt="Mentor" className="w-16 h-16 rounded-full mr-4" />
//           <div className="text-left">
//             <p>You are meeting with:</p>
//             <h3 className="text-xl font-semibold">{confirmationData.mentorName}</h3>
//             <p className="text-gray-600">{confirmationData.customerEmail}</p>
//           </div>
//         </div>

//         <div className="flex items-center justify-center mb-4">
//           <span className="mr-2">📅</span>
//           <p>{confirmationData.meetingTime}</p>
//         </div>

//         <p className="text-gray-600">
//           We have sent you an email with complete details of this meeting and guidance to follow.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationPage;

// "use client";

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// interface ConfirmationData {
//   serviceName: string;
//   mentorName: string;
//   meetingTime: string;
//   customerEmail: string;
// }

// const ConfirmationPage: React.FC = () => {
//   const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchConfirmationData = () => {
//       const params = new URLSearchParams(window.location.search);
//       const serviceName = params.get('serviceName');
//       const mentorName = params.get('mentorName');
//       const meetingTime = params.get('meetingTime');
//       const customerEmail = params.get('customerEmail');
  
//       console.log("Fetched Parameters:", { serviceName, mentorName, meetingTime, customerEmail });
  
//       if (serviceName && mentorName && meetingTime && customerEmail) {
//         // Validate meetingTime is a valid date
//         const parsedMeetingTime = new Date(meetingTime);
//         if (!isNaN(parsedMeetingTime.getTime())) {
//           setConfirmationData({
//             serviceName,
//             mentorName,
//             meetingTime: parsedMeetingTime.toLocaleString(),
//             customerEmail,
//           });
//         } else {
//           console.error("Invalid meetingTime:", meetingTime);
//           router.push('/'); // Redirect to homepage if meetingTime is invalid
//         }
//       } else {
//         console.error("Missing Parameters");
//         router.push('/'); // Redirect to homepage if any data is missing
//       }
//     };
  
//     fetchConfirmationData();
//   }, [router]);
  
//   if (!confirmationData) return <div>Loading...</div>;

//   return (
//     <div className="justify-center container mx-auto p-4 flex flex-col items-center min-h-screen">
//       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 text-center w-full max-w-2xl">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">
//           Thanks a lot for Scheduling {confirmationData.serviceName} session {confirmationData.mentorName}
//         </h2>
//         <h1 className="text-3xl font-semibold mb-4">Email sent kindly check your inbox</h1>

//         <div className="flex justify-center items-center mb-4">
//           <img src="/mentor.jpeg" alt="Mentor" className="w-16 h-16 rounded-full mr-4" />
//           <div className="text-left">
//             <p>You are meeting with:</p>
//             <h3 className="text-xl font-semibold">{confirmationData.mentorName}</h3>
//             <p className="text-gray-600">{confirmationData.customerEmail}</p>
//           </div>
//         </div>

//         <div className="flex items-center justify-center mb-4">
//           <span className="mr-2">📅</span>
//           <p>{confirmationData.meetingTime}</p>
//         </div>

//         <p className="text-gray-600">
//           We have sent you an email with complete details of this meeting and guidance to follow.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationPage;

// "use client";

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// interface ConfirmationData {
//   serviceName: string;
//   mentorName: string;
//   meetingTime: string;
//   customerEmail: string;
// }

// const ConfirmationPage: React.FC = () => {
//   const router = useRouter();
//   const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null);

//   useEffect(() => {
//     const fetchConfirmationData = () => {
//       const params = new URLSearchParams(window.location.search);
//       const serviceName = params.get('serviceName');
//       const mentorName = params.get('mentorName');
//       const meetingTime = params.get('meetingTime');
//       const customerEmail = params.get('customerEmail');

//       console.log("Fetched Parameters:", { serviceName, mentorName, meetingTime, customerEmail });

//       if (serviceName && mentorName && meetingTime && customerEmail) {
//         // Validate meetingTime is a valid date
//         const parsedMeetingTime = new Date(meetingTime);
//         if (!isNaN(parsedMeetingTime.getTime())) {
//           setConfirmationData({
//             serviceName,
//             mentorName,
//             meetingTime: parsedMeetingTime.toLocaleString(),
//             customerEmail,
//           });
//         } else {
//           console.error("Invalid meetingTime:", meetingTime);
//           router.push('/'); // Redirect to homepage if meetingTime is invalid
//         }
//       } else {
//         console.error("Missing Parameters");
//         router.push('/'); // Redirect to homepage if any data is missing
//       }
//     };

//     fetchConfirmationData();
//   }, [router]);

//   if (!confirmationData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 flex flex-col items-center min-h-screen">
//       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 text-center w-full max-w-2xl">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">
//           Thanks a lot for Scheduling {confirmationData.serviceName} session with Mentor Name = {confirmationData.mentorName}
//         </h2>
//         <h1 className="text-xl font-bold text-gray-700 mb-4">Email sent kindly check your inbox</h1>
//         <div className="flex items-center justify-center mb-4">
//           <img src="/path/to/mentor-image.jpg" alt="Mentor" className="w-16 h-16 rounded-full mr-4" /> {/* Adjust image source */}
//           <div>
//             <p>You are meeting with</p>
//             <p className="font-semibold">{confirmationData.mentorName}</p>
//           </div>
//         </div>
//         <div className="flex items-center justify-center mb-4">
//           <svg className="w-6 h-6 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12 1C5.373 1 0 6.373 0 12s5.373 11 12 11 12-5.373 12-11S18.627 1 12 1zm0 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
//           </svg>
//           <p>{confirmationData.meetingTime}</p>
//         </div>
//         <div className="flex items-center justify-center mb-4">
//           <svg className="w-6 h-6 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M19 3h-3.586l-1.707-1.707c-.265-.265-.617-.293-.895-.293s-.63.028-.895.293L8.586 3H5c-1.104 0-2 .896-2 2v14c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V5c0-1.104-.896-2-2-2zm0 16H5V5h2.586l1.707 1.707c.265.265.617.293.895.293s.63-.028.895-.293L14.414 5H19v14z" />
//           </svg>
//           <p>We have sent you an email with complete details of this meeting and guidance to follow</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationPage;



// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const ConfirmationPage = () => {
//   const [confirmationData, setConfirmationData] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const serviceName = params.get('serviceName');
//     const mentorName = params.get('mentorName');
//     const meetingTime = params.get('meetingTime');
//     const customerEmail = params.get('customerEmail');
    
//     // Log to verify the parameters
//     console.log('serviceName:', serviceName);
//     console.log('mentorName:', mentorName);
//     console.log('meetingTime:', meetingTime);
//     console.log('customerEmail:', customerEmail);

//     if (serviceName && mentorName && meetingTime && customerEmail) {
//       setConfirmationData({
//         serviceName,
//         mentorName,
//         meetingTime: new Date(meetingTime).toLocaleString(),
//         customerEmail,
//       });
//     } else {
//       console.error('Missing Parameters');
//       router.push('/'); // Redirect to homepage if any data is missing
//     }
//   }, [router]);

//   if (!confirmationData) return <div>Loading...</div>;

//   return (
//     <div className="justify-center container mx-auto p-4 flex flex-col items-center min-h-screen">
//       <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 text-center w-full max-w-2xl">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">
//           Thanks for Scheduling a {confirmationData.serviceName} session with {confirmationData.mentorName}
//         </h2>
//         <h1 className="text-3xl font-semibold mb-4">Please check your inbox for the email confirmation.</h1>

//         <div className="flex justify-center items-center mb-4">
//           <img src="/mentor.jpeg" alt="Mentor" className="w-16 h-16 rounded-full mr-4" />
//           <div className="text-left">
//             <p>You are meeting with:</p>
//             <h3 className="text-xl font-semibold">{confirmationData.mentorName}</h3>
//             <p className="text-gray-600">{confirmationData.customerEmail}</p>
//           </div>
//         </div>

//         <div className="flex items-center justify-center mb-4">
//           <span className="mr-2">📅</span>
//           <p>{confirmationData.meetingTime}</p>
//         </div>

//         <p className="text-gray-600">
//           We have sent you an email with complete details of this meeting and guidance to follow.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ConfirmationPage;

