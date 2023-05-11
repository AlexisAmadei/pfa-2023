import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const containerStyle = {
  width: '272px',
  height: 'min-content',
  borderRadius: '10px',
};

const qrReaderStyle = {
  width: '272px',
  height: '272px',
};

export default function QRreader(props) {
  const [data, setData] = useState('No result');

  return (
    <div style={containerStyle}>
      <QrReader
        onResult={(result, error) => {
          if (result) setData(result.text);
          if (error) console.info(error);
        }}
        constraints={{ facingMode: 'environment' }}
        style={qrReaderStyle}
        legacyMode
      />
      <p>{data}</p>
    </div>
  );
}
