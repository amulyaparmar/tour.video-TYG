"use client"
import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

const FloatingVideo = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showLivingOptions, setShowLivingOptions] = useState(false);

  useEffect(() => {
    const firstLoadTimer = setTimeout(() => {
      setIsFirstLoad(false);
      setTimeout(() => {
        setIsMinimized(false);
      }, 1400);
    }, 1500);

    return () => clearTimeout(firstLoadTimer);
  }, []);

  const communities = [
    {
      name: "Cedar Creek of Bedford",
      location: "Bedford, IN",
      type: "Assisted Living",
      startingPrice: "$3,275",
      url: "https://www.cedarhurstliving.com/cedar-creek-bedford-in"
    },
    {
      name: "Cedar Creek of Nicholasville",
      location: "Bloomington, IN", 
      type: "Assisted Living",
      startingPrice: "$3,495",
      url: "https://www.cedarhurstliving.com/cedar-creek-bloomington-in-al"
    },
    {
      name: "Cedar Creek of Nicholasville Memory Care",
      location: "Bloomington, IN",
      type: "Memory Care",
      startingPrice: "$4,500",
      url: "https://www.cedarhurstliving.com/cedar-creek-bloomington-in-mc"
    },
    {
      name: "Cedar Creek of Fort Wayne",
      location: "Fort Wayne, IN",
      type: "Assisted Living", 
      startingPrice: "$2,950",
      url: "https://www.cedarhurstliving.com/cedar-creek-fort-wayne-in"
    }
  ];

  const SearchResultsSection = () => (
    <div className="space-y-2">
      <p className="text-sm text-gray-500 font-medium">{communities.length} communities found:</p>
      <div className="space-y-2">
        {communities.map((community, index) => (
          <a 
            key={index}
            href={community.url}
            target="_blank"
            rel="noopener noreferrer" 
            className="w-full bg-white hover:bg-gray-50 text-left px-3 py-2.5 rounded-lg 
                      flex items-center justify-between group transition-all duration-300
                      border border-gray-200"
          >
            <div>
              <span className="font-medium text-sm block">{community.name}</span>
              <span className="text-xs text-gray-500">
                {community.type} | Starting at {community.startingPrice}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </a>
        ))}
      </div>
    </div>
  );

  const handleSearch = () => {
    setShowSearchResults(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isFirstLoad ? (
        <div
          style={{ width: '60px', height: '60px', borderRadius: '15px' }}
          className="bg-[#00905e] p-3 flex items-center justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-white rounded-full"></div>
            <img 
              src="https://www.cedarhurstliving.com/hs-fs/hubfs/cedarhurst-Tree-icon%20copy.png?width=108&height=108"
              alt="Cedarhurst Tree"
              className="w-6 h-6 relative z-10 object-contain transition-all"
              style={{ minWidth: '24px', minHeight: '24px' }}
            />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white z-20"></div>
          </div>
        </div>
      ) : (
        <div
          style={{
            maxHeight: isMinimized ? '60px' : '1000px',
            width: isFirstLoad ? '60px' : '360px',
            transition: 'width 0.6s cubic-bezier(0.76, 0, 0.24, 1), max-height 1.2s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#00905e] p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative justify-center align-center mb-2 mr-[4px] mt-1 ml-1">
                <div className="absolute -inset-1 bg-white rounded-full"></div>
                <img 
                  src="https://www.cedarhurstliving.com/hs-fs/hubfs/cedarhurst-Tree-icon%20copy.png?width=108&height=108"
                  alt="Cedarhurst Tree"
                  className="w-6 h-6 relative z-10 object-contain transition-all"
                  style={{ minWidth: '24px', minHeight: '24px' }}
                />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white z-20"></div>
              </div>
              <div>
                <h3 className="text-white font-medium text-sm transition-all">Welcome Assistant</h3>
                <p className="text-green-100 truncate transition-all">Cedarhurst Senior Living</p>
              </div>
            </div>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          <div
            className={`transform transition-all duration-500 ease-in-out ${
              isMinimized ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {/* Assistant Message */}
            <div className="p-3 bg-gray-50">
              <div className="bg-gray-100 rounded-xl p-2.5 text-gray-600 text-sm">
                How can I help you today?
              </div>
            </div>

            {/* Main Content */}
            <div className="p-3">
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-1">Come visit us!</h2>
                    <p className="text-gray-600 text-sm">
                      The best way to experience our community is in person. We would love to have
                      you!
                    </p>
                  </div>
                  <div className="relative w-16 h-10 ml-1">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces"
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-white z-20"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=faces"
                      className="absolute bottom-0 right-[-4px] w-6 h-6 rounded-full border-2 border-white z-10"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&crop=faces"
                      className="absolute bottom-0 left-[-4px] w-6 h-6 rounded-full border-2 border-white z-10"
                    />
                  </div>
                </div>

                {/* Video Player */}
                <div className="w-full h-[160px] bg-black rounded-lg mb-3 overflow-hidden">
                  <video
                    src="https://www.cedarhurstliving.com/hubfs/Cedarhurst%20Videos/Custom%20Videos/Cedarhurst%20Communities%20in%20Action%20video.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>

                {/* Action Buttons */}
                <div className="space-y-1.5">
                  <button 
                    onClick={() => window.open('https://www.cedarhurstliving.com/where-to-start', '_blank')}
                    className="w-full bg-[#00905e] hover:bg-[#007a4f] text-white px-3 py-2.5 rounded-lg 
                              flex items-center justify-between group transition-all duration-300"
                  >
                    <span className="font-medium text-sm">Looking for Senior Care? Start here!</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button 
                    onClick={() => window.open('https://www.cedarhurstliving.com/careers', '_blank')}
                    className="w-full bg-white hover:bg-gray-50 text-gray-800 px-3 py-2.5 rounded-lg 
                              flex items-center justify-between group transition-all duration-300
                              border border-gray-200"
                  >
                    <span className="font-medium text-sm">Careers</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button 
                    onClick={() => setShowLivingOptions(!showLivingOptions)}
                    className="w-full bg-white hover:bg-gray-50 text-gray-800 px-3 py-2.5 rounded-lg 
                              flex items-center justify-between group transition-all duration-300
                              border border-gray-200"
                  >
                    <span className="font-medium text-sm">Find a Community</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Living Options Cards */}
                  {showLivingOptions && (
                    <div className="mt-6 -mx-3 ml-2">
                      <div className="flex overflow-x-auto gap-4 px-3 pb-4 snap-x">
                        {/* Independent Living Card */}
                 
                        <div className="flex-shrink-0 w-[250px] group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 snap-start hover:shadow-xl transition-all duration-300">
                          <div className="h-[175px] relative overflow-hidden">
                            <img 
                              src="https://www.cedarhurstliving.com/hs-fs/hubfs/21_Website/Assessing%20the%20lifestyle%20options-Senior%20Women%20and%20chef.jpeg?width=4242&height=4242" 
                              alt="Independent Living"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 right-3">
                              <div className="p-2 bg-white/90 backdrop-blur rounded-full transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                <ArrowRight className="w-4 h-4 text-gray-600" />
                              </div>
                            </div>
                          </div>
                          <div className="p-4 relative">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#00905e] transition-colors">Independent Living</h3>
                            <p className="mt-1 text-sm text-gray-600">Support with daily activities while maintaining independence.</p>
                          </div>
                        </div>


                        {/* Assisted Living Card */}
                        <div className="flex-shrink-0 w-[250px] group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 snap-start hover:shadow-xl transition-all duration-300">
                          <div className="h-[175px] relative overflow-hidden">
                            <img 
                              src="https://www.cedarhurstliving.com/hs-fs/hubfs/21_Website/Darcie%20Uploads/Pekin__Homepage_WhatComesNext_FriendlyStaff-1.jpeg?width=1000&height=1000"
                              alt="Assisted Living"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 right-3">
                              <div className="p-2 bg-white/90 backdrop-blur rounded-full transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                <ArrowRight className="w-4 h-4 text-gray-600" />
                              </div>
                            </div>
                          </div>
                          <div className="p-4 relative">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#00905e] transition-colors">Assisted Living</h3>
                            <p className="mt-1 text-sm text-gray-600">Support with daily activities while maintaining independence.</p>
                          </div>
                        </div>

                        {/* Memory Care Card */}
                        <div className="flex-shrink-0 w-[250px] group bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 snap-start hover:shadow-xl transition-all duration-300">
                          <div className="h-[175px] relative overflow-hidden">
                            <img 
                              src="https://www.cedarhurstliving.com/hs-fs/hubfs/21_Website/Corporate_WhereToStart_HavingTheConversation_MotherDaughterHug.jpeg?width=2664&height=2666"
                              alt="Memory Care"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-3 right-3">
                              <div className="p-2 bg-white/90 backdrop-blur rounded-full transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                <ArrowRight className="w-4 h-4 text-gray-600" />
                              </div>
                            </div>
                          </div>
                          <div className="p-4 relative">
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#00905e] transition-colors">Memory Care</h3>
                            <p className="mt-1 text-sm text-gray-600">Specialized care and support for seniors with memory-related conditions.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mt-2.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter ZIP code, City, or County"
                      defaultValue="48307"
                      className="flex-1 bg-white text-gray-800 px-3 py-2.5 rounded-lg 
                                border border-gray-200 text-sm font-medium"
                    />
                    <button 
                      onClick={handleSearch}
                      className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-2.5 rounded-lg 
                                flex items-center gap-2 group transition-all duration-300
                                border border-gray-200"
                    >
                      <span className="font-medium text-sm">Search</span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {showSearchResults && <SearchResultsSection />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingVideo;

