import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const added = await ipfs.add(file);
      const url = `https://ipfs.io/ipfs/${added.path}`;
      console.log('File uploaded to:', url);
      // TODO: Save the IPFS hash to the smart contract
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;