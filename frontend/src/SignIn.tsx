import { useNavigate } from 'react-router-dom';
import login_background from './assets/login_background.svg'
import { useState } from 'react'; 

function SignIn() {
  const nav = useNavigate();
  const [showForm, setShowForm] = useState(false); 
  const [formSlide, setFormSlide] = useState(false);
  const [nurseClicked, setNurseClicked] = useState(false);
  const [patientClicked, setPatientClicked] = useState(false);

  const toggleForm = (role: 'nurse' | 'patient') => {
    setShowForm(true); 
    setTimeout(() => {
      setFormSlide(true); 
    }, 10); 
    if (role === 'nurse') {
        setNurseClicked(true);
      } else {
        setPatientClicked(true);
    }
  };

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
                    <button onClick={() => toggleForm('nurse')} className={`mt-8 px-6 py-2 
                        ${nurseClicked ? 'font-bold': 'font-semibold'} 
                        bg-[#FFB561] text-[#1C2A4D] rounded-md transition duration-200`}>
                        Nurse
                    </button>
                    {/* Button */}
                    <button onClick={() => toggleForm('patient')} className={`mt-8 px-6 py-2 
                        ${patientClicked ? 'font-bold': 'font-semibold'} 
                        bg-[#FFB561] text-[#1C2A4D] rounded-md transition duration-200`}>
                        Patient
                    </button>
                </div>
            </div>

            {/* Sliding Sign-In Form */}
            {showForm && (
        <div
          className={`absolute top-36 right-36 w-1/3 h-full p-8 transition-transform duration-500 
            ${formSlide ? 'translate-x-0' : 'translate-x-full'}`}>
          <h2 className="text-2xl font-bold text-[#1C2A4D]">SIGN IN</h2>
          <form className="mt-4">
            <div>
              <label className="block text-sm font-semibold text-[#1C2A4D]">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="border mt-2 rounded-md w-3/4 p-2"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold text-[#1C2A4D]">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="border mt-2 rounded-md w-3/4 p-2"
              />
            </div>
            <button
              type="submit"
              className="text-left mt-6 px-4 py-2 bg-[#FFB561] text-[#1C2A4D] font-bold rounded-md w-1/4 hover:text-white"
            >
              Sign In
            </button>
          </form>
        </div>)}
      
        </div>
    </div>
  );
}

export default SignIn;
