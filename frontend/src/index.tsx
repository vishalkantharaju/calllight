import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import SignIn from './SignIn'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NursePortal from './NursePortal';
import PatientPortal from './PatientPortal';
import PatientProviders from './PatientProviders';
import PatientInfo from './PatientInfo';
import {Toaster} from './components/ui/toaster'
import NurseResolved from './NurseResolved';
import NurseTotal from './NurseTotal';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
        {/* <NavBar/> */}
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={SignIn} />
          <Route path="/nurse" Component={NursePortal} />
          <Route path="/patient" Component={PatientPortal} />
          <Route path="/patient-providers" Component={PatientProviders} />
          <Route path="/patient-info" Component={PatientInfo} />
          <Route path="/nurse-resolved" Component={NurseResolved} />
          <Route path="/nurse-total" Component={NurseTotal} />
        </Routes>
        <Toaster/>
    </Router>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

