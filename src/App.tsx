import './App.css';
import OBSWebSocketRef from './functions/OBSWebSocketRef';
import { Route, Routes } from 'react-router-dom';
import Settings from './Pages/Settings';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <OBSWebSocketRef />
    </>
  );
}

export default App;
