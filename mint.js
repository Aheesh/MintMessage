//import EthCrypto from 'eth-crypto';
//const EthCrypto = require('eth-crypto');


//step 3: Define the minting function
async function mintNFT(address,tokenURI) {


//const PUBLIC_KEY = "0xf827C1078d44316653F17BF10a085Aa2D0ea40Fe";
//const PRIVATE_KEY = "c35e209335abc944b61ea593e8ffa1670fef2b529b7a54a7f0ba1e6d58fb5227";
//Owen's key

//Aheesh's wallet details Gananche key (use for local or ropsten test)
//const PUBLIC_KEY ="0x61a41cAc3bA62b00b53a1D94C4f9233B530858C8"
//const PRIVATE_KEY="427750cbe02e75056f17bc0ec437098474bf592bf8f15eca26bb8212d4fe6d41"

console.log("***** In mintNFT()****",address,tokenURI);
//const web3 = await getWeb3();
const web3 = new Web3(window.ethereum);
await window.ethereum.enable();
console.log("web3", web3);

const accounts = await web3.eth.getAccounts();
console.log("accounts",accounts)

const ChainID = await web3.eth.net.getId();
console.log("****** CHAIN ID *****",ChainID);
var contractAddress;
// Ropsten contract address  
if (ChainID == 3) {
  console.log("Setting Contract to Ropsten Testnet Address")
  contractAddress = "0xa8E381CaB19732aE8aDFE8A94d2dA2b8b5a97c78"; //Ropsten network contract 
} else if (ChainID==5777) { 
  // SET GANACHE CONTRACT ADDRESS HERE
  console.log("Setting Contract to Local Ganache Address")
  contractAddress = "0x0cdba2Bd0d503cb16c46f74dE2E231244Aba6B88"; //Ganache - local address 
} else {
  console.log("Network not configured for contract call in Mint.js")
}

const getContract_abi = await fetch('./contracts/compiled/artworkabi.json');

var abistring=await getContract_abi.json();
console.log("getContract() typeof abistring--> ",typeof(abistring));
console.log("getContract() abistring object--> ",abistring);

/*
// Encrypt the tokenURI with recipient's public wallet address
const encryptedIPFS = await EthCrypto.encryptWithPublicKey( 
  address,
  JSON.stringify(tokenURI)
);

console.log("encrypted IPFS ",encryptedIPFS);
const encryptedString = EthCrypto.cipher.stringify(encryptedIPFS);
console.log("encrypted smaller string-representation",encryptedString);*/

// Contract connection set-up
const nftContract = await new web3.eth.Contract(abistring, contractAddress);

  const transactionReceipt = await nftContract.methods.registerArtwork(address,tokenURI).send({from:accounts[0]});

  console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
  
  //For inbox functionality
  // Get no. of tokens for a wallet address.
  // get the token ids owned by the wallet address.
  var tokens = await nftContract.methods.balanceOf(accounts[0]).call();
      console.log("No . of tokens: ",tokens," :for account",accounts[0]);

  // Build the message inbox    
  const tokens_inbox =[];  
  var token_URI;  
  let body = document.body;
  let tbl = document.createElement('table');
  tbl.style.width= '200px';
  tbl.style.border = '1px solid black'

    for (let i = 0; i < tokens; i++) {

        token_index = await nftContract.methods.tokenOfOwnerByIndex(accounts[0],i).call();
        token_URI= await nftContract.methods.tokenURI(token_index).call();
        /*
        // Decrypting string to get IPFS hash
        var encryptedObject = EthCrypto.cipher.parse(token_URI);
        var decrypted = await EthCrypto.decryptWithPrivateKey(
          address[0].privateKey,
          encryptedObject
        )
        var decryptedPayload = JSON.parse(decrypted);
        // End of decrypting IPFS */

        console.log("Token Index: ", token_index, "Value: " ,i,"Message URI:",token_URI);
        let tr=tbl.insertRow();
        
        for (let j=0; j < 1 ; j++) {
          let td=tr.insertCell();
          //Build the ipfs link 
          var a = document.createElement('a');
          var linkText = document.createTextNode(`Message link here`);
          a.appendChild(linkText);
          a.title=`Message link`;
          a.href=`https://ipfs.io/ipfs/${token_URI}`;
          a.style.color=("#0000FF");
          console.log("A value",a);
          td.appendChild(document.createTextNode(`${token_index}`));
          td.append(a);
          td.style.border='1px solid black';
        }
        tokens_inbox.push(token_index);
       
      }
      body.appendChild(tbl);

    console.log("The list of token ids for inbox",tokens_inbox);
 
}



