import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import ObsSettings from './ObsSettings';
import CustomTabPanel from './CustomTabPanel';

function SettingsTabs() {
  const [tab, setTab] = useState(0);
  const clientId = 'ig4cpnmas95x65sd1wmltmycx6s9qe';

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const allProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          aria-label="application settings tabs"
        >
          <Tab label="OBS Settings" {...allProps(0)} />
          <Tab label="Twitch Settings" {...allProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tab} index={0}>
        <ObsSettings />
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={1}>
        <button
          style={{ backgroundColor: '#6441a5' }}
          onClick={() => (window.location.href = twitchLink)}
        >
          Twitch Auth
        </button>
      </CustomTabPanel>
    </>
  );
}

export default SettingsTabs;
