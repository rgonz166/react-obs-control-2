import './App.css';
import OBSWebSocketRef from './functions/OBSWebSocketRef';
import { Route, Routes } from 'react-router-dom';
import Settings from './Pages/Settings';
import Home from './Pages/Home';
import Version from './Components/Version';
import ObsStats from './functions/ObsStats';
import ObsScenes from './Components/ObsScenes';

function App() {
  const appStyle: React.CSSProperties = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center',
  };
  return (
    <div style={appStyle}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <OBSWebSocketRef />
      <ObsScenes />
      <Version />
    </div>
  );
}
export default App;
