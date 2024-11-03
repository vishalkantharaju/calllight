import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import nurse_background from './assets/nurse_background.svg'
import mic from './assets/mic.png'

function PatientPortal() {
  const nav = useNavigate();

  return (
    <div className="relative h-screen w-screen">
        <div className="relative flex items-center justify-end h-screen">

            {/* Background */}
             <div className="w-screen h-screen">
                <img src={nurse_background}/>
            </div>

            {/* Tab */}
            <div className="absolute top-4 md:top-8 left-36 md:left-64 flex flex-col items-start">
                <span className="text-white text-xl md:text-4xl font-bold">
                PATIENT NAME (BACKEND)
                </span>
                <div className="flex items-center space-x-16">
                    <span className="mt-[2rem] text-xs md:text-lg md:mt-[4.4rem] text-[#1C2A4D]  font-semibold">
                    Requests
                    </span>
                    <span className="mt-[2rem] text-xs md:text-lg md:mt-[4.4rem] text-[#1C2A4D]  font-semibold">
                    Your Providers
                    </span>
                    <span className="mt-[2rem] text-xs md:text-lg md:mt-[4.4rem] text-[#1C2A4D]  font-semibold">
                    Your Timeline
                    </span>
                </div>
                
            {/* Requests */}
            <span className="mt-8 text-[#1C2A4D] md:text-xl font-bold">
                Make a request:
            </span>
            <div className="mt-4 flex items-center space-x-16">
              <div className="flex flex-col items-center text-[#1C2A4D] text-sm">
                <span className="text-[#1C2A4D] text-sm">
                    English:
                </span>
                <button
                  className="mt-4"
                  style={{ border: 'none', background: 'transparent' }}>
                  <img src={mic} alt="Microphone" className="w-32 h-24" />
                </button>
              </div>
              <div className="flex flex-col items-center text-[#1C2A4D] text-sm">
                <span className="text-[#1C2A4D] text-sm">
                    Spanish:
                </span>
                <button
                  className="mt-4"
                  style={{ border: 'none', background: 'transparent' }}>
                  <img src={mic} alt="Microphone" className="w-32 h-24" />
                </button>
              </div>
            </div>
            <span className="mt-4 text-[#1C2A4D] text-lg md:text-xl font-bold">
                Quick requests:
            </span>
            <button className="mt-4 bg-[#1C2A4D] hover:bg-red-700 text-white text-sm py-2 w-24 rounded">
                Water
            </button>
            <button className="mt-2 bg-[#1C2A4D] hover:bg-red-700 text-white text-sm py-2 w-24 rounded">
                Pain Relief
            </button>
            <button className="mt-2 bg-[#1C2A4D] hover:bg-red-700 text-white text-sm py-2 w-24 rounded">
              Restroom
            </button>
            </div>
        </div>
    </div>
  );
}

export default PatientPortal;
