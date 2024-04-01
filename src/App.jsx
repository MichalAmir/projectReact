import React from 'react';
import { useState } from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { ClientPage } from '../src/clientPage';
import { ManagerPage } from '../src/managerPage';
import { LoginForm } from '../src/loginForm';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<ClientPage />} />
        <Route path="/manager" element={<ManagerPage />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

// import { ShowAppointments } from "./meetingManager";
// import { Appointments } from "./meetingClient";

// export function App(){
//     return(
//         <>
//             <ShowAppointments/>
//         </>
//     )
// }
// export default App;