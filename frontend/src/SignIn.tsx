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
        </div>
    </div>
  );
}

export default SignIn;
