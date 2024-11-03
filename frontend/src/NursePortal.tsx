import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import nurse_background from './assets/nurse_background.svg'

function NursePortal() {
  const nav = useNavigate();

  return (
    <div className="relative h-screen w-screen">
        <div className="relative flex items-center justify-end h-screen">

            {/* Background */}
             <div className="w-screen h-screen">
                <img src={nurse_background}/>
            </div>

            {/* Tab */}
            <div className="absolute top-4 md:top-8 left-36 md:left-64 flex flex-col items-start">
                <span className="text-white text-xl md:text-4xl font-bold">
                NURSE NAME (BACKEND)
                </span>
                <div className="flex items-center space-x-16">
                    <span className="mt-[2rem] text-xs md:text-lg md:mt-[4.4rem] text-[#1C2A4D]  font-semibold">
                    Active
                    </span>
                    <span className="mt-[2rem] text-xs md:text-lg md:mt-[4.4rem] text-[#1C2A4D]  font-semibold">
                    Resolved
                    </span>
                    <span className="mt-[2rem] text-xs md:text-lg md:mt-[4.4rem] text-[#1C2A4D]  font-semibold">
                    Total
                    </span>
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
                  <th className="px-4 py-2 sm:w-36">Room #</th>
                  <th className="text-left px-4 py-2 w-72">Request</th>
                  <th className="px-4 py-2 w-4 sm:w-24" >Severity</th>
                  <th className="px-4 py-2 w-4 sm:w-24" >Time</th>
                  <th className="px-4 py-2 w-4 sm:w-36">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Table rows will go here */}
                <tr className="bg-gray-100 border-b border-[#E4E4E4]">
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
                                Decline
                              </button>
                              </div>
                            </td>
                          </tr>
              </tbody>
            </table>
          </div>
            </div>
        </div>
    </div>
  );
}

export default NursePortal;