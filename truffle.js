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
    }
  }
};
