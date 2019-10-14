module.exports = {
  // Ver <http://truffleframework.com/docs/advanced/configuration>
  // Para personalizar as configurações do truffle
  networks: {
    development: {
      host: "127.0.0.1",
      port: "7545",
      network_id: "*" //corresponde a qualquer network id
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      network_id: 4,
      gas: 4700000
    }
  }
};
