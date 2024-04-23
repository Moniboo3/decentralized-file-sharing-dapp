import { create } from 'ipfs-http-client';

const ipfs = create({ url: 'http://localhost:5001' }); // Replace with your IPFS node URL

export default ipfs;