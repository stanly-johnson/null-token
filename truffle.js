module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks : {
    development : {
      host : "127.0.0.1",
      //port number for ganache
      port : "7545",
      //let all network_id to connect
      network_id : "*",
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: 4,
      gas: 4700000
    }
  }
};
