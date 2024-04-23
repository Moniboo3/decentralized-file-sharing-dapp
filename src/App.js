import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import FileSharingContract, { getFileHashes } from './FileSharingContract';
import FileUpload from './FileUpload';
import FileList from './FileList';
import FileSharing from './FileSharing';
import './App.css';

const App = () => {
  const [account, setAccount] = useState('');
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const initializeApp = async () => {
      // Check if Web3 provider is available
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          // Retrieve the list of files from the smart contract
          const fileHashes = await getFileHashes(accounts[0]);
          setFiles(fileHashes.map((hash) => ({ id: hash, name: hash })));
        } catch (error) {
          console.error('Error requesting account access:', error);
        }
      } else {
        console.error('Web3 provider not found');
      }
    };

    initializeApp();
  }, []);

  const handleFileUpload = async (fileHash) => {
    // Store the file hash in the smart contract
    await FileSharingContract.methods.storeFileHash(fileHash).send({ from: account });

    // Update the file list
    const fileHashes = await getFileHashes(account);
    setFiles(fileHashes.map((hash) => ({ id: hash, name: hash })));
  };

  return (
    <div className="app-container">
      {/* Header and Account Status */}
      <header className="app-header">
        <h1>WELCOME TO MON'S DAPP!</h1>
        <div className="account-info-container">
          <div className="account-info-label">Connected Account:</div>
          <div className="account-info-value">{account}</div>
        </div>
      </header>

      {/* File Upload and File List */}
      <section className="file-management">
        <FileUpload onUpload={handleFileUpload} />
        <FileList files={files} />
      </section>

      {/* Send Files */}
      <section className="file-sharing">
        <h2>Share your files here:</h2>
        <FileSharing account={account} />
      </section>
    </div>
  );
};

export default App;