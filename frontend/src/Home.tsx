import background from './assets/front_page.png'
// import { useNavigate } from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)
  // const nav = useNavigate();

  return (
    <div className="h-screen flex items-center justify-end bg-[#1C2A4D]">
      <div className="relative full w-1/3 sm:w-1/3 lg:w-1/2 h-full"> {/* Adjust width for sliver effect */}
        <img
          src={background} // Replace with your image URL
          className="w-full h-full object-cover object-center" // Set to cover the container
        />
      </div>
      <div></div>
    </div>
  );
}

export default App
