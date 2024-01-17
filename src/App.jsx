import React, { Suspense, lazy, useEffect, useState } from "react";
import Hero from "./components/Hero";
import Navbar from "./Layouts/Navbar";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Aos from "aos";
import "aos/dist/aos.css";
import Loading from "./components/Loading";
const Projects = lazy(() => import("./components/Projects"));
// const OpenSource = lazy(() => import("./components/OpenSource"));
import Experience from "./components/Experience";

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    Aos.init({
      duration: 1800,
      offset: 100,
      disable: "mobile",
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="overflow-hidden">
        <div
          className={`sm:px-16 px-6 flex justify-center items-center ${
            scrolled ? "bg-gray-100 shadow-md fixed top-0 w-full z-10" : ""
          }`}
        >
          <Navbar />
        </div>

        <div className={`flex justify-center items-start w-full`}>
          <Hero />
        </div>
        <div className="bg-secondaryLinear pb-5">
          <Skills />
          <Experience />
        </div>
        <Education />
        <Projects />
        {/* <OpenSource /> */}
        <Footer />
      </div>

      {showTopBtn && (
        <button
        onClick={goToTop}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          height: '50px',
          width: '50px',
          fontSize: '24px',
          borderRadius: '50%',
          backgroundColor: '#007bff', // Example background color
          color: 'white', // Text color
          textAlign: 'center',
          lineHeight: '50px', // Vertically center the arrow
          zIndex: 1000,
          border: 'none', // Remove default border
          cursor: 'pointer', // Change cursor on hover
          boxShadow: '0px 2px 5px rgba(0,0,0,0.3)' // Optional shadow for better visibility
        }}
        >
          ↑
        </button>
      )}
    </Suspense>
  );
};

export default App;
