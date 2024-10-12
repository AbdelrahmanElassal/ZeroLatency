import React , {useEffect , useState ,createContext}  from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StreamPlayer from './components/streamComponents/StreamPlayer';
import AuthMain from './components/authComponents/AuthMain';
import Home from './components/Home';
import Navbar from './components/navBar/Navbar';
import UserComponent from './components/UserComponent';


export const AuthContext = createContext();

function App() {  

  const [isLoggedIn ,setIsLoggedIn] = useState(document.cookie ? true : false);


  return (  
    <>
      <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn }}>
        <div className="App">
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/User" element={<UserComponent />} /> 
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthMain />} />
                <Route path="/stream" element={<StreamPlayer/>}/>
              </Routes>
              
            </BrowserRouter>
          </div>
              
      </AuthContext.Provider> 

    </>
      
  );
}

export default App;

