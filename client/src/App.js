import React , {useEffect , useState }  from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StreamPlayer from './components/streamComponents/StreamPlayer';

function App() {  
  return (   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/stream" element={<StreamPlayer/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

