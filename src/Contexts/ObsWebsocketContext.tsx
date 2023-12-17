import OBSWebSocket from 'obs-websocket-js';
import { createContext, useContext, useRef, useState } from 'react';
import { UserDataContext } from './UserDataContext';

export const ObsWebsocketContext = createContext(null);

export function ObsWebsocketProvider({ children }) {
  const [isConnected, setConnection] = useState(false);
  const ws = useRef<OBSWebSocket>(new OBSWebSocket());
  const { obsServerAddress, obsServerPort, obsServerPassword } =
    useContext(UserDataContext);

  async function connectObs() {
    if (!isConnected) {
      try {
        ws.current = new OBSWebSocket();
        const obs = ws.current;
        const { obsWebSocketVersion, negotiatedRpcVersion } = await obs.connect(
          `ws://${obsServerAddress}:${obsServerPort}`,
          obsServerPassword,
          {
            rpcVersion: 1,
          },
        );
        //TODO Add Toast here to show connection successful
        console.log(
          `Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`,
        );
        setConnection(true);
      } catch (error: any) {
        console.error('Failed to connect', error.code, error.message);
        //TODO Add Toast here to show error
        setConnection(false);
      }
    }
  }

  return (
    <ObsWebsocketContext.Provider value={{ isConnected, ws }}>
      {children}
    </ObsWebsocketContext.Provider>
  );
}
