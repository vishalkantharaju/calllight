import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react'; 
import nurse_background from './assets/nurse_background.svg';
import mic from './assets/mic.png';
import orange_logo from './assets/orange_logo.png'
import { useLocation } from 'react-router-dom';
import { OctagonPause } from 'lucide-react';
import { useToast } from "./components/ui/use-toast"

interface GetPatientResponse {
  nurse_id: string,
  date_created: Date,
  date_modified: Date,
  room: number,
  gender: string,
  age: number,
  name: string
}

function PatientPortal() {
  const { toast } = useToast();
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState('patient');
  const [recording, setRecording] = useState<boolean>(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [data, setData] = useState<null | GetPatientResponse>(null);
  const [activeRole, setActiveRole] = useState<'en' | 'es' | 'de' | 'fr' | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream>()
  const [transcribedText, setTranscribedText] = useState('');
  const [reportAudioBlob, setReportAudioBlob] = useState<Blob>(new Blob());

  const toggleForm = (role: 'en' | 'es' | 'de' | 'fr') => {
    setActiveRole(role);
  };

  const recordingOn = async () => {
    if (!activeRole) {
        toast({
            title: "Invalid input",
            description: "Please select a language first",
        });
        return;
    }
    setTranscribedText('')
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(stream);

        // Create a new MediaRecorder instance each time
        const recorder = new MediaRecorder(stream);
        mediaRecorder.current = recorder;

        // Initialize audio chunks
        audioChunks.current = [];

        recorder.ondataavailable = (event) => {
            audioChunks.current.push(event.data);
        };

        recorder.onstop = () => {
            const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
            uploadAudio(audioBlob);
            setAudioUrl(URL.createObjectURL(audioBlob));
            setReportAudioBlob(audioBlob)
            audioChunks.current = []; // Clear the chunks for future recordings
        };

        recorder.start();
        setRecording(true);
    } catch (error) {
        console.error("Error accessing microphone: ", error);
        toast({
            title: "Microphone access error",
            description: "Please allow microphone access and try again.",
        });
    }
  }; 

const recordingOff = () => {
    mediaRecorder.current?.stop();
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    setRecording(false);
    toast({
        title: "Processing...",
        description: "This might take a moment",
    });
  };

  const uploadAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.wav");
    formData.append("language", activeRole ? activeRole : "en");

    try {
      const response = await fetch("http://localhost:5000/api/v1/llm/summarize", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Server response:", result);
      setTranscribedText(result.transcription)
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


  // useEffect(() => {
  //   nav('/patient'); // Navigate to the requests page on mount
  // }, [nav]); // Add nav as a dependency

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'patient':
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

  const confirm = () => {
    if (transcribedText == '') {
      return 
    }
    makeRequest(transcribedText, activeRole ? activeRole : 'en')
  }

  const rerecord = () => {
    if (transcribedText == '') {
      return 
    }
    setTranscribedText('')
    recordingOn()
  }

  const cancel = () => {
    setTranscribedText('')
  }

  const makeRequest = async (input: string, lang: string) => {
    toast({
      title: "Your request is being made...",
      description: "This might take a moment",
  });
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchValue = urlParams.get('id');
    if (!data || !searchValue) {
      return 
    }

    const formData = new FormData();
    formData.append("audio", reportAudioBlob, "recording.wav");
    formData.append("patient_id", searchValue)
    formData.append("nurse_id", data.nurse_id)
    formData.append("transcript", transcribedText)
    console.log(typeof(transcribedText))
    formData.append("language", activeRole ? activeRole : 'en')
    console.log('sending request')
    try {
      const response = await fetch("http://localhost:5000/api/v1/llm/create", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Server response:", result);
      // setTranscribedText(result.transcription)
      toast({
          title: "Request has been sent!",
          description: "A nurse will be with you shortly",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

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
            {data ? (<div> {data.name} ({data.age} {data.gender == 'Male' ? 'M' : 'F'}) </div>)  : 'Loading...'}
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
          <div className="flex mt-8 space-x-36">
            
            {/* Left Column - Requests */}
            <div className="flex flex-col items-center items-start mt-2">
              <span className="text-[#1C2A4D] md:text-xl font-bold">
                Make a request:
              </span>
              <div className="mt-4 flex items-center space-x-2">
                <div className="flex flex-col items-center text-[#1C2A4D] text-sm">
                  <span>Language:</span>
                    <div className="flex items-center space-x-4">
                      {/* Button */}
                      <button onClick={() => toggleForm('en')} 
                      className={`mt-2 px-6 py-2 w-28
                          ${activeRole === 
                              'en' ? 'bg-[#fc9219] text-[#1C2A4D]' : 'bg-[#fac384] text-[#1C2A4D] border-[#FFB561]'} 
                          border-[#FFB561] border-2 font-bold text-white 
                          rounded-md transition duration-200 hover:scale-110 active:scale-95`}>
                          English
                      </button>
                      
                      {/* Button */}
                      <button onClick={() => toggleForm('es')} className={`mt-2 px-6 py-2 w-28
                          ${activeRole === 'es' ? 'bg-[#fc9219] text-[#1C2A4D]' : 'bg-[#fac384] text-[#1C2A4D] border-[#FFB561]'} 
                          border-[#FFB561] border-2 font-bold text-white 
                          rounded-md transition duration-200 hover:scale-110 active:scale-95`}>
                          Español
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      {/* Button */}
                      <button onClick={() => toggleForm('de')} className={`mt-2 px-6 py-2 w-28
                          ${activeRole === 'de' ? 'bg-[#fc9219] text-[#1C2A4D]' : 'bg-[#fac384] text-[#1C2A4D] border-[#FFB561]'} 
                          border-[#FFB561] border-2 font-bold text-white 
                          rounded-md transition duration-200 hover:scale-110 active:scale-95`}>
                          Deutsch
                      </button>

                      {/* Button */}
                      <button onClick={() => toggleForm('fr')} className={`mt-2 px-6 py-2 w-28
                          ${activeRole === 'fr' ? 'bg-[#fc9219] text-[#1C2A4D]' : 'bg-[#fac384] text-[#1C2A4D] border-[#FFB561]'} 
                          border-[#FFB561] border-2 font-bold text-white 
                          rounded-md transition duration-200 hover:scale-110 active:scale-95`}>
                          Français
                      </button>
                    </div>
                  <div className='flex mb-2'>
                    <button onClick={recordingOn} className="mt-4 hover:scale-110 active:scale-95 transition " style={{ border: 'none', background: 'transparent' }}>
                      <img src={mic} alt="Microphone" className="w-20 h-16" />
                    </button>
                    <button onClick={recordingOff} className='mt-4 hover:scale-110 active:scale-95 transition'>
                      <OctagonPause className='w-20 h-16'/>
                    </button>
                  </div>
                  {recording ? "Recording" : "Not Recording"}
                </div>
              </div>
              <span className="mt-4 text-[#1C2A4D] text-lg md:text-xl font-bold">Quick requests:</span>
              <div className="flex items-center space-x-4">
                <button onClick={() => makeRequest("I need water", "en")} className="mt-4 bg-[#1C2A4D] text-white text-sm py-2 w-24 rounded hover:bg-[#6f88c9] hover:scale-110 active:scale-95 transition">Water</button>
                <button onClick={() => makeRequest("I need pain relief", "en")} className="mt-4 bg-[#1C2A4D] text-white text-sm py-2 w-24 rounded hover:bg-[#6f88c9] hover:scale-110 active:scale-95 transition">Pain Relief</button>
                <button onClick={() => makeRequest("I need to go to the bathroom", "en")} className="mt-4 bg-[#1C2A4D] text-white text-sm py-2 w-24 rounded hover:bg-[#6f88c9] hover:scale-110 active:scale-95 transition">Restroom</button>
              </div>
            </div>

            {/* Right Column - Requests */}
            <div className="flex flex-col items-start mt-2">
              <span className="text-[#1C2A4D] md:text-xl font-bold">
                  Your request:
              </span>
              <div className="mt-6 w-96 h-52 bg-white shadow-md rounded-lg p-4">
                <p className="text-sm text-[#1C2A4D]">
                  {transcribedText}
                </p>
              </div>
              <div className="flex mt-8 ml-4 space-x-8">
                <button onClick={confirm} className="mt-2 bg-[#FFB561] text-[#1C2A4D] text-sm h-8 w-24 rounded hover:bg-[#fc9219] hover:scale-110 active:scale-95 transition">Confirm</button>
                <button onClick={rerecord} className="mt-2 bg-[#FFB561] text-[#1C2A4D] text-sm h-8 w-24 rounded hover:bg-[#fc9219] hover:scale-110 active:scale-95 transition">Re-record</button>
                <button onClick={cancel} className="mt-2 bg-[#FFB561] text-[#1C2A4D] text-sm h-8 w-24 rounded hover:bg-[#fc9219] hover:scale-110 active:scale-95 transition">Cancel</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientPortal;
