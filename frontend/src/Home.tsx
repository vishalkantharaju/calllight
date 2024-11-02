import background from './assets/home_page.svg'
// import { useNavigate } from 'react-router-dom';

function App() {
  // const [count, setCount] = useState(0)
  // const nav = useNavigate();

  return (
    <div className='max-w-screen max-h-screen'>
      {/* <div className='flex items-center justify-start h-full pl-12'> */}
            <img className='h-full w-full' src={background}></img>
      {/* </div> */}
    </div>
  )
}

export default App
