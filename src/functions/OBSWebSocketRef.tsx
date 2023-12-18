import { useContext, useEffect } from 'react';
import { ObsWebsocketContext } from '../Contexts/ObsWebsocketContext';

export default function OBSWebSocketRef() {
  const { isConnected, setConnection, ws, connectObs, handleDisconnect } =
    useContext(ObsWebsocketContext);

  useEffect(() => {
    ws.current.on('ConnectionOpened', () => {
      console.log('Connection Successful');
      setConnection(true);
    });
    ws.current.on('ConnectionClosed', () => {
      console.log('Connection Closed');
      setConnection(false);
    });
  }, [isConnected]);

  return (
    <div>
      {isConnected ? (
        <button onClick={() => handleDisconnect()}>Disconnect</button>
      ) : (
        <button onClick={() => connectObs()}>Connect</button>
      )}
    </div>
  );
}
