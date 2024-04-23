import Web3 from 'web3';
import FileSharingABI from './contracts/FileSharing.json';

const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/HJOdb6OoZ56D5fem5KMZWnE4W4xOBKc-');
const contractAddress = '0x82102b9C80720A3830a18d613Dab28096f7F84a3'; // Replace with your deployed contract address
const fileSharingContract = new web3.eth.Contract(FileSharingABI.abi, contractAddress);

export default fileSharingContract;

export const getFileHashes = async (account) => {
  return await fileSharingContract.methods.getFileHashes(account).call();
};