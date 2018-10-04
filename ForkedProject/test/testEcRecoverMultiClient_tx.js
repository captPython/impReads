var Test = artifacts.require("./Test.sol")
var ethUtil = require('ethereumjs-util')
var Web3 = require('web3')
const BigNumber = web3.BigNumber
const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should()

contract('Multi-client Test', function (accounts) {

    beforeEach(async function () {
        try {
            this.contract = await Test.new()

            var version = "Geth"

            //client
            if (version.includes('TestRPC'))
                this.nodeVersion = 'testrpc'
            else if (version.includes('Geth'))
                this.nodeVersion = 'geth'
            else if (version.includes('Parity'))
                this.nodeVersion = 'parity'
        } catch (error) {
            console.log(error);
        }
    })

    it("ecrecover1: Signed messages should return signing address", async function () {
        try {

            const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

            const abi = [
                {
                    "constant": true,
                    "inputs": [],
                    "name": "name",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_spender",
                            "type": "address"
                        },
                        {
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "approve",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_from",
                            "type": "address"
                        },
                        {
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "transferFrom",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "INITIAL_SUPPLY",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "decimals",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_spender",
                            "type": "address"
                        },
                        {
                            "name": "_subtractedValue",
                            "type": "uint256"
                        }
                    ],
                    "name": "decreaseApproval",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_owner",
                            "type": "address"
                        }
                    ],
                    "name": "balanceOf",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [],
                    "name": "symbol",
                    "outputs": [
                        {
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_to",
                            "type": "address"
                        },
                        {
                            "name": "_value",
                            "type": "uint256"
                        }
                    ],
                    "name": "transfer",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": false,
                    "inputs": [
                        {
                            "name": "_spender",
                            "type": "address"
                        },
                        {
                            "name": "_addedValue",
                            "type": "uint256"
                        }
                    ],
                    "name": "increaseApproval",
                    "outputs": [
                        {
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "constant": true,
                    "inputs": [
                        {
                            "name": "_owner",
                            "type": "address"
                        },
                        {
                            "name": "_spender",
                            "type": "address"
                        }
                    ],
                    "name": "allowance",
                    "outputs": [
                        {
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "payable": false,
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "payable": false,
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "name": "owner",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "name": "spender",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Approval",
                    "type": "event"
                },
                {
                    "anonymous": false,
                    "inputs": [
                        {
                            "indexed": true,
                            "name": "from",
                            "type": "address"
                        },
                        {
                            "indexed": true,
                            "name": "to",
                            "type": "address"
                        },
                        {
                            "indexed": false,
                            "name": "value",
                            "type": "uint256"
                        }
                    ],
                    "name": "Transfer",
                    "type": "event"
                }
            ];
            contractAddress = '0xefd0cd6deb9ffe77d82e119b6854f4a52379ca4a';
            const contractInstance = await new web3.eth.Contract(abi, contractAddress);

            const nonce = await web3.eth.getTransactionCount(accounts[0]);
            const chainId = await web3.eth.net.getId();
            const gasPrice = await web3.eth.getGasPrice();
            const gasLimit = 200000;
            let amount = web3.utils.toWei('1', 'ether');
            // https://github.com/ethereum/web3.js/issues/1151 mentioned in this thread
            const data = await contractInstance.methods.transfer(accounts[1], amount).encodeABI(); // a new version of web3 1.x
            // contract.transfer.getData(userAddress, tokenValues); // old version

            // https://github.com/ethereum/web3.js/issues/1609
            var txObj = {
                "from": accounts[0],
                "nonce": web3.utils.toHex(nonce),
                "to": contractAddress,
                "value": '0x0',
                "gasPrice": web3.utils.toHex(gasPrice),
                "gasLimit": web3.utils.toHex(gasLimit),
                "data": data
            };

            await web3.eth.personal.unlockAccount(accounts[0], "Learn2018", 600);
            const messagetoSign = web3.utils.sha3(txObj)

            let messagetoSend = messagetoSign
            console.log("Account --> ", accounts[0]);
            const unlockedAccount = accounts[0]
            var signature = await web3.eth.sign(unlockedAccount, messagetoSign)

            console.log(this.nodeVersion)
            console.log(this.nodeVersion + ' sig: ' + signature)
            console.log(this.nodeVersion + ' msg2sign: ' + messagetoSign)
            console.log(this.nodeVersion + ' msg2send: ' + messagetoSend)
            console.log()
            console.log()

            signatureData = ethUtil.fromRpcSig(signature)
            let v = ethUtil.bufferToHex(signatureData.v)
            let r = ethUtil.bufferToHex(signatureData.r)
            let s = ethUtil.bufferToHex(signatureData.s)

            const recoveredAddress = await this.contract.ecrecover1(messagetoSend, v, r, s);
            console.log("accounts --> ", accounts);
            console.log("1 Recovered Address --> ", recoveredAddress);
            console.log("1 unlocked Account --> ", unlockedAccount);
            recoveredAddress.should.be.equal(unlockedAccount, 'The recovered address should match the signing address')

        } catch (error) {
            console.log(error);
        }

    })
    /*
        it("ecrecover2: Signed messages should return signing address", async function () {
            try {
    
                const message = rawTx;
                let messagetoSign = ethUtil.bufferToHex(new Buffer(message))
                let messagetoSend
                let hashBuff
                let msgHashBuff
    
                switch (this.nodeVersion) {
                    default:
                        hashBuff = ethUtil.toBuffer(message)
                        msgHashBuff = ethUtil.hashPersonalMessage(hashBuff)
                        messagetoSend = ethUtil.bufferToHex(msgHashBuff)
                        break
                }
    
                const unlockedAccount = accounts[0]
                var signature = await web3.eth.sign(unlockedAccount, messagetoSign)
    
                console.log(this.nodeVersion)
                console.log(this.nodeVersion + ' sig: ' + signature)
                console.log(this.nodeVersion + ' msg2sign: ' + messagetoSign)
                console.log(this.nodeVersion + ' msg2send: ' + messagetoSend)
                console.log()
                console.log()
    
                signatureData = ethUtil.fromRpcSig(signature)
                let v = ethUtil.bufferToHex(signatureData.v)
                let r = ethUtil.bufferToHex(signatureData.r)
                let s = ethUtil.bufferToHex(signatureData.s)
    
                const recoveredAddress = await this.contract.ecrecover2(messagetoSend, v, r, s)
                console.log("recoveredAddress", recoveredAddress);
                recoveredAddress.should.be.equal(unlockedAccount, 'The recovered address should match the signing address')
            } catch (error) {
                console.log(error);
            }
    
        })
    
        it("ecrecover3: Signed messages should return signing address", async function () {
            try {
                //   await web3.eth.personal.unlockAccount(accounts[0], "Learn2018", 600)
                //const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'));
                const nonce = await web3.eth.getTransactionCount(accounts[0]);
                // const chainId = await web3.eth.net.getId();
                const gasPrice = await web3.eth.getGasPrice();
                const amount = 10000000; //await web3.utils.toWei('1', 'ether');
                escrow = "0x68f0b7ba563c4ca94357f3be01d86f7d64113626"; 838
    
                let rawTx = {
                    nonce: nonce,
                    chainId: 4447,
                    gas: 2000000,
                    gasPrice: gasPrice,
                    to: escrow,
                    value: amount
                }
                const message = rawTx;
                let messagetoSign = ethUtil.bufferToHex(new Buffer(message))
                let messagetoSend
                let hashBuff
                let msgHashBuff
    
                switch (this.nodeVersion) {
                    default:
                        hashBuff = ethUtil.toBuffer(message)
                        msgHashBuff = ethUtil.hashPersonalMessage(hashBuff)
                        messagetoSend = ethUtil.bufferToHex(msgHashBuff)
                        break
                }
    
                const unlockedAccount = accounts[0]
                var signature = await web3.eth.sign(unlockedAccount, messagetoSign)
    
                console.log(this.nodeVersion)
                console.log(this.nodeVersion + ' sig: ' + signature)
                console.log(this.nodeVersion + ' msg2sign: ' + messagetoSign)
                console.log(this.nodeVersion + ' msg2send: ' + messagetoSend)
                console.log()
                console.log()
    
                signatureData = ethUtil.fromRpcSig(signature)
                let v = ethUtil.bufferToHex(signatureData.v)
                let r = ethUtil.bufferToHex(signatureData.r)
                let s = ethUtil.bufferToHex(signatureData.s)
    
                const recoveredAddress = await this.contract.ecrecover3(messagetoSend, v, r, s)
                console.log("recoveredAddress", recoveredAddress);
                recoveredAddress.should.be.equal(unlockedAccount, 'The recovered address should match the signing address')
            } catch (error) {
                console.log(error);
            }
    
        })
    
    
        // it("ecrecover1: Presigned message should verify address", async function () {
    
        //     // Signed using geth 
        //     const message = web3.sha3('IT People test of ecrecover.')
        //     const signingAccount = '0xbc6d23fd444aa9f40fb22adad3afe702716dc62a'
        //     const signature = '0xc46cdc50a66f4d07c6e9a127a7277e882fb21bcfb5b068f2b58c7f7283993b790bdb5f0ac79d1a7efdc255f399a045038c1b433e9d06c1b1abd58a5fcaab33f11c'
    
        //     r = signature.substr(0, 66)
        //     s = '0x' + signature.substr(66, 64)
        //     v = '0x' + signature.substr(130, 2)
    
        //     const recoveredAddress = await this.contract.ecrecover1(message, v, r, s)
        //     recoveredAddress.should.be.equal(signingAccount, 'The recovered address should match the signing address')
        // }) */

});