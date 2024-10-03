import React from 'react';
import './Home.css'; // Importing the CSS file
import logo from '../assets/logo.png';
import Footer from './Footer';
import serviceImage1 from '../assets/serviceImage1.png'; // Mock Interview Practice
import serviceImage2 from '../assets/serviceImage2.png'; // Expert Mentorship
import serviceImage3 from '../assets/serviceImage3.png'; // Resume Review
import serviceImage4 from '../assets/serviceImage4.png'; // Career Guidance
import serviceImage5 from '../assets/serviceImage5.png'; // E-book Guide
import testimonial1 from '../assets/testimonial1.png'; // Brandon Vega
import testimonial2 from '../assets/testimonial2.png'; // Chris Wei
import testimonial3 from '../assets/testimonial3.png'; // Karen Weiss

const Home = () => {
  const handleBookMentorship = () => {
    // Redirect to the calendar microservice
    window.open('http://localhost:3000', '_blank');
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="CrackInterview" />
        </div>
        <nav className="nav">
          <a href="/ebook" className="nav-item">Ebook</a>
          <a href="/meeting" className="nav-item">Meetings</a>
          <a href="/login" className="nav-item">Login</a>
          <button className="sign-up-button">
            <a href="/register">Get Started</a>
          </button>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Unlock Your Potential with Personalized Learning Paths</h1>
          <p>Start your journey to becoming an expert in your field with real-world projects, mentors, and certifications.</p>
          <button className="cta-button" onClick={handleBookMentorship}>Book 1-1 Meeting</button>
        </div>
      </section>

      <section className="services" id="services">
        <h2>Our Services</h2>
        <div className="service-list">
          <div className="service-card">
            <h3>Personalized Learning Paths</h3>
            <p>Tailor your learning experience to fit your needs and career goals.</p>
          </div>
          <div className="service-card">
            <h3>Project-Based Learning</h3>
            <p>Gain hands-on experience with projects designed by industry experts.</p>
          </div>
          <div className="service-card">
            <h3>Mentorship</h3>
            <p>Work with mentors to guide you throughout your learning journey.</p>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <h2>Our Services</h2>
        <div className="service-list">
          <div className="service-card">
            <img src={serviceImage1} alt="Mock Interview Practice" />
            <h3>Mock Interview Practice</h3>
            <p>Sharpen your interview skills with multiple rounds of mock interviews.</p>
          </div>
          <div className="service-card">
            <img src={serviceImage2} alt="Expert Mentorship" />
            <h3>Expert Mentorship</h3>
            <p>Unlock your potential with personalized mentorship from industry experts.</p>
          </div>
          <div className="service-card">
            <img src={serviceImage3} alt="Resume Review" />
            <h3>Resume Review</h3>
            <p>Our resume review service ensures your resume highlights your strengths and achievements effectively and makes you unique.</p>
          </div>
          <div className="service-card">
            <img src={serviceImage4} alt="Career Guidance" />
            <h3>Career Guidance</h3>
            <p>Whether you’re seeking a new direction, looking to advance, or making a career change, we provide the tools and advice to help you succeed.</p>
          </div>
          <div className="service-card">
            <img src={serviceImage5} alt="Comprehensive E-book Guide to SpringBoot" />
            <h3>Comprehensive E-book Guide To SpringBoot</h3>
            <p>Learn more about SpringBoot through our comprehensive e-book and boost your confidence to answer subsequent interview questions.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Students Say</h2>
        <div className="testimonial-card">
          <p>"This platform transformed my career! The mentors were amazing."</p>
          <strong>- John Doe, Software Engineer</strong>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <p>What some recent clients say about their experience with CrackInterview</p>
        <div className="testimonial-list">
          <div className="testimonial-card">
            <img src={testimonial1} alt="Brandon Vega" className="testimonial-img" />
            <p>I was really impressed with the way CrackInterview handled everything. From the first conversation to everything in between, they were very helpful and knowledgeable.</p>
            <strong>Brandon Vega</strong>
            <span>Operations Lead, General Entropy</span>
          </div>
          <div className="testimonial-card">
            <img src={testimonial2} alt="Chris Wei" className="testimonial-img" />
            <p>CrackInterview was the missing piece to my puzzle. From start to finish, they solved every problem and helped us achieve our goals in the most professional way possible.</p>
            <strong>Chris Wei</strong>
            <span>Founder and CEO, Fair Market Barn</span>
          </div>
          <div className="testimonial-card">
            <img src={testimonial3} alt="Karen Weiss" className="testimonial-img" />
            <p>Using CrackInterview helped me save weeks of work. Their delightful level of quality and service is consistent and one of a kind. I can't recommend CrackInterview enough.</p>
            <strong>Karen Weiss</strong>
            <span>Technical Director, Business Associates LLC</span>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
