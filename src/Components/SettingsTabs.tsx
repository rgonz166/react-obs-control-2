import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import ObsSettings from './ObsSettings';
import CustomTabPanel from './CustomTabPanel';
import TwitchSettings from './TwitchSettings';

function SettingsTabs() {
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const allProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  

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
        <TwitchSettings />
      </CustomTabPanel>
    </>
  );
}

export default SettingsTabs;
