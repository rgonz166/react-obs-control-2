import { useEffect, useRef, useState } from 'react';
import OBSWebSocket, { OBSResponseTypes } from 'obs-websocket-js';

export default function OBSWebSocketRef() {
  const [isConnected, setConnection] = useState(false);
  const ws = useRef<OBSWebSocket>(new OBSWebSocket());

  async function connectObs() {
    try {
      if (!isConnected) {
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
        setConnection(true);

        const results = await obs.callBatch([
          {
            requestType: 'GetVersion',
          },
          {
            requestType: 'TriggerStudioModeTransition',
          },
        ]);

        console.log(
          'OBS Version: ',
          (results[0].responseData as OBSResponseTypes['GetVersion'])
            .obsVersion,
        );
      }
    } catch (error: any) {
      console.error('Failed to connect', error.code, error.message);
      setConnection(false);
    }
  }

  useEffect(() => {
    ws.current.on('ConnectionOpened', () => {
      console.log('Connection Successful');
      setConnection(true);
    });
    ws.current.on('ConnectionClosed', () => {
      console.log('Connection Closed');
      setConnection(false);
    });
    return () => {
      ws.current.disconnect();
    };
  }, []);

  const handleConnect = () => {
    connectObs();
  };
  const handleDisconnect = () => {
    ws.current.disconnect();
    setConnection(false);
  };

  return (
    <div>
      {isConnected ? (
        <button onClick={() => handleDisconnect()}>Disconnect</button>
      ) : (
        <button onClick={() => handleConnect()}>Connect</button>
      )}
    </div>
  );
}
