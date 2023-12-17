import { useState } from 'react';
import './App.css';
import OBSWebSocketRef from './functions/OBSWebSocketRef';
import { Route, Router, Routes } from 'react-router-dom';
import Settings from './Pages/Settings';
import Home from './Pages/Home';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <OBSWebSocketRef />
    </>
  );
}

export default App;
