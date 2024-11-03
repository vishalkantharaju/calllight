import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import SignIn from './SignIn'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NursePortal from './NursePortal';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
        {/* <NavBar/> */}
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={SignIn} />
          <Route path="/nurse" Component={NursePortal} />
        </Routes>
    </Router>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

