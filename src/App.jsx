import React from 'react';
import { useState } from 'react';
import {Routes, Route, useParams, BrowserRouter} from 'react-router-dom'; // השינוי כאן
import { ClientPage } from './clientPage'; 
import { ManagerPage } from './managerPage';
import { LoginForm } from './loginForm';


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



// import { BrowserRouter as Router } from 'react-router-dom';
//  import { BusinessDataClients } from './BusinessClient';
// function App() {
//     return (
//         <Router>
//             <BusinessDataClients />
//         </Router>
//     );
// }

// export default App; 

