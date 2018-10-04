var Test = artifacts.require("./Test.sol")
var ethUtil = require('ethereumjs-util')
const BigNumber = web3.BigNumber
const should = require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should()

contract('Multi-client Test', function (accounts) {

    beforeEach(async function () {
        this.contract = await Test.new()

        var version = web3.version.node
        console.log('Ethereum Client: ' + version)

        //client
        if (version.includes('TestRPC'))
            this.nodeVersion = 'testrpc'
        else if (version.includes('Geth'))
            this.nodeVersion = 'geth'
        else if (version.includes('Parity'))
            this.nodeVersion = 'parity'

    })

    it("ecrecover1: Signed messages should return signing address", async function () {

        const messagetoSign = web3.sha3('Message to sign here.')
        let messagetoSend = messagetoSign
        console.log("accounts --> ", accounts);

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
        console.log("1 Recovered Address --> ", recoveredAddress);
        console.log("1 unlocked Account --> ", unlockedAccount);

        recoveredAddress.should.be.equal(unlockedAccount, 'The recovered address should match the signing address')
    })

    it("ecrecover2: Signed messages should return signing address", async function () {

        const message = 'Message to sign here.'
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
        console.log("2. Recovered Address --> ", recoveredAddress);
        recoveredAddress.should.be.equal(unlockedAccount, 'The recovered address should match the signing address')
    })

    it("ecrecover3: Signed messages should return signing address", async function () {

        const message = 'Message to sign here.'
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
        console.log("3. Recovered Address --> ", recoveredAddress);
        recoveredAddress.should.be.equal(unlockedAccount, 'The recovered address should match the signing address')
    })


    it("ecrecover1: Presigned message should verify address", async function () {

        // Signed using geth 
        const message = web3.sha3('IT People test of ecrecover.')
        const signingAccount = '0xbc6d23fd444aa9f40fb22adad3afe702716dc62a'
        const signature = '0xc46cdc50a66f4d07c6e9a127a7277e882fb21bcfb5b068f2b58c7f7283993b790bdb5f0ac79d1a7efdc255f399a045038c1b433e9d06c1b1abd58a5fcaab33f11c'

        r = signature.substr(0, 66)
        s = '0x' + signature.substr(66, 64)
        v = '0x' + signature.substr(130, 2)

        const recoveredAddress = await this.contract.ecrecover1(message, v, r, s)
        console.log("4. Recovered Address --> ", recoveredAddress);
        console.log("4. Signing Account --> ", signingAccount);
        recoveredAddress.should.be.equal(signingAccount, 'The recovered address should match the signing address')
    })
})