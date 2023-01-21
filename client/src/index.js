const Web3 = require("web3");
const contractJSON = require("./resources/MetaCoin.json");

const getWeb3 = async () => {
    return new Promise(async (resolve, reject) => {
        const web3 = new Web3(window.ethereum);

        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            resolve (web3);
        } catch (error) {
            reject (error);
        }
    });
};

(() => {
    let web3, selectedAccount;
    document.getElementById("connectWallet").addEventListener('click', async () => {
        web3 = await getWeb3();
        const accounts = await web3.eth.requestAccounts();
        const accountBalanceInWei = await web3.eth.getBalance(accounts[0]);
        const accountBalanceInEth = web3.utils.fromWei(accountBalanceInWei, "ether");
        console.log(accountBalanceInEth);
        selectedAccount = accounts[0];
    });

    document.getElementById('sendCoins').addEventListener('click', async () => {
        const receiver = document.getElementById('receiver').value;
        const noOfCoinsToSend = document.getElementById('noOfCoins').value;
        const networkId = await web3.eth.net.getId();
        const contract = new web3.eth.Contract(
            contractJSON.abi,
            contractJSON.networks[networkId].address,
        );

        const result = await contract.methods.sendCoin(receiver, noOfCoinsToSend).send({ from: selectedAccount });
        console.log(result);
    });

    document.getElementById('getBalance').addEventListener('click', async () => {
        console.log(await web3.eth.getBalance(document.getElementById('address').value));
    });
})();