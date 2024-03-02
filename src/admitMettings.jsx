import React, { useState } from 'react';

// קומפוננטת מסך התחברות
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // בדיקה אם שם המשתמש והסיסמה אמינים
    if (username && password) {
      // העברת המשתנים שם המשתמש והסיסמה לפונקציה onLogin שמופעלת על ידי ההורה
      onLogin(username, password);
    } else {
      alert('אנא מלא את כל השדות');
    }
  };

  return (
    <div>
      <h2>כניסה למערכת</h2>
      <input
        type="text"
        placeholder="שם משתמש"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>כניסה</button>
    </div>
  );
}

// קומפוננטת מסך הבעל העסק
function BusinessOwnerScreen({ businessDetails, services, meetings, addService }) {
  const [newService, setNewService] = useState('');

  const handleAddService = () => {
    if (newService) {
      // הוספת שירות חדש לרשימה
      addService(newService);
      // איפוס הערך בתיבת הטקסט
      setNewService('');
    } else {
      alert('אנא הזן שם לשירות');
    }
  };

  return (
    <div>
      <h2>פרטי העסק</h2>
      <p>שם: {businessDetails.name}</p>
      <p>כתובת: {businessDetails.address}</p>
      <h3>רשימת השירותים</h3>
      <ul>
        {services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="הוסף שירות חדש"
        value={newService}
        onChange={(e) => setNewService(e.target.value)}
      />
      <button onClick={handleAddService}>הוסף שירות</button>
      <h3>רשימת הפגישות</h3>
      <ul>
        {meetings.map((meeting, index) => (
          <li key={index}>{meeting}</li>
        ))}
      </ul>
    </div>
  );
}

// קומפוננטת מסך הלקוחות
function CustomerScreen({ services, scheduleMeeting }) {
  return (
    <div>
      <h2>רשימת השירותים</h2>
      <ul>
        {services.map((service, index) => (
          <li key={index}>
            {service}
            <button onClick={() => scheduleMeeting(service)}>קביעת פגישה</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// קומפוננטת App המקבץ את המסכים של הלקוחות והבעל העסק
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [businessDetails, setBusinessDetails] = useState({
    name: 'שם העסק',
    address: 'כתובת העסק',
  });
  const [services, setServices] = useState(['שירות 1', 'שירות 2']);
  const [meetings, setMeetings] = useState([]);

  const handleLogin = (username, password) => {
    // בדיקה של המשתמש והסיסמה
    if (username === 'business' && password === '1234') {
      setLoggedIn(true);
      setUserType('business');
    } else if (username === 'customer' && password === '5678') {
      setLoggedIn(true);
      setUserType('customer');
    } else {
      alert('שם משתמש או סיסמה שגויים');
    }
  };

  const handleAddService = (service) => {
    // הוספת שירות חדש לרשימה
    setServices([...services, service]);
  };

  const handleScheduleMeeting = (service) => {
    // קביעת פגישה לשירות נבחר
    setMeetings([...meetings, `פגישה לשירות: ${service}`]);
  };

  return (
    <div>
      {!loggedIn && <LoginScreen onLogin={handleLogin} />}
      {loggedIn && userType === 'business' && (
        <BusinessOwnerScreen
          businessDetails={businessDetails}
          services={services}
          meetings={meetings}
          addService={handleAddService}
        />
      )}
      {loggedIn && userType === 'customer' && (
        <CustomerScreen services={services} scheduleMeeting={handleScheduleMeeting} />
      )}
    </div>
  );
}

export default App;
