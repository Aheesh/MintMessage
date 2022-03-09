import jsondata from './contracts/compiled/artwork_abi.json'

async function loginWithEth() {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
      var accounts = await web3.eth.getAccounts();
    } catch (error) {
      console.error(error);
    }
  } else {
    alert('No Eth Browser Extension detected');
  }
}