import React from 'react';
import QRCode from 'qrcode.react';

const QrCodeComponent = (url) => {
  return <QRCode size={50} value={url} />;
};

export default QrCodeComponent;
