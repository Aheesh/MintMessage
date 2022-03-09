//step 1: You define your variables from .env file
const API_URL = "https://eth-ropsten.alchemyapi.io/v2/yI0ys4zjxaeAalEKko5W8YFLPp6vo2IB";
const PUBLIC_KEY = "0xf827C1078d44316653F17BF10a085Aa2D0ea40Fe";
const PRIVATE_KEY = "c35e209335abc944b61ea593e8ffa1670fef2b529b7a54a7f0ba1e6d58fb5227";


const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

//step 2: Define our contract ABI (Application Binary Interface) & adresses


const contract = require("./artwork_abi.json");

// console.log(contract);

const contractAddress = "0xa8E381CaB19732aE8aDFE8A94d2dA2b8b5a97c78";
const nftContract = new web3.eth.Contract(contract, contractAddress);

//step 3: Define the minting function
async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

  //the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.registerArtwork(PUBLIC_KEY, tokenURI).encodeABI()
  };

  //step 4: Sign the transaction
  const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
  console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}

//step 5: Call the mintNFT function
mintNFT("https://gateway.pinata.cloud/ipfs/Qmeou5f7ttU98n96mYWfYzKHV7pfRe5rcZBhYznHZCUV7M");
