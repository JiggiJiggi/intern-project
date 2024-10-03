"use client"
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs'; // Example with Clerk
import Navbar from '../components/Navbar';
import MentorInfo from '../components/MentorInfo';
import BookingBoxes from '../components/BookingBoxes';

const HomePage = () => {
  const router = useRouter();
  const { isSignedIn } = useUser(); // Check if the user is signed in

  useEffect(() => {
    if (!isSignedIn) {
      // Redirect to the sign-up page if not signed in
      router.push('/sign-up');
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    // Optionally render a loading state or null while redirecting
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
    <Navbar />
    <div className="flex-grow container mx-auto py-12 px-4 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start">
      <div className="w-full lg:w-1/3 mb-8 lg:mb-0 lg:mr-3">
        <MentorInfo />
      </div>
      <div className="w-full lg:w-2/3">
        <BookingBoxes />
      </div>
    </div>
  </div>
  );
};

export default HomePage;
