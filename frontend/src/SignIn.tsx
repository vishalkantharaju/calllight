import { useNavigate } from 'react-router-dom';
import login_background from './assets/login_background.svg'
import { act, useState } from 'react'; 
import { useToast } from "./components/ui/use-toast"
import { Input } from "./components/ui/input"

interface LoginResponse {
  id: string,
  err: string,
  success: boolean
}

function SignIn() {
  const { toast } = useToast();
  const nav = useNavigate();
  const [showForm, setShowForm] = useState(false); 
  const [formSlide, setFormSlide] = useState(false);
  const [activeRole, setActiveRole] = useState<'nurse' | 
    'patient' | null>(null);

  const toggleForm = (role: 'nurse' | 'patient') => {
    setShowForm(true); 
    setTimeout(() => {
      setFormSlide(true); 
    }, 10); 
    setActiveRole(role);
  };

  const [usery, setUsername] = useState<string>('');
  const [passy, setPassword] = useState<string>('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
  };

  function login() {
    console.log('asa')
    setTimeout(() => {
      console.log('Action performed after delay');
    }, 2000)
    if (activeRole === null) {
        toast({
            title: "Uh-oh! Looks like you forgot to fill out a field!",
            description: "Please make sure to select whether you are a nurse or volunteer!",
        })
        return;
    } else if (activeRole == 'nurse') {
      fetch(
            'http://localhost:5000' + `/api/v1/nurse/login?username=${usery}&password=${passy}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then(response => response.json() as Promise<LoginResponse>)
          .then(data => {
            if (data.success) {  
              const url = `/nurse?id=${data.id}`;
                console.log(url);
                nav(url);
            } else {
                toast({
                    title: "Wrong credentials entered!",
                    description: "Please try again.",
                })
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    } 
    else if (activeRole == 'patient') {
        fetch(
            'http://localhost:5000' + `/api/v1/patient/login?username=${usery}&password=${passy}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then(response => response.json() as Promise<LoginResponse>)
          .then(data => {
            if (data.success) {
                const url = `/patient?id=${data.id}`;
                nav(url);
            } else {
                toast({
                    title: "Wrong credentials entered!",
                    description: "Please try again.",
                })
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            toast({
              title: "Something went wrong!",
              description: "Please try again later.",
          })
          });
    }
}

  return (
    <div className="relative h-screen w-screen">
        <div className="relative flex items-center justify-end h-full">
            {/* Background */}
            <div className="w-full h-full">
                <img
                src={login_background}
                alt="Main Background"
                className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Text */}
            <div className="absolute top-40 left-16 flex flex-col items-start">
                <span className="text-white text-6xl font-bold">
                WELCOME
                </span>
                <span className="mt-4 text-white text-6xl font-bold">
                BACK
                </span>
                <span className="mt-8 text-white text-xl w-2/3 font-semibold">
                Are you signing in as a patient or as a nurse?
                </span>

                <div className="flex items-center space-x-4">

                    {/* Button */}
                    <button onClick={() => toggleForm('nurse')} 
                    className={`mt-8 px-6 py-2 
                        ${activeRole === 
                            'nurse' ? 'bg-[#FFB561] text-[#1C2A4D]' : 'text-white bg-transparent border-[#FFB561]'} 
                        border-[#FFB561] border-2 font-bold text-white 
                        rounded-md transition duration-200 hover:scale-110 active:scale-95`}>
                        Nurse
                    </button>
                    
                    {/* Button */}
                    <button onClick={() => toggleForm('patient')} className={`mt-8 px-6 py-2 
                        ${activeRole === 'patient' ? 'bg-[#FFB561] text-[#1C2A4D]' : 'text-white bg-transparent border-[#FFB561]'} 
                        border-[#FFB561] border-2 font-bold text-white 
                        rounded-md transition duration-200 hover:scale-110 active:scale-95`}>
                        Patient
                    </button>
                </div>
            </div>

            {/* Sliding Sign-In Form */}
            {showForm && (
        <div
          className={`absolute top-36 right-36 w-1/3 h-full p-8 
            transition-transform duration-500 
            ${formSlide ? 'translate-x-0' : 'translate-x-full'}`}>
          <h2 className="text-2xl font-bold text-[#1C2A4D]">SIGN IN</h2>
          <form className="mt-4">
            <div>
              <label className="block text-sm font-semibold 
                text-[#1C2A4D]">Email</label>
              <Input placeholder='Enter your email' className='border mt-2 rounded-md w-3/4 p-2' value={usery} onChange={handleUsernameChange}/>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold 
                text-[#1C2A4D]">Password</label>
              <Input placeholder='Enter your password' className='border mt-2 rounded-md w-3/4 p-2' value={passy} onChange={handlePasswordChange}/>
            </div>
            <button
              type="button"
              className="text-center mt-6 px-4 py-2 bg-[#FFB561] 
                text-[#1C2A4D] font-bold rounded-md w-1/4 hover:text-white hover:scale-110 active:scale-95 transition"
                onClick={login}>
              Sign In
            </button>
          </form>
        </div>)}
      
        </div>
    </div>
  );
}

export default SignIn;
