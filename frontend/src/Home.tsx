import background from './assets/front_page.png';
import background_overlay from './assets/background_overlay.svg';
import orange_logo from './assets/orange_logo.png';
import { useNavigate } from 'react-router-dom';

function App() {
  const nav = useNavigate();

  return (
    <div className="relative h-screen w-screen bg-[#1C2A4D]">
      <div className="relative flex items-center justify-end h-full">

        {/* Main Content */}
        <div className="w-1/3 sm:w-1/3 lg:w-1/2 h-full">
          <img
            src={background}
            alt="Main Background"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Transparent Overlay*/}
        <div className="absolute inset-0">
          <img
            src={background_overlay}
            className="w-full h-full object-cover opacity-30" 
          />
        </div>

        {/* Text */}
        <div className="absolute top-48 left-28 flex flex-col items-start">
          
          <div className="flex items-center space-x-4">
            <img src={orange_logo} className="w-14 h-14" />
            <span className="text-[#FFB561] text-4xl font-semibold">
              CALL LIGHT
            </span>
          </div>

          <span className="mt-4 text-white text-4xl font-semibold">
            YOUR CALL,
          </span>

          <span className="mt-2 text-white text-4xl font-semibold">
            OUR PRIORITY.
          </span>

          {/* Button */}
          <button onClick={() => {nav('/login')}} className="mt-8 px-6 py-2 border-2 border-[#FFB561] 
            text-white font-semibold bg-transparent rounded-md 
              hover:bg-[#FFB561] hover:text-white transition duration-200">
            SIGN IN
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
