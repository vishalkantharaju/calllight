import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import nurse_background from './assets/nurse_background.svg';
import mic from './assets/mic.png';
import orange_logo from './assets/orange_logo.png'

function PatientPortal() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState('patient');

  useEffect(() => {
    nav('/patient'); // Navigate to the requests page on mount
  }, [nav]); // Add nav as a dependency

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
        <div className="flex items-center space-x-16">
          <span className="text-white text-xl md:text-4xl font-bold">
            PATIENT NAME (BACKEND)
          </span>
          <button onClick={() => {nav('/')}} style={{ border: 'none', background: 'transparent' }}>
            <img src={orange_logo} className="w-14 h-14" />
          </button>
        </div>
          <div className="flex items-center space-x-16">
            <button 
              className={`mt-6 h-12 w-32 ${activeTab === 'patient' ? 'bg-[#E4E4E4]' : 'bg-transparent'}`} 
              style={{ border: 'none' }} 
              onClick={() => handleNavigation('patient')}
            >
              <span className="text-xs md:text-lg text-[#1C2A4D] font-semibold">Requests</span>
            </button>
            <button 
              className={`mt-6 h-12 w-32 ${activeTab === 'providers' ? 'bg-[#E4E4E4]' : 'bg-transparent'}`} 
              style={{ border: 'none' }} 
              onClick={() => handleNavigation('providers')}
            >
              <span className="text-xs md:text-lg text-[#1C2A4D] font-semibold">Your Providers</span>
            </button>
            <button 
              className={`mt-6 h-12 w-32 ${activeTab === 'timeline' ? 'bg-[#E4E4E4]' : 'bg-transparent'}`} 
              style={{ border: 'none' }} 
              onClick={() => handleNavigation('timeline')}
            >
              <span className="text-xs md:text-lg text-[#1C2A4D] font-semibold">Your Timeline</span>
            </button>
          </div>

          {/* Main Flex Container */}
          <div className="flex mt-8 space-x-36">
            
            {/* Left Column - Requests */}
            <div className="flex flex-col items-center items-start mt-2">
              <span className="text-[#1C2A4D] md:text-xl font-bold">
                Make a request:
              </span>
              <div className="mt-4 flex items-center space-x-2">
                <div className="flex flex-col items-center text-[#1C2A4D] text-sm">
                  <span>English:</span>
                  <button className="mt-4" style={{ border: 'none', background: 'transparent' }}>
                    <img src={mic} alt="Microphone" className="w-32 h-24" />
                  </button>
                </div>
                <div className="flex flex-col items-center text-[#1C2A4D] text-sm">
                  <span>Spanish:</span>
                  <button className="mt-4" style={{ border: 'none', background: 'transparent' }}>
                    <img src={mic} alt="Microphone" className="w-32 h-24" />
                  </button>
                </div>
              </div>
              <span className="mt-4 text-[#1C2A4D] text-lg md:text-xl font-bold">Quick requests:</span>
              <button className="mt-4 bg-[#1C2A4D] hover:bg-red-700 text-white text-sm py-2 w-24 rounded">Water</button>
              <button className="mt-2 bg-[#1C2A4D] hover:bg-red-700 text-white text-sm py-2 w-24 rounded">Pain Relief</button>
              <button className="mt-2 bg-[#1C2A4D] hover:bg-red-700 text-white text-sm py-2 w-24 rounded">Restroom</button>
            </div>

            {/* Right Column - Requests */}
            <div className="flex flex-col items-start mt-2">
              <span className="text-[#1C2A4D] md:text-xl font-bold">
                  Your request:
              </span>
              <div className="mt-6 w-96 h-52 bg-white shadow-md rounded-lg p-4">
                <p className="text-sm text-[#1C2A4D]">
                  Backend text generated.
                </p>
              </div>
              <div className="flex mt-8 ml-4 space-x-8">
                <button className="mt-2 bg-[#FFB561] hover:bg-blue-700 text-[#1C2A4D] text-sm h-8 w-24 rounded">Confirm</button>
                <button className="mt-2 bg-[#FFB561] hover:bg-blue-700 text-[#1C2A4D] text-sm h-8 w-24 rounded">Re-record</button>
                <button className="mt-2 bg-[#FFB561] hover:bg-blue-700 text-[#1C2A4D] text-sm h-8 w-24 rounded">Cancel</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientPortal;
