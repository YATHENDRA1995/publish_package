import { Magic } from '@magic-sdk/admin';
import Web3 from 'web3';

const initialize = () => {
    const magic = new Magic("pk_test_7967AF810E630E08", {
      network: "rinkeby"
    });
    const web3 = new Web3(magic.rpcProvider);
  
    /*  Smart contract values */
    console.log({ magic });
  }
  

let i = 0;

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
        await web3.eth.getBalance(userAddress) // Balance is in wei
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
    getWeb3
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