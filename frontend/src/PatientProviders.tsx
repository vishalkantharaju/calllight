import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import nurse_background from './assets/nurse_background.svg';
import providers from './assets/providers.png';
import mic from './assets/mic.png';

function PatientProviders() {
  const nav = useNavigate();

  return (
    <div className="relative h-screen w-screen">
      <div className="relative flex items-center justify-end h-screen">

        {/* Background */}
        <div className="w-screen h-screen">
          <img src={nurse_background} alt="Background" />
        </div>

        {/* Tab */}
        <div className="absolute top-4 md:top-8 left-36 md:left-64 flex flex-col items-start space-y-6">
          <span className="text-white text-xl md:text-4xl font-bold">
            PATIENT NAME (BACKEND)
          </span>
          <div className="flex items-center space-x-16">
            <span className="mt-[3rem] text-xs md:text-lg text-[#1C2A4D] font-semibold">Requests</span>
            <span className="mt-[3rem] text-xs md:text-lg text-[#1C2A4D] font-semibold">Your Providers</span>
            <span className="mt-[3rem] text-xs md:text-lg text-[#1C2A4D] font-semibold">Your Timeline</span>
          </div>

          {/* Main Flex Container */}
          <div className="flex mt-8 space-x-24">
            
            {/* Left Column - Requests */}
            <div className="flex flex-col mt-8 items-center">
              <img className="w-80 h-80"src={providers} />
            </div>

            {/* Right Column - Providers */}
            <div className="flex flex-col items-start mt-2">

              <span className="text-[#1C2A4D] md:text-lg font-semibold">
                  Nurse
              </span>
              <div className="mt-2 w-96 h-10 bg-white shadow-md rounded-lg p-2">
                <p className="text-sm text-[#1C2A4D]">
                  Cameron Cox R.N.
                </p>
              </div>

              <span className="mt-4 text-[#1C2A4D] md:text-lg font-semibold">
                  PCT
              </span>
              <div className="mt-2 w-96 h-10 bg-white shadow-md rounded-lg p-2">
                <p className="text-sm text-[#1C2A4D]">
                  Thida Lay-Sok
                </p>
              </div>

              <span className="mt-4 text-[#1C2A4D] md:text-lg font-semibold">
                  Doctor
              </span>
              <div className="mt-2 w-96 h-10 bg-white shadow-md rounded-lg p-2">
                <p className="text-sm text-[#1C2A4D]">
                  Dr. Vishal Kantharaju
                </p>
              </div>

              <span className="mt-4 text-[#1C2A4D] md:text-lg font-semibold">
                  Volunteer
              </span>
              <div className="mt-2 w-96 h-10 bg-white shadow-md rounded-lg p-2">
                <p className="text-sm text-[#1C2A4D]">
                  Manas Agrawal
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProviders;