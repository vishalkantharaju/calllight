import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'; 
import nurse_background from './assets/nurse_background.svg'
import orange_logo from './assets/orange_logo.png'
import { useLocation } from 'react-router-dom';

interface GetNurseResponse {
  name: string
}
interface hi {
  priority: string
  transcript: string
}
interface MineResponse {
  ambulances: Array<hi>
}

function NursePortal() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState('nurse');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [data, setData] = useState<null | GetNurseResponse>(null);
  const [adata, setAData] = useState<null | Array<hi>>(null);

  const handleNavigation = (tab: string) => {
    const queryString = location.search;
    setActiveTab(tab);
    switch (tab) {
      case 'nurse':
        nav(`/nurse?id=${id}`); // Use the fetched id
        break;
      case 'resolved':
        nav(`/nurse-resolved?id=${id}`); // Use the fetched id
        break;
      case 'total':
        nav(`/nurse-total?id=${id}`); // Use the fetched id
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
            'http://localhost:5000' + `/api/v1/nurse/fetch?id=${searchValue}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then(response => response.json() as Promise<GetNurseResponse>)
          .then(data => {
            console.log(data)
            setData(data);
            console.log('done')
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }
    fetch(
      'http://localhost:5000' + `/api/v1/patient/mine?id=${searchValue}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then(response => response.json() as Promise<MineResponse>)
    .then(data => {
      console.log(data)
      setAData(data.ambulances)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, [])
  return (
    <div className="relative h-screen w-screen">
        <div className="relative flex items-center justify-end h-screen">

            {/* Background */}
             <div className="w-screen h-screen">
                <img src={nurse_background}/>
            </div>

            {/* Tab */}
            <div className="absolute top-4 md:top-8 left-36 md:left-64 flex flex-col items-start">
            <div className="flex items-center space-x-16">
          <span className="text-white text-xl md:text-4xl font-bold">
            {data ? data.name : ""}
          </span>
          <button onClick={() => {nav('/')}} style={{ border: 'none', background: 'transparent' }}>
            <img src={orange_logo} className="w-14 h-14" />
          </button>
        </div>
        <div className="flex items-center space-x-16">
            <button 
              className={`mt-12 h-12 w-32 ${activeTab === 'nurse' ? 'bg-[#E4E4E4]' : 'bg-transparent'}`} 
              style={{ border: 'none' }} 
              onClick={() => handleNavigation('nurse')}
            >
              <span className="text-xs md:text-lg text-[#1C2A4D] font-semibold">Active</span>
            </button>
            <button 
              className={`mt-12 h-12 w-32 ${activeTab === 'resolved' ? 'bg-[#E4E4E4]' : 'bg-transparent'}`} 
              style={{ border: 'none' }} 
              onClick={() => handleNavigation('resolved')}
            >
              <span className="text-xs md:text-lg text-[#1C2A4D] font-semibold">Resolved</span>
            </button>
            <button 
              className={`mt-12 h-12 w-32 ${activeTab === 'total' ? 'bg-[#E4E4E4]' : 'bg-transparent'}`} 
              style={{ border: 'none' }} 
              onClick={() => handleNavigation('total')}
            >
              <span className="text-xs md:text-lg text-[#1C2A4D] font-semibold">Total</span>
            </button>
          </div>
                
            {/* Requests */}
            <span className="mt-10 text-[#1C2A4D] text-lg md:text-xl font-bold">
                Requests
            </span>

            {/* Scrollable Table Container */}
          <div className="overflow-y-auto max-h-96 w-full">
            <table className="mt-4 w-full text-left rounded-lg">
              <thead>
                <tr className="bg-white text-left text-[#1C2A4D] text-xs sm:text-small border-2 border-[#E4E4E4]">
                  {/* <th className="px-4 py-2 sm:w-36">Room #</th> */}
                  <th className="text-left px-4 py-2 w-96">Request</th>
                  <th className="px-4 py-2 w-4 sm:w-36" >Severity</th>
                  {/* <th className="px-4 py-2 w-4 sm:w-24" >Time</th> */}
                  <th className="px-4 py-2 sm:w-40 ">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Table rows will go here */}
                {adata && adata.map((request, index) => (
  <tr key={index} className="bg-gray-100 border-b border-[#E4E4E4]">
    {/* <td className="px-4 py-2 text-[#1C2A4D]">{request.roomNumber}</td> */}
    <td className="px-4 py-2 text-[#1C2A4D] text-left">{request.transcript}</td>
    <td className="px-4 py-2 text-red-700 font-semibold">{request.priority}</td>
    {/* <td className="px-4 py-2 text-[#1C2A4D]">{request.waitTime}</td> */}
    <td className="px-4 py-2 text-[#1C2A4D]">
      <div className="flex space-x-2">
        <button
          // onClick={() => handleResolve(request.id)}
          className="bg-[#1C2A4D] hover:bg-blue-700 text-white text-sm py-1 px-2 mr-2 rounded"
        >
          Resolve
        </button>
        <button
          // onClick={() => handleDecline(request.id)}
          className="bg-[#FFB561] hover:bg-blue-700 text-[#1C2A4D] text-sm py-1 px-2 rounded"
        >
          Decline
        </button>
      </div>
    </td>
  </tr>
))}

                {/* <tr className="bg-gray-100 border-b border-[#E4E4E4]">
                            <td className="px-4 py-2 text-[#1C2A4D]">{'406'}</td>
                            <td className="px-4 py-2 text-[#1C2A4D] text-left">{'Needs water'}</td>
                            <td className= "px-4 py-2 text-red-700 font-semibold">
                              {'Immediate'}
                            </td>
                            <td className="px-4 py-2 text-[#1C2A4D]">{'5 mins'}</td>
                            <td className="px-4 py-2 text-[#1C2A4D]">
                            <div className="flex space-x-2">
                              <button className="bg-[#1C2A4D] hover:bg-blue-700 text-white text-sm py-1 px-2 mr-2 rounded">
                                Resolve
                              </button>
                              <button className="bg-[#FFB561] hover:bg-blue-700 text-[#1C2A4D] text-sm py-1 px-2 rounded">
                                Help
                              </button>
                              </div>
                            </td>
                          </tr> */}
              </tbody>
            </table>
          </div>
            </div>
        </div>
    </div>
  );
}

export default NursePortal;
