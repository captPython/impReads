/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    ganache: {
      host: "localhost",
      port: 9545,
      network_id: "*" // Match any network id
    },
    geth: {
      host: "localhost",
      port: 8545,
      network_id: 3 // Match any network id
    }

  }
};