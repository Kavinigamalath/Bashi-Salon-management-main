import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import homebg from '../images/home1.jpg';
import './Home.css'; 
import Card from './HomeCard/Hcard';
import Footer from './footer/Footer';
import Logo from '../images/logo.png';

const Home = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const sections = ['about', 'products'];
      const positions = sections.reduce((acc, section) => {
        acc[section] = document.getElementById(section)?.offsetTop || 0;
        return acc;
      }, {});

      if (scrollPos >= positions.about && scrollPos < positions.products) {
        setSelectedLink('about');
      } else if (scrollPos >= positions.products) {
        setSelectedLink('products');
      } else {
        setSelectedLink('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (event, sectionId) => {
    event.preventDefault();
    if (sectionId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      const target = document.getElementById(sectionId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleMenuToggle = () => {
    setMenuOpen(prev => !prev);
  };

  const handleButtonPress = (event) => {
    setButtonPressed(event.type === 'mousedown');
  };

  return (
    <div>
      <div className="min-h-screen text-white flex flex-col items-center">
        <div className="fixed top-0 left-0 right-0 bg-gray-100 z-50 flex justify-between items-center p-4 md:hidden">
          <div
            className="text-pink-500 text-4xl cursor-pointer"
            onClick={handleMenuToggle}
          >
            &#9776;
          </div>
          <div
            className={`absolute top-0 left-0 right-0 bg-gray-800 p-4 ${isMenuOpen ? 'block' : 'hidden'}`}
          >
            <ul>
              {['home', 'about', 'products'].map((section) => (
                <li
                  key={section}
                  className={classNames('py-2', {
                    'text-pink-500': selectedLink === section,
                    'text-gray-400': selectedLink !== section
                  })}
                >
                  <a
                    href={`#${section}`}
                    onClick={(e) => handleSmoothScroll(e, section)}
                  >
                    {section.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="fixed top-0 left-0 right-0 bg-gray-200 text-gray-600 z-50 hidden md:flex justify-between items-center p-4">
          <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img 
              src={Logo} 
              alt="logo" 
              style={{ width: '30px', height: '30px', borderRadius: '50%' }} 
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-">Bashi</span>
          </a>
          <ul className="flex space-x-8 py-4">
            {['home', 'about', 'products'].map((section) => (
              <li
                key={section}
                className={classNames('hover:text-pink-500', {
                  'text-pink-500': selectedLink === section
                })}
              >
                <a
                  href={`#${section}`}
                  onClick={(e) => handleSmoothScroll(e, section)}
                >
                  {section.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
          <a href="/clogin" className="text-pink-500 font-semibold hover:underline">Login</a>
        </div>

        <div className="text-center pt-32 pb-16 min-h-screen min-w-[100%]" style={{ 
          backgroundImage: `url(${homebg})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center'
        }}>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-3/5 border-t border-pink-500"></div>
            <div className="text-white text-6xl font-light tracking-widest animate-fadeIn">PANNIPITIYA</div>
            <div className="w-3/5 border-t border-pink-500"></div>
          </div>
          <h1 className="text-white text-9xl font-light my-8 animate-slideIn">CUT &#8216;N&#8217; CURL</h1>
          <h2 className="text-pink-500 text-6xl font-light tracking-wide animate-bounce">BASHI BRIDAL BEAUTY SALON</h2>
        </div>

        <div id="about" className="relative bg-white py-16 px-8 md:px-16 min-h-screen animate-fadeIn">
        <div className="relative bg-gradient-to-r from-white to-gray-50 py-16 px-8 md:px-16 min-h-screen rounded-lg shadow-lg overflow-hidden animate-fadeIn">
  {/* Decorative Elements */}
  <div className="absolute -top-10 -left-20 w-48 h-48 bg-pink-200 rounded-full filter blur-3xl opacity-40 animate-float"></div>
  <div className="absolute bottom-10 right-20 w-64 h-64 bg-pink-300 rounded-full filter blur-2xl opacity-30 animate-pulse"></div>

  <div className="flex flex-col md:flex-row items-center md:space-x-10">
    <div className="md:w-1/2">
      <h3 className="text-4xl font-semibold mb-4 text-gray-800 tracking-tight animate-fadeIn">
        Who We <span className="text-pink-600">Are</span>
      </h3>
      <p className="text-pink-600 italic font-bold mb-4 animate-fadeIn text-lg">
        Your ultimate destination for bridal dressing and beauty services, offering hair treatments, threading, hair coloring, and professional make-up.
      </p>
      <p className="text-lg mb-4 text-gray-700 animate-fadeIn leading-relaxed">
        Our comprehensive hair care services include straightening, perming, rebonding, and stylish haircuts for both ladies and children. Plus, indulge in our luxurious manicures, pedicures, and relaxing treatments to complete your look.
      </p>
      <p className="text-lg text-gray-700 animate-fadeIn leading-relaxed">
        Owned by P.K. Damayanthi, Salon Bashi is conveniently located at No. 119/11/1, 2nd Lane, Niyadagala, Pannipitiya. For appointments, call us at <span className="font-semibold text-pink-500">071 99 30 835</span>.
      </p>
    </div>
    <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
      <img
        className="rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out animate-zoomIn"
        src="https://img.freepik.com/free-photo/blonde-girl-getting-her-hair-done_23-2148108815.jpg?t=st=1726182810~exp=1726186410~hmac=f44fb3f0190e661fa27c18e1f8c9a4a211bd6616141045056d2393d89d818416&w=996"
        alt="Team"
      />
    </div>
  </div>
</div>

        </div>

        <div id="products" className="bg-gradient-to-t from-gray-900 to-gray-600py-16 px-8 md:px-16 min-h-screen w-[100%] animate-fadeIn rounded-t-[10%] ">
        <h2 className="text-6xl font-extrabold text-center mb-10 text-gray-800 tracking-tight leading-snug animate-bounce">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 ">BEAUTY</span> PRODUCTS <span className="text-pink-500">STALL</span>
        </h2>
          <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
            <Card />
          </div>
           {/* Animated Divider */}
  <div className="w-full flex justify-center mt-12">
    <hr className="w-1/2 border-t-2 border-pink-300 animate-glow" />
  </div>

  {/* Interactive Call to Action */}
  <div className="ml-4">
  <div className="flex justify-center mt-16">
    <a className="relative z-10 bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white font-bold py-4 px-10 rounded-full shadow-lg tracking-wider transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-2xl">
    Premium value, budget-friendly prices!
      <span className="absolute inset-0 w-full h-full bg-pink-800 opacity-0 transition-opacity duration-300 rounded-full hover:opacity-20"></span>
    </a>
  </div>
  <center>**********</center>
  </div>

  {/* Bottom Floating Decorative Element */}
  <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-400 rounded-full filter blur-2xl opacity-30 animate-float-slow"></div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
