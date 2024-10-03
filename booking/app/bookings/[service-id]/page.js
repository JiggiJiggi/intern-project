"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { daySlots } from "@/data/daySlots";
// import CheckoutButton from "@/components/CheckoutButton"; // Ensure correct import path

const services = {
  resume_review: {
    title: "20 min Resume Review",
    description: "Schedule a review of your resume",
    duration: 20,
    price: 20, 
    price_id: "price_1PlnGUByXuOVJNaus5FgIfhn", 
  },
  mock_interview: {
    title: "30 min Mock Interview",
    description: "Practice for your upcoming interview",
    duration: 30,
    price: 25,
    price_id: "price_1PlnGyByXuOVJNauBaJe0FB9", 
  },
  career_guidance: {
    title: "Career Guidance",
    description: "Get advice on your career path",
    duration: 30,
    price: 30,
    price_id: "price_1PlnHtByXuOVJNauC2tAgNya", 
  },
  coaching_session: {
    title: "1 hour Coaching Session",
    description: "In-depth coaching session",
    duration: 60,
    price: 20,
    price_id: "price_1PlnIJByXuOVJNauXuztxf8U", 
  },
};

const getCurrentWeek = () => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const pastDaysOfYear = (currentDate - startOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};

const BookingPage = () => {
  const router = useRouter();
  const params = useParams();
  const serviceId = params["service-id"];

  const [service, setService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    if (serviceId) {
      setService(services[serviceId]);
    }
  }, [serviceId]);

  useEffect(() => {
    const storedBookedSlots = localStorage.getItem("bookedSlots");
    let parsedBookedSlots = {};

    if (storedBookedSlots) {
      try {
        parsedBookedSlots = JSON.parse(storedBookedSlots);
      } catch (error) {
        console.error("Error parsing booked slots from localStorage:", error);
      }
    }

    setBookedSlots(parsedBookedSlots);
  }, []);

  useEffect(() => {
    const currentWeek = getCurrentWeek();
    const storedWeek = parseInt(localStorage.getItem("currentWeek"), 10);

    if (storedWeek !== currentWeek) {
      localStorage.setItem("currentWeek", currentWeek);
      localStorage.removeItem("bookedSlots");
      setBookedSlots({});
    } else {
      const savedBookedSlots = JSON.parse(localStorage.getItem("bookedSlots")) || {};
      setBookedSlots(savedBookedSlots);
    }
  }, []);

  useEffect(() => {
    if (selectedDate && service) {
      const dayOfWeek = new Date(
        selectedDate.year,
        selectedDate.month - 1,
        selectedDate.day
      ).toLocaleDateString("en-US", { weekday: "long" });
      const slots = generateSlots(daySlots[dayOfWeek], service?.duration ?? 0);
      setAvailableSlots(
        slots.map((slot, index) => ({
          id: index,
          startTime: slot.startTime,
          endTime: slot.endTime,
          color: bookedSlots[
            `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`
          ]?.includes(slot.startTime)
            ? "red"
            : "green",
          title: "Available Slot",
          selected: false,
        }))
      );
    }
  }, [selectedDate, bookedSlots, service]);

  const handleDateSelect = (date) => {
    const today = new Date();
    const selected = new Date(date.year, date.month - 1, date.day);

    if (selected < today.setHours(0, 0, 0, 0)) {
      alert("Cannot book a past date. Please select a valid date.");
      return;
    }

    setSelectedDate(date);
  };

  const generateSlots = (slots, duration) => {
    if (!slots) return [];

    const result = [];
    const durationInMs = duration * 60 * 1000;
    slots.forEach((time) => {
      let [hours, minutes] = time.split(":");
      let period = minutes.slice(-2);
      minutes = minutes.slice(0, -2);
      if (period === "PM" && hours !== "12") hours = parseInt(hours) + 12;
      const startTime = new Date();
      startTime.setHours(hours, minutes, 0, 0);
      const endTime = new Date(startTime.getTime() + durationInMs);
      result.push({
        startTime: startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        endTime: endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
    });
    return result;
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setAvailableSlots(
      availableSlots.map((s) =>
        s.id === slot.id ? { ...s, selected: true } : { ...s, selected: false }
      )
    );
  };

  const handleBookingConfirmation = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select a slot.");
      return;
    }

    const formattedDate = `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`;
    const today = new Date();
    const selected = new Date(
      selectedDate.year,
      selectedDate.month - 1,
      selectedDate.day
    );

    if (selected < today.setHours(0, 0, 0, 0)) {
      alert("Cannot book a past date. Please select a valid date.");
      return;
    }

    if (
      bookedSlots[formattedDate] &&
      bookedSlots[formattedDate].includes(selectedSlot.startTime)
    ) {
      alert("This slot is already booked.");
      return;
    }

    const updatedSlots = {
      ...bookedSlots,
      [formattedDate]: [
        ...(bookedSlots[formattedDate] || []),
        selectedSlot.startTime,
      ],
    };

    localStorage.setItem("bookedSlots", JSON.stringify(updatedSlots));
    setBookedSlots(updatedSlots);

    // router.push(
    //   `/order-summary?serviceName=${encodeURIComponent(service.title)}&meetingTime=${encodeURIComponent(`${formattedDate} ${selectedSlot.startTime}`)}&price=${encodeURIComponent(service.price || 0)}&price_id=${encodeURIComponent(service.price_id)}`
    // );
    router.push(
      `/order-summary?serviceName=${encodeURIComponent(service.title)}&meetingTime=${encodeURIComponent(`${formattedDate} ${selectedSlot.startTime}`)}&price=${encodeURIComponent(service.price || 0)}&price_id=${encodeURIComponent(service.price_id)}`
    );
    
    
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center min-h-screen">
      {!service ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 text-center w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {service.title || "Service Not Found"}
          </h1>
          <p className="text-gray-700 mb-2">{service.duration} min</p>
          <p className="text-gray-600 mb-4">{service.description}</p>

          <div className="mb-4 flex justify-center">
            <Calendar
              value={selectedDate}
              onChange={handleDateSelect}
              shouldHighlightWeekends
              className="calendar-container"
            />
          </div>

          {selectedDate && (
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Available slots on{" "}
                {new Date(
                  selectedDate.year,
                  selectedDate.month - 1,
                  selectedDate.day
                ).toDateString()}
                :
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.length === 0 ? (
                  <p className="text-gray-600">No available slots</p>
                ) : (
                  availableSlots.map((slot) => (
                    <button
                      key={slot.startTime}
                      className={`p-2 rounded transition ${
                        slot.selected
                          ? "bg-blue-500 text-white"
                          : slot.color === "red"
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                      onClick={() => handleSlotClick(slot)}
                    >
                      {slot.startTime} - {slot.endTime}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleBookingConfirmation}
          >
            Schedule
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;

