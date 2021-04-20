import { Magic } from 'magic-sdk';
import Web3 from 'web3';
import { MembershipABI } from './abi.js';

var web3;
var magic;
const addresses = {
    MembershipAddress: '0x1045a3172b78ABB5A222060Bc47FE0cE21CcbEf3'
}
var defaultUserAddress;
var MembershipContract;

const initialize = async () => {
    magic = new Magic("pk_test_7967AF810E630E08", {
        network: "rinkeby"
    });
    web3 = new Web3(magic.rpcProvider);

    defaultUserAddress = (await web3.eth.getAccounts())[0];

    console.log({ magic, web3, defaultUserAddress });

    /*  Smart contract values */
    MembershipContract = new web3.eth.Contract(
        JSON.parse(MembershipABI),
        addresses.MembershipAddress
    );
}

const isLoggedIn = async () => {
    return await magic.user.isLoggedIn();
}

const getUserMetadata = async () => {
    return await magic.user.getMetadata();
}

const getAddress = async () => {
    return (await web3.eth.getAccounts())[0];
}

const getEthBalance = async () => {
    const userBalance = web3.utils.fromWei(
        await web3.eth.getBalance(defaultUserAddress) // Balance is in wei
    );
    return userBalance;
}

const login = async function (email) {
    await magic.auth.loginWithMagicLink({ email });
}

const getMagic = function () {
    return magic;
}

const getWeb3 = function () {
    return web3;
}

const test = function () {
    console.log(`test ${++i}`);
}

const getMembershipInfo = async function (userAddress = defaultUserAddress) {
    const info = await MembershipContract.methods.info(userAddress).call();
    return info;
}

const mintMembershipToken = async function (userAddress = defaultUserAddress) {
    const receipt = await MembershipContract.methods
        .mint(userAddress, [], 1, 'api/token/1')
        .send({ from: userAddress });
    return receipt;
}

const confirmPayment = async function (userAddress = defaultUserAddress) {
    const receipt = await MembershipContract.methods
        .pay(1)
        .send({ from: userAddress });
    return receipt;
}

const confirmVerification = async function (userAddress = defaultUserAddress) {
    const receipt = await MembershipContract.methods
        .kyc("myID123")
        .send({ from: userAddress });
    return receipt;
}



//Get Address(string) from privateKey (string)
function privateKeyToAddress(privateKey) {
    return web3.eth.accounts.privateKeyToAccount(privateKey).address;
}

// Reusable function to perform transactions on any contract
const transact = async (data, contractAddress) => {
    try {
        const gasPrice = await web3.eth.getGasPrice();
        const txCount = await web3.eth.getTransactionCount(holderAddress);

        const txObject = {
            nonce: web3.utils.toHex(txCount),
            gasLimit: web3.utils.toHex(3500000),
            gasPrice: web3.utils.toHex(gasPrice),
            to: contractAddress,
            from: holderAddress,
            data: data
        }

        var tx = new TX(txObject, { chain: 'rinkeby', hardfork: 'petersburg' });
        tx.sign(privateKey);
        var serializedTxn = tx.serialize().toString('hex');

        const reciept = await web3.eth.sendSignedTransaction('0x' + serializedTxn);
        return reciept;
    } catch (e) {
        throw new Error(e);
    }
}

export {
    initialize,
    login,
    isLoggedIn,
    getUserMetadata,
    getAddress,
    getEthBalance,
    privateKeyToAddress,
    test,
    getMagic,
    getWeb3,
    mintMembershipToken,
    getMembershipInfo,
    confirmPayment,
    confirmVerification
};
// module.exports = {
//     // login,
//     isLoggedIn
//     // getUserMetadata,
//     // getAddress,
//     // getEthBalance,
//     // privateKeyToAddress,
//     // test,
//     // getMagic,
//     // getWeb3
// }