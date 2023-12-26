import React, { createContext, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import comfyJS, {ComfyJSInstance} from "comfy.js";
import { ITwitchContext } from "../Interfaces/ITwitchContext";

/**
 * @type {React.Context<{
 * ComfyJS: ComfyJSInstance,
 * twitchConnected: boolean, setTwitchConnected,
 * twitchUsername: string, setTwitchUsername,
 * token: string, setToken,
 * connectTwitchEvents, disconnectTwitchEvents,
 * getTwitch, clientId: string,
 * getPointRewards: Function, twitchRewards: Array,
 * setTwitchRewards
 * }>}
 */
export const TwitchContext = createContext<ITwitchContext>(null);

export function TwitchProvider ({children}) {
    // const toast = useToast();
    const clientId = 'ig4cpnmas95x65sd1wmltmycx6s9qe';
    const ComfyJS = comfyJS as any;

     // Add states below
    const [twitchConnected, setTwitchConnected] = useState(false)
  
    const [ twitchUsername, setTwitchUsername] = useState(() => {
      const saved = localStorage.getItem('twitchUsername');
      const initialValue = JSON.parse(saved);
      return initialValue || '';
    });

    const [ twitchRewards, setTwitchRewards ] = useState([])
    
    const [ token, setToken ] = useState(() => {
      const saved = localStorage.getItem('twitchToken');
      const initialValue = JSON.parse(saved);
      return initialValue || '';
    });

    const handleTwitchUsername = (username) => {
      setTwitchUsername(username);
      localStorage.setItem('twitchUsername', JSON.stringify(username))
    }

    // Add useEffect below
    useEffect(() => {
        ComfyJS.onConnected = () => {
          getPointRewards();
          setTwitchConnected(true)
          // toast({
          //   title: `Twitch Connected`,
          //   description: 'Twitch Connection has been successfully established',
          //   status: 'success',
          //   duration: 7000,
          //   isClosable: true
          // })
        }
    
        ComfyJS.onError = (err) => {
          console.error('err', err)
          // toast({
          //   title: 'Twitch Error',
          //   description: err,
          //   status: 'error',
          //   duration: 10000,
          //   isClosable: true
          // })
        }
        // ComfyJS.onChat()
    
      }, []);

   

    // Add Functions below
    /**
     * Connects to Twitch Event services only when twitch username and token is set
     */
    const connectTwitchEvents = () => {
        if (twitchUsername && twitchUsername !== '' && token) {
        ComfyJS.Init(twitchUsername, token, twitchUsername)
        } else {
          console.warn('Missing Auth')
        // toast({
        //     title: 'Missing Authentication',
        //     description: 'Please verify twitch username is entered and twitch has been authenticated in Settings',
        //     status: 'warning',
        //     duration: 10000,
        //     isClosable: true
        // })
        }
    }

    const disconnectTwitchEvents = () => {
        ComfyJS.Disconnect();
        setTwitchConnected(false);
        console.log('Twitch Disconnected')
        // toast({
        // title: `Twitch Disconnected`,
        // description: 'Twitch Connection has been successfully disconnected.',
        // status: 'success',
        // duration: 7000,
        // isClosable: true
        // })
    }

    const getTwitch = () => {
        console.log('token:', token)
    }

    const getPointRewards = async() => {
      const rewards = await ComfyJS.GetChannelRewards( clientId, false );
      const sortedRewards = rewards.sort((a, b) => a.cost > b.cost ? 1 : -1)
      setTwitchRewards(sortedRewards)

      console.log(sortedRewards)
    }



    return (
        <TwitchContext.Provider
            // variables and function that will be used globally
            value={
                {
                  ComfyJS,
                  twitchConnected, setTwitchConnected,
                  twitchUsername, handleTwitchUsername,
                  token, setToken,
                  connectTwitchEvents, disconnectTwitchEvents,
                  getTwitch, clientId,
                  getPointRewards, twitchRewards,
                  setTwitchRewards
                }
            }
        >
            {children}
        </TwitchContext.Provider>
    )
}