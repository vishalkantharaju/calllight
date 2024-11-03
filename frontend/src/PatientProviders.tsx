import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import nurse_background from './assets/nurse_background.svg';
import providers from './assets/providers.png';
import mic from './assets/mic.png';
import orange_logo from './assets/orange_logo.png'
import { useLocation } from 'react-router-dom';

interface GetPatientResponse {
  id: string,
  date_created: Date,
  date_modified: Date,
  room: number,
  gender: string,
  age: number,
  name: string
}

function PatientProviders() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState('providers');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [data, setData] = useState<null | GetPatientResponse>(null);

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    console.log(tab)
    switch (tab) {
      case 'patient':
      console.log('herello')  
      nav(`/patient?id=${id}`); // Replace with your actual route
        break;
      case 'providers':
        nav(`/patient-providers?id=${id}`); // Replace with your actual route
        break;
      case 'timeline':
        nav(`/patient-info?id=${id}`); // Replace with your actual route
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchValue = urlParams.get('id')
    if (!searchValue) {
        nav('/login')
    } else {
        fetch(
            'http://localhost:5000' + `/api/v1/patient/fetch?id=${searchValue}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then(response => response.json() as Promise<GetPatientResponse>)
          .then(data => {
            console.log(data)
            setData(data);
            console.log('done')
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }
}, [])

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
          {data ? (<div> {data.name} ({data.age} {data.gender == 'Male' ? 'M' : 'F'}) </div>)  : ''}
          </span>
          <button onClick={() => {nav('/')}} style={{ border: 'none', background: 'transparent' }}>
            <img src={orange_logo} className="w-14 h-14" />
          </button>
        </div>
          <div className="flex items-center space-x-16">
            <button 
              className={`mt-6 h-12 w-32 ${activeTab === 'patient' ? 'bg-[#E4E4E4] hover:bg-[#C0C0C0]' : 'bg-transparent'} hover:bg-gray-200`} 
              style={{ border: 'none' }} 
              onClick={() => handleNavigation('patient')}
            >
              <span className="text-xs md:text-lg text-[#1C2A4D] font-semibold">Requests</span>
            </button>
            <button 
              className={`mt-6 h-12 w-32 ${activeTab === 'providers' ? 'bg-[#E4E4E4] hover:bg-[#C0C0C0]' : 'bg-transparent'} hover:bg-gray-200`} 
              style={{ border: 'none' }} 
              onClick={() => handleNavigation('providers')}
            >
              <span className="text-xs md:text-lg text-[#1C2A4D] font-semibold">Your Providers</span>
            </button>
            <button 
              className={`mt-6 h-12 w-32 ${activeTab === 'timeline' ? 'bg-[#E4E4E4] hover:bg-[#C0C0C0]' : 'bg-transparent'} hover:bg-gray-200`} 
              style={{ border: 'none' }} 
              onClick={() => handleNavigation('timeline')}
            >
              <span className="text-xs md:text-lg text-[#1C2A4D] font-semibold">Your Timeline</span>
            </button>
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
