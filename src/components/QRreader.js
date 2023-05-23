import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const containerStyle = {
  width: '272px',
  height: 'min-content',
  borderRadius: '50%',
  alignSelf: 'center',
  // zIndex: '1',
};

const qrReaderStyle = {
  width: '272px',
  height: '272px'
};

export default function QRreader({ getReturnValue }) {
  const [data, setData] = useState('No result');

  const storeBorneID = (borneID) => {
    localStorage.setItem('borneID', borneID);
  };

  return (
    <div style={containerStyle}>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            setData(result.text);
            getReturnValue(result.text);
            storeBorneID(result.text);
          }
          if (error) console.info(error);
        }}
        constraints={{ facingMode: 'environment' }}
        style={qrReaderStyle}
        legacyMode={true}
      />
    </div>
  );
}
