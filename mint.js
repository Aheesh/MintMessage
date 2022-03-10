


//step 3: Define the minting function
async function mintNFT(address,tokenURI) {

 //step 1: You define your variables from .env file
const API_URL = "https://eth-ropsten.alchemyapi.io/v2/yI0ys4zjxaeAalEKko5W8YFLPp6vo2IB";
const PUBLIC_KEY = "0xf827C1078d44316653F17BF10a085Aa2D0ea40Fe";
//Owen's key
//const PRIVATE_KEY = "c35e209335abc944b61ea593e8ffa1670fef2b529b7a54a7f0ba1e6d58fb5227";
//Aheesh - Gananche key (use for local or ropsten test)
const PRIVATE_KEY="427750cbe02e75056f17bc0ec437098474bf592bf8f15eca26bb8212d4fe6d41"

//const { createAlchemyWeb3 } = require("@alch/alchemy-web3");


//step 2: Define our contract ABI (Application Binary Interface) & adresses

// Ropsten contract address  
const contractAddress = "0xa8E381CaB19732aE8aDFE8A94d2dA2b8b5a97c78"; //Ropesten network contract 

// Ganache local testing for Aheesh
// const contractAddress = "0x8b53796d688ae836E3048aeF351411E4b9FC1cDE"; \
 
//const { createAlchemyWeb3 } = await fetch("@alch/alchemy-web3");
//const { createAlchemyWeb3 } = await fetch("./node_modules/@alch/alchemy-web3");
//const web3 = createAlchemyWeb3(API_URL);
console.log("***** In mintNFT()****",address,tokenURI);
//const web3 = await getWeb3();
const web3 = new Web3(window.ethereum);
console.log("web3", web3);

const accounts = await web3.eth.getAccounts();
console.log("accounts",accounts)
const getContract_abi = await fetch('./contracts/compiled/artworkabi.json');

var abistring=await getContract_abi.json();
console.log("getContract() typeof abistring--> ",typeof(abistring));
console.log("getContract() abistring object--> ",abistring);

const nftContract = await new web3.eth.Contract(abistring, contractAddress);

  const nonce = await web3.eth.getTransactionCount(accounts[0], 'latest'); //get latest nonce

  //the transaction
  const tx = {
    'from': accounts[0],
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    //'maxPriorityFeePerGas': 2000000,
    'data': nftContract.methods.registerArtwork(address, tokenURI).encodeABI()
  };

  //step 4: Sign the transaction
  const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
   console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
  
   //Change address (recipient) to address[0] i.e. sender from metamask
  var tokens = await nftContract.methods.balanceOf(accounts[0]).call();
      console.log("No . of tokens: ",tokens," :for account",accounts[0]);
      var myTokens = [];

    for (let i = 0; i < tokens; i++) {

        token_uri = await nftContract.methods.tokenURI(i).call();

        console.log("Token URI: ", token_uri, "Value: " ,i);
        myTokens.push(token_uri);
        
    }
    sessionStorage.setItem("token_uri", token_uri);
    sessionStorage.setItem("myTokens", myTokens);


}

//step 5: Call the mintNFT function
//mintNFT("ipfs.io/ipfs/QmVHfZxFXhoGMzaMyjLV547hGRTjKmZe8mYAk65npuxcW3");

