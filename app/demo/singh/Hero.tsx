"use client"
import React from 'react';
import { Heart, Home, Phone, Users } from 'lucide-react';

// Add new Navbar component
const Navbar = () => {
  return (
    <nav className="bg-[#00905e] text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* <img 
          src="https://www.cedarhurstliving.com/hubfs/Cedarhurst%202021%20Theme/Images/main-header-logo.svg" 
          alt="Cedarhurst Logo" 
          className="h-12"
        /> */}
        <div className="flex gap-6 justify-center ">
          <a href="#" className="hover:text-slate-200">Where to Start</a>
          <a href="#" className="hover:text-slate-200">Why Waltonwood</a>
          <a href="#" className="hover:text-slate-200">Care Services</a>
          <a href="#" className="hover:text-slate-200">Education Center</a>
          <a href="#" className="hover:text-slate-200">Careers</a>
          <button className="bg-white text-[#00905e] px-4 py-2 rounded-md font-medium">
            FIND A COMMUNITY
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <>
      <Navbar />
      <div className="relative min-h-[70vh] bg-white">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url("https://www.Cedarhurstofnorthville.com/wp-content/uploads/2021/11/Screen-Shot-2021-11-30-at-10.37.16-AM.png")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 to-slate-800/75"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Welcome to Waltonwood at Cherry Hill
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-100">
              Where luxury meets compassionate care, creating a vibrant community for active seniors to thrive and enjoy life to the fullest.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-slate-100">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-slate-300" />
                <div>
                  <h3 className="font-semibold">24/7 Care</h3>
                  <p className="text-sm">Professional support always available</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-slate-300" />
                <div>
                  <h3 className="font-semibold">Vibrant Community</h3>
                  <p className="text-sm">Active social calendar & events</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Home className="w-8 h-8 text-slate-300" />
                <div>
                  <h3 className="font-semibold">Luxury Living</h3>
                  <p className="text-sm">Modern amenities & comfort</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;