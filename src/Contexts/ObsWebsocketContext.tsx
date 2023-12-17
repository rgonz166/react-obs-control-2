import OBSWebSocket, { OBSResponseTypes } from 'obs-websocket-js';
import { createContext, useRef, useState } from 'react';

export const ObsWebsocketContext = createContext({});

export function ObsWebsocketProvider({ children }) {
  const [isConnected, setConnection] = useState(false);
  const ws = useRef<OBSWebSocket>(new OBSWebSocket());

  async function connectObs() {
    if (isConnected) {
      try {
        ws.current = new OBSWebSocket();
        const obs = ws.current;
        const { obsWebSocketVersion, negotiatedRpcVersion } = await obs.connect(
          'ws://192.168.80.1:4455',
          'password',
          {
            rpcVersion: 1,
          },
        );
        console.log(
          `Connected to server ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`,
        );
      } catch (error: any) {
        console.error('Failed to connect', error.code, error.message);
      }
    } else {
      if (ws.current) {
        ws.current.disconnect();
      }
    }
  }

  return (
    <ObsWebsocketContext.Provider value={{ isConnected, ws }}>
      {children}
    </ObsWebsocketContext.Provider>
  );
}
