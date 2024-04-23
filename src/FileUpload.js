import React, { useState } from 'react';
import { create } from 'ipfs-http-client';
import './components.css';

const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const added = await ipfs.add(file);
      const fileHash = added.path;
      onUpload(fileHash);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button className="bn632-hover bn24" onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;