import React , {useEffect , useState }  from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StreamPlayer from './components/streamComponents/StreamPlayer';
import AuthMain from './components/authComponents/AuthMain';

function App() {  
  return (   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthMain />} />
      <Route path="/stream" element={<StreamPlayer/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

