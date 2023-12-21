import { useContext, useState } from 'react';
import { ObsWebsocketContext } from '../Contexts/ObsWebsocketContext';
import { OBSResponseTypes } from 'obs-websocket-js';

function ObsStats() {
  const [cpuUsage, setCpuUsage] = useState(0);

  const { ws } = useContext(ObsWebsocketContext);

  const getStats = async () => {
    const results = await ws.current.callBatch([
      {
        requestType: 'GetSceneItemList',
        requestData: { sceneName: 'test' },
      },
    ]);

    console.log(
      'Stats: ',
      results[0].responseData as OBSResponseTypes['GetStats'],
    );
    setCpuUsage(
      (results[0].responseData as OBSResponseTypes['GetStats']).cpuUsage,
    );
  };

  return (
    <>
      <div>CPU Usage: {cpuUsage}</div>
      <button onClick={() => getStats()}>Check</button>
    </>
  );
}

export default ObsStats;
