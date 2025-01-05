"use client"
import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

const FloatingVideo = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const firstLoadTimer = setTimeout(() => {
      setIsFirstLoad(false);
      setTimeout(() => {
        setIsMinimized(false);
      }, 1400);
    }, 1500);

    return () => clearTimeout(firstLoadTimer);
  }, []);

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
              src="https://g5-assets-cld-res.cloudinary.com/image/upload/q_auto,f_auto,c_fill,g_center,h_585,w_982/v1556561997/g5/g5-c-iqbdd1ah-singh-senior-living-client/g5-cl-57b5pmkr1-waltonwood-at-cherry-hill/uploads/WW_Cherry_Hill_18_oequci.png"
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
                  src="https://g5-assets-cld-res.cloudinary.com/image/upload/q_auto,f_auto,c_fill,g_center,h_585,w_982/v1556561997/g5/g5-c-iqbdd1ah-singh-senior-living-client/g5-cl-57b5pmkr1-waltonwood-at-cherry-hill/uploads/WW_Cherry_Hill_18_oequci.png"
                  alt="Cedarhurst Tree"
                  className="w-6 h-6 relative z-10 object-contain transition-all"
                  style={{ minWidth: '24px', minHeight: '24px' }}
                />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white z-20"></div>
              </div>
              <div>
                <h3 className="text-white font-medium text-sm transition-all">Community Assistant</h3>
                <p className="text-green-100 truncate transition-all">Waltonwood at Cherry Hill Senior Living</p>
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
                  <button className="w-full bg-[#00905e] hover:bg-[#007a4f] text-white px-3 py-2.5 rounded-lg 
                                  flex items-center justify-between group transition-all duration-300">
                    <span className="font-medium text-sm">Schedule A Visit</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button className="w-full bg-white hover:bg-gray-50 text-gray-800 px-3 py-2.5 rounded-lg 
                                  flex items-center justify-between group transition-all duration-300
                                  border border-gray-200">
                    <span className="font-medium text-sm">Pricing</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button className="w-full bg-white hover:bg-gray-50 text-gray-800 px-3 py-2.5 rounded-lg 
                                  flex items-center justify-between group transition-all duration-300
                                  border border-gray-200">
                    <span className="font-medium text-sm">Ask A Question</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button className="w-full bg-white hover:bg-gray-50 text-gray-800 px-3 py-2.5 rounded-lg 
                                  flex items-center justify-between group transition-all duration-300
                                  border border-gray-200">
                    <span className="font-medium text-sm">View Community</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button className="w-full bg-white hover:bg-gray-50 text-gray-800 px-3 py-2.5 rounded-lg 
                                  flex items-center justify-between group transition-all duration-300
                                  border border-gray-200">
                    <span className="font-medium text-sm">View Virtual Tours</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </button>
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
