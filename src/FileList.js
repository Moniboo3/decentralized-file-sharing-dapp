import React from 'react';
import { useEns } from '@ensdomains/ui';
import './components.css'; // Add this line to import styles

function FileList({ files }) {
  return (
    <div>
      <h2>File List</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            <FileDetails file={file} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FileDetails({ file }) {
  const { name } = useEns(file.owner);

  return (
    <div>
      <p>File Name: {file.name}</p>
      <p>Owner: {name || file.owner}</p>
      {/* Other file details */}
    </div>
  );
}

export default FileList;