import React, { useState } from 'react';
import './components.css'; // Add this line to import styles

function FileSharing() {
  const [recipient, setRecipient] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Use the resolved address to send the file
    // ...
  };

  return (
    <div>
      <h2>File Sharing</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient's ENS name or Ethereum address"
        />
        <button className="bn632-hover bn24" type="submit">Share File</button> {/* Updated class */}
      </form>
    </div>
  );
}

export default FileSharing;