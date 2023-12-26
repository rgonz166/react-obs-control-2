import { ComfyJSInstance } from "comfy.js";
import { Dispatch, SetStateAction } from "react";

export interface ITwitchContext {
  ComfyJS: ComfyJSInstance;
  twitchConnected: boolean;
  setTwitchConnected: Dispatch<SetStateAction<boolean>>;
  twitchUsername: string;
  handleTwitchUsername(username: string);
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  connectTwitchEvents();
  disconnectTwitchEvents();
  getTwitch();
  clientId: string;
  getPointRewards();
  twitchRewards: any[];
  setTwitchRewards: Dispatch<SetStateAction<any[]>>
}