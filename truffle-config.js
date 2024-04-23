const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKey = '2cb0ad4535f69b08001ab45277a7652eed03004440fa9676d00fd6267c7466b3';
const alchemyUrl = 'https://eth-sepolia.g.alchemy.com/v2/HJOdb6OoZ56D5fem5KMZWnE4W4xOBKc-';

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(privateKey, alchemyUrl),
      network_id: 11155111,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: '0.8.0',
    },
  },
};