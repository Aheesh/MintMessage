 function URI_Fetch(myCallback) 
{
    var y = document.getElementById("messageArea").value;
    var x = document.getElementById("recepientAddress").value;
    var f = '{"address" :"'+x +'", "message" :"' +y +' "}'
    console.log(f)
    
    //const myJSON= '{"address":"0x123456", "message":"I want to buy your NFT"}';
    //const myObj = JSON.parse(myJSON);

    const myObj = JSON.parse(f);
    document.getElementById("demo").innerHTML = myObj.address; 
    var pinData;
    fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'pinata_api_key': "26689a58bbd3e05207c5",
      'pinata_secret_api_key': "622c0634c379b1139f92dfd22f6dd79dd600df1eb09bec13cb70456a5e3835fa"
    }, 
    body: JSON.stringify(myObj),
    })
    .then(response => response.json())
    .then(data => {

    console.log('Success:',data);
    pinData=data;
    console.log('IpfsHash:',pinData.IpfsHash);
    console.log('Timestamp',pinData.Timestamp);


    myCallback(data)
    })
    .catch((error) => {
    console.error('Error:', error);
    });

    /*var messageUri = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      'pinata_api_key': "26689a58bbd3e05207c5",
      'pinata_secret_api_key': "622c0634c379b1139f92dfd22f6dd79dd600df1eb09bec13cb70456a5e3835fa"

      },
     body: JSON.stringify(myObj), 
    })

    console.log('Success:',messageUri);
    console.log('IpfsHash:',messageUri.IpfsHash);
    console.log('Timestamp',messageUri.Timestamp);*/


    //Message posted on pinata. Now call Mint function.
    
}

async function myDisplayer(some) {
  document.getElementById("demo").innerHTML = some.IpfsHash;
  document.getElementById("demo2").innerHTML = some.Timestamp;
  console.log("callback object",some);

  //var IpfsHash = some.IpfsHash;
  //var Timestamp = some.Timestamp;  
  sessionStorage.setItem("IpfsHash", some.IpfsHash);
  sessionStorage.setItem("Timestamp", some.Timestamp);  
  
  var x = document.getElementById("recepientAddress").value;
  console.log("myDisplayer--> address",x);
  console.log("-----calling mintNFT() function -----",x,some.IpfsHash)
  //var confirm= await 
  mintNFT(x,some.IpfsHash);

  console.log("-----AFTER calling mintNFT() function -----",confirm)

}