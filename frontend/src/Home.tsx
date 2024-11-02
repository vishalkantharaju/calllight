import background from './assets/hospital.jpg'
// import { useNavigate } from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)
  // const nav = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-[#1C2A4D]">
      <div className="relative w-1/2 h-full" style={{ clipPath: 'ellipse(100% 100% at right)',  }}> {/* Adjust width for sliver effect */}
        <img
          src={background} // Replace with your image URL
          alt="Peeking Image"
          className="w-full h-full object-cover object-center" // Set to cover the container
          // style={{ clipPath: 'ellipse(85% 100% at right)' }} // Clip the image to create the sliver effect
        />
        <div className="absolute inset-0 bg-[#FFB561] opacity-30 rounded-lg" />
      </div>
      <div></div>
    </div>
  );
}

export default App
