import { useNavigate } from 'react-router-dom';
import login_background from './assets/login_background.svg'
function SignIn() {
  const nav = useNavigate();

  return (
    <div className="relative h-screen w-screen">
        <div className="relative flex items-center justify-end h-full">
            {/* Main Content */}
            <div className="w-full h-full">
                <img
                src={login_background}
                alt="Main Background"
                className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Text */}
            <div className="absolute top-40 left-12 flex flex-col items-start">
                <span className="text-white text-6xl font-bold">
                WELCOME
                </span>
                <span className="mt-4 text-white text-6xl font-bold">
                BACK
                </span>
                <span className="mt-8 text-white text-xl w-2/3 font-semibold">
                Are you signing in for a patient or as a nurse?
                </span>

                <div className="flex items-center space-x-4">
                    {/* Button */}
                    <button className="mt-8 px-6 py-2 border-2 border-[#FFB561] 
                        text-[#1C2A4D] font-bold bg-[#FFB561] rounded-md 
                        hover:bg-[#FFB561] hover:text-white transition duration-200">
                        Nurse
                    </button>
                    {/* Button */}
                    <button className="mt-8 px-6 py-2 border-2 border-[#FFB561] 
                        text-[#1C2A4D] font-bold bg-[#FFB561] rounded-md 
                        hover:bg-[#FFB561] hover:text-white transition duration-200">
                        Patient
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SignIn;
