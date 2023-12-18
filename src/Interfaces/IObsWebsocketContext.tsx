import OBSWebSocket from 'obs-websocket-js';

export interface IObsWebsocketContext {
  isConnected: boolean;
  setConnection: React.Dispatch<React.SetStateAction<boolean>>;
  ws: React.MutableRefObject<OBSWebSocket>;
  connectObs();
  handleDisconnect();
}
