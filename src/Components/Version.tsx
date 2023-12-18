import React from 'react';
import packageJson from '../../package.json';

const fixedStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '5px',
  right: '15px',
  opacity: '20%',
};

const Version = () => {
  return (
    <div style={fixedStyle}>
      {process.env.NODE_ENV === 'development' ? `(Development Mode)` : ``}{' '}
      Version: {packageJson.version}
    </div>
  );
};

export default Version;
