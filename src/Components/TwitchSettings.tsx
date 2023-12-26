import React, { useContext, useState } from 'react'
import { TwitchContext } from '../Contexts/TwitchContext';
import { FormControl, FormGroup, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

function TwitchSettings() {

  const {clientId, twitchUsername, handleTwitchUsername} = useContext(TwitchContext)
  const [tempUser, setTempUser] = useState(twitchUsername || '')

  const handleSave = () => {
    handleTwitchUsername(tempUser);
  }

  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : 'https://rgonz166.github.io';
  const redirectUrl = baseUrl + '/auth/';
  const scopes =
    'channel:manage:redemptions channel:read:redemptions channel:read:hype_train channel:read:subscriptions moderation:read moderation:read user:edit user:read:email chat:edit chat:read';
  const twitchLink = `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${clientId}&force_verify=true&redirect_uri=${redirectUrl}&scope=${scopes}`;
  return (
    <>
    <FormGroup>
      <FormControl>
        <InputLabel htmlFor="twitch-username">Twitch Username</InputLabel>
        <OutlinedInput type='text' value={tempUser} onChange={(event) => setTempUser(event.target.value)} />
        <FormHelperText>The Twitch Username Channel to connect</FormHelperText>
      </FormControl>

    </FormGroup>
    <button onClick={() => handleSave()}>Save Twitch Username</button><br />
    <button
      style={{ backgroundColor: '#6441a5' }}
      onClick={() => (window.location.href = twitchLink)}
    >
      Twitch Auth
    </button>
    </>
  )
}

export default TwitchSettings