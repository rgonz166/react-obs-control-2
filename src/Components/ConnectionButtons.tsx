import React, { useContext } from "react"
import { TwitchContext } from "../Contexts/TwitchContext"




const ConnectionButtons = () => {

    // const {obsConnected, connectObs, disconnectObs} = useContext(ObsContext)
    const {connectTwitchEvents, disconnectTwitchEvents, twitchConnected} = useContext(TwitchContext)

    return (
    <>
    {/* {
        obsConnected ? 
        <button onClick={() => { disconnectObs() }}>Disconnect OBS</button>
        :
        <button onClick={async () => { connectObs() }}>Connect OBS</button>
    } */}
    {
        twitchConnected ? 
        <button onClick={() => { disconnectTwitchEvents() }} style={{'backgroundColor': '#6441a5'}}>Disconnect Twitch</button>
        :
        <button onClick={() => { connectTwitchEvents() }} style={{'backgroundColor': '#6441a5'}}>Connect Twitch</button>
    
    }
    </>
    )
}

export default ConnectionButtons