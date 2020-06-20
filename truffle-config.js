const HDWalletProvider = require("truffle-hdwallet-provider");
const MNENOMIC = "little organ tobacco picnic orient during guard churn weather share spray regular jealous pipe monitor three inherit castle drop whale era water fog educate"
const INFURA_API_KEY = "fe850a1d3b5f4d4e9f9df5f6760e691d"

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () => new HDWalletProvider(MNENOMIC, "https://rinkeby.infura.io/v3/" + INFURA_API_KEY),
      network_id: 4,
      gas: 3000000,
      gasPrice: 10000000000
    },
  }
};
