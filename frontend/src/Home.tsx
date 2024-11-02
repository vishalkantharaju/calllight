import background from './assets/front_page.png';
import background_overlay from './assets/background_overlay.svg';
// import { useNavigate } from 'react-router-dom';

function App() {
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
        
      </div>
    </div>
  );
}

export default App;
