"use client"; 

import React, { useState } from 'react';

const AdminPage = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleAddSlot = async () => {
    try {
      const response = await fetch('/api/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startTime, endTime }),
      });

      const data = await response.json();
      console.log('Response Data:', data); // Log the response
      if (response.ok) {
        alert('Time slot added!');
        setStartTime('');
        setEndTime('');
      } else {
        alert('Failed to add time slot: ' + data.error);
      }
    } catch (error) {
      console.error('Error adding time slot:', error);
      alert('Failed to add time slot: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Available Time Slot</h1>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="text-lg font-semibold mb-2">Start Time:</span>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border border-gray-300 rounded p-2"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-lg font-semibold mb-2">End Time:</span>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border border-gray-300 rounded p-2"
          />
        </label>
        <button
          onClick={handleAddSlot}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Slot
        </button>
      </div>
    </div>
  );
};

export default AdminPage;






// "use client"; // Ensure this page is a client component

// import React, { useState } from 'react';

// const AdminPage = () => {
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');

//   const handleAddSlot = async () => {
//     try {
//       const response = await fetch('/api/slots', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ startTime, endTime }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         alert('Time slot added!');
//         setStartTime(''); // Clear inputs after success
//         setEndTime('');
//       } else {
//         alert('Failed to add time slot: ' + data.error);
//       }
//     } catch (error) {
//       console.error('Error adding time slot:', error);
//       alert('Failed to add time slot: ' + error.message);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 max-w-md">
//       <h1 className="text-2xl font-bold mb-4 text-center">Add Available Time Slot</h1>
//       <div className="flex flex-col gap-4">
//         <label className="flex flex-col">
//           <span className="text-lg font-semibold mb-2">Start Time:</span>
//           <input
//             type="datetime-local"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             className="border border-gray-300 rounded p-2"
//           />
//         </label>
//         <label className="flex flex-col">
//           <span className="text-lg font-semibold mb-2">End Time:</span>
//           <input
//             type="datetime-local"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//             className="border border-gray-300 rounded p-2"
//           />
//         </label>
//         <button
//           onClick={handleAddSlot}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Add Slot
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;
