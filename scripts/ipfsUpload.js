const { create } = require('ipfs-http-client');
const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });

async function uploadToIPFS(fileName, fileContent) {
  const fileAdded = await ipfs.add({ path: fileName, content: fileContent });
  const fileHash = fileAdded.cid.toString();
  return fileHash;
}

module.exports = uploadToIPFS;