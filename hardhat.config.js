require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/HJOdb6OoZ56D5fem5KMZWnE4W4xOBKc-",
      accounts: ["2cb0ad4535f69b08001ab45277a7652eed03004440fa9676d00fd6267c7466b3"]
    }
  }
};