import {
  FormControl,
  FormGroup,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useContext, useState } from 'react';
import { UserDataContext } from '../Contexts/UserDataContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Settings = () => {
  const {
    obsServerAddress,
    handleServerAddress,
    obsServerPort,
    handleServerPort,
    obsServerPassword,
    handleServerPassword,
  } = useContext(UserDataContext);

  // Temp data
  const [tempAddress, setTempAddress] = useState(obsServerAddress);
  const [tempPort, setTempPort] = useState(obsServerPort);
  const [tempPassword, setTempPassword] = useState(obsServerPassword);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const inputStyle: React.CSSProperties = {
    fontWeight: 'bold',
    color: 'white',
  };

  const handleSaveData = () => {
    handleServerAddress(tempAddress);
    handleServerPort(tempPort);
    handleServerPassword(tempPassword);
  };
  return (
    <>
      <div>Settings</div>
      <br />
      <FormGroup>
        <FormControl fullWidth>
          <InputLabel htmlFor="serverAddress" style={inputStyle}>
            OBS Websocket Address
          </InputLabel>
          <OutlinedInput
            id="serverAddress"
            type="text"
            onChange={(event) => setTempAddress(event.target.value)}
            value={tempAddress}
            placeholder="Ex. 192.168.0.1"
          />
          <FormHelperText>IP Address for your OBS Websocket</FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <InputLabel htmlFor="serverPort" style={inputStyle}>
            OBS Websocket Port
          </InputLabel>
          <OutlinedInput
            id="serverPort"
            type="number"
            onChange={(event) => setTempPort(+event.target.value)}
            value={tempPort}
            placeholder="Ex. 4455"
          />
          <FormHelperText>PORT number for your OBS Websocket</FormHelperText>
        </FormControl>
        <br />
        <FormControl>
          <InputLabel htmlFor="serverPassword" style={inputStyle}>
            OBS Websocket Password
          </InputLabel>
          <OutlinedInput
            id="serverPassword"
            type={showPassword ? 'text' : 'password'}
            onChange={(event) => setTempPassword(event.target.value)}
            value={tempPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>Password for your OBS Websocket</FormHelperText>
        </FormControl>
      </FormGroup>
      <button onClick={() => handleSaveData()}>Save</button>
    </>
  );
};

export default Settings;
