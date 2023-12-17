import { useEffect, useRef, useState } from 'react';
import OBSWebSocket, { OBSResponseTypes } from 'obs-websocket-js';

export default function OBSWebSocketRef() {
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
      } catch (error: any) {
        console.error('Failed to connect', error.code, error.message);
      }
    } else {
      if (ws.current) {
        ws.current.disconnect();
      }
    }
  }

  useEffect(() => {
    connectObs();
    ws.current.on('ConnectionOpened', () =>
      console.log('Connection Successful'),
    );
    ws.current.on('ConnectionClosed', () => console.log('Connection Closed'));
    return () => {
      ws.current.disconnect();
    };
  }, [isConnected]);

  return (
    <div>
      <button onClick={() => setConnection(!isConnected)}>
        {isConnected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
}
