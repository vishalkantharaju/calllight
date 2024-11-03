import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import nurse_background from './assets/nurse_background.svg';
import timeline from './assets/timeline.png';
import EKG from './components/Heart_Rate';

function PatientInfo() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState('timeline');

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'patient':
        nav('/patient'); // Replace with your actual route
        break;
      case 'providers':
        nav('/patient-providers'); // Replace with your actual route
        break;
      case 'timeline':
        nav('/patient-info'); // Replace with your actual route
        break;
      default:
        break;
    }
  };

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
            <button 
              className={`mt-[2.5rem] h-12 w-32 ${activeTab === 'patient' ? 'bg-[#E4E4E4]' : 'bg-transparent'}`} 
              style={{ border: 'none' }} 
              onClick={() => handleNavigation('patient')}
            >
              <span className="text-xs md:text-lg text-[#1C2A4D] font-semibold">Requests</span>
            </button>
            <button 
              className={`mt-[2.5rem] h-12 w-32 ${activeTab === 'providers' ? 'bg-[#E4E4E4]' : 'bg-transparent'}`} 
              style={{ border: 'none' }} 
              onClick={() => handleNavigation('providers')}
            >
              <span className="text-xs md:text-lg text-[#1C2A4D] font-semibold">Your Providers</span>
            </button>
            <button 
              className={`mt-[2.5rem] h-12 w-32 ${activeTab === 'timeline' ? 'bg-[#E4E4E4]' : 'bg-transparent'}`} 
              style={{ border: 'none' }} 
              onClick={() => handleNavigation('timeline')}
            >
              <span className="text-xs md:text-lg text-[#1C2A4D] font-semibold">Your Timeline</span>
            </button>
          </div>

          {/* Main Flex Container */}
          <div className="flex mt-8 space-x-24">
            
            {/* Left Column - Requests */}
            <div className="flex flex-col items-center">
              <div className="mt-8 w-72 h-80 bg-white shadow-md rounded-lg p-2">
                <div className="mt-4 flex space-x-2">
                  <img src={timeline} className="h-64 w-10" />
                  <div className="flex flex-col">
                    <p className="text-sm text-[#1C2A4D] font-bold">
                      Next meal:
                    </p>
                    <p className="text-sm text-[#1C2A4D]">
                      Today at 5pm
                    </p>

                    <p className="mt-16 text-sm text-[#1C2A4D] font-bold">
                      Next medication:
                    </p>
                    <p className="text-sm text-[#1C2A4D]">
                      Tonight at 8pm
                    </p>

                    <p className="mt-20 text-sm text-[#1C2A4D] font-bold">
                      Next medication:
                    </p>
                    <p className="text-sm text-[#1C2A4D]">
                      Wednesday Nov 6
                    </p>

                  </div>                  
                </div>
              </div>
            </div>

            {/* Right Column - Providers */}
            <div className="flex flex-col mt-2">

              <span className="mt-5 text-[#1C2A4D] md:text-lg font-bold">
                  Vitals
              </span>
              
              <div className="flex mt-8 space-x-8 items-center ">
              {/* Heart Rate */}
                <div className="flex items-center flex-col mt-8 w-36 h-20 bg-white shadow-md rounded-lg p-2">
                  <p className="text-sm font-bold text-red-700">
                    Heart Rate
                  </p>
                  <p className="text-xl font-bold mt-2 text-red-700">
                    96 bpm
                  </p>
                </div>
                {/* EKG Symbol */}
                <div className="mt-6">
                    <EKG />
                </div>
              </div>
              
              <div className="flex mt-8 space-x-8">
                
                {/* Blood Pressure */}
                <div className="flex items-center flex-col mt-8 w-36 h-20 bg-white shadow-md rounded-lg p-2">
                  <p className="text-sm font-bold text-red-700">
                    Blood Pressure
                  </p>
                  <p className="text-xl font-bold mt-2 text-red-700">
                    120/80
                  </p>
                </div>

                {/* Resp. Rate */}
                <div className="flex items-center flex-col mt-8 w-36 h-20 bg-white shadow-md rounded-lg p-2">
                  <p className="text-sm font-bold text-red-700">
                    Resp. Rate
                  </p>
                  <p className="text-xl font-bold mt-2 text-red-700">
                    12 b/min
                  </p>
                </div>

                {/* Ox % */}
                <div className="flex items-center flex-col mt-8 w-36 h-20 bg-white shadow-md rounded-lg p-2">
                  <p className="text-sm font-bold text-red-700">
                    % Oxygen
                  </p>
                  <p className="text-xl font-bold mt-2 text-red-700">
                    100%
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientInfo;
