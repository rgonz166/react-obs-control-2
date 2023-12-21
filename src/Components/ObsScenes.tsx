import { useContext, useEffect, useState } from 'react';
import { ObsWebsocketContext } from '../Contexts/ObsWebsocketContext';
import { IObsScenes } from '../Interfaces/IObsScenes';
import { MediaActions } from '../Enums/MediaActions.enum';

function ObsScenes() {
  const { ws, isConnected } = useContext(ObsWebsocketContext);
  const [scenes, setScenes] = useState([]);

  //TODO If getting sources works, make a function to update all the lists when calling and grabbing the lists

  const handleScenePromise = async () => {
    return await ws.current.call('GetSceneList').then((list) => list.scenes);
  };

  const getObsData = async () => {
    handleScenePromise().then(async (value) => {
      for (let scene of value) {
        scene['sources'] = await ws.current
          .call('GetSceneItemList', {
            sceneName: scene.sceneName.toString(),
          })
          .then(async (res) => {
            const sources = handleGroupData(res.sceneItems);
            return sources;
          });
      }
      setScenes(value.reverse());
    });
  };

  const handleGroupData = async (sources) => {
    for (let source of sources) {
      if (source.isGroup) {
        // Check if isGroup is true
        source['sources'] = await ws.current.call('GetGroupSceneItemList', {
          sceneName: source.sourceName.toString(),
        });
      }
    }
    return sources;
  };

  const getGroup = async () => {
    return await ws.current
      .call('GetGroupSceneItemList', { sceneName: 'Test Random Group' })
      .then((group) => {
        console.log('group', group);
        return group;
      });
  };

  const getMedia = async () => {
    ws.current.on('InputActiveStateChanged', (data) => {
      console.log('data', data);
    });
    return await ws.current
      // .call('GetMediaInputStatus', { inputName: 'Video 1' })
      .call('TriggerMediaInputAction', {
        inputName: 'Nice',
        mediaAction: MediaActions.RESTART,
      });
  };

  const restartMedia = async (video) => {
    return await ws.current
      // .call('GetMediaInputStatus', { inputName: 'Video 1' })
      .call('TriggerMediaInputAction', {
        inputName: video,
        mediaAction: 'OBS_WEBSOCKET_MEDIA_INPUT_ACTION_RESTART',
      })
      .then((res) => console.log(res));
  };

  useEffect(() => console.log('scenes', scenes), [scenes]);
  useEffect(() => {
    ws.current.on('InputActiveStateChanged', (data) => {
      console.log('data', data);
    });
  }, []);

  return (
    <>
      <div>ObsScenes</div>
      <button onClick={() => getObsData()} disabled={!isConnected}>
        Get Scenes
      </button>
      <button onClick={() => getMedia()} disabled={!isConnected}>
        Get Media
      </button>
    </>
  );
}

export default ObsScenes;
