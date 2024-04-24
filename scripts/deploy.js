const Web3 = require('web3');
const fs = require('fs');
const uploadToIPFS = require('./ipfsUpload');

async function main() {
  // Connect to the Sepolia network using the Alchemy API URL
  const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/HJOdb6OoZ56D5fem5KMZWnE4W4xOBKc-');

  // Load the contract ABI and bytecode
  const contractJson = JSON.parse(fs.readFileSync('./artifacts/contracts/FileSharing.sol/FileSharing.json', 'utf8'));
  const contractABI = contractJson.abi;
  const contractBytecode = contractJson.bytecode;

  // Set the deployer account private key
  const deployerPrivateKey = '2cb0ad4535f69b08001ab45277a7652eed03004440fa9676d00fd6267c7466b3';

  // Create an instance of the contract
  const FileSharingContract = new web3.eth.Contract(contractABI);

  // Deploy the contract
  const deployTx = FileSharingContract.deploy({
    data: contractBytecode,
    arguments: []
  });

  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      from: web3.eth.accounts.privateKeyToAccount(deployerPrivateKey).address,
      data: deployTx.encodeABI(),
      gas: await deployTx.estimateGas()
    },
    deployerPrivateKey
  );

  const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
  console.log('Contract deployed at address', createReceipt.contractAddress);

  const sampleFile = {
    fileName: "sample.txt",
    fileContent: "This is a sample file content"
  };
  const fileHash = await uploadToIPFS(sampleFile.fileName, sampleFile.fileContent);
  console.log("Sample file uploaded to IPFS with hash:", fileHash);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });