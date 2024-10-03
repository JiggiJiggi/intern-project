// src/RouterHandler.jsx

import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary"; // Import the ErrorBoundary

// Lazy load components
const Home = lazy(() => import("./components/Home"));
const Login = lazy(() => import("./components/Auth/Login"));
const Register = lazy(() => import("./components/Auth/Register"));
const ForgotPassword = lazy(() => import("./components/Auth/ForgotPassword"));
const Ebook = lazy(() => import("./components/Ebook"));
const NotFound = lazy(() => import("./components/NotFound"));
const VideoCall = lazy(() => import("./components/Communication/VideoCall"));

const RouterHandler = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/ebook" element={<Ebook />} />
            <Route path="/meeting/*" element={<VideoCall />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default RouterHandler;
