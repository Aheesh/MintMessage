 function URI_Fetch(myCallback) 
{
    var y = document.getElementById("messageArea").value;
    var x = document.getElementById("recepientAddress").value;
    // add sender address and timestamp of message posted on IPFS
    var z = document.getElementById("userAddress").value;
    
    // Get timestamp for message in UTC 
    var today = new Date();
    var date = today.getUTCFullYear()+'-'+(today.getUTCMonth()+1)+'-'+today.getUTCDate();
    var time = today.getUTCHours() + ":" + today.getUTCMinutes() + ":" + today.getUTCSeconds();
    var dateTime = date+' '+time;
    console.log("DATE = ",date);
    console.log("Time =",time);
    console.log("Check Date time",dateTime);

    var f = `{"Sender Wallet Address" :"${z}", "Recipient Wallet Address" :"${x} ", "Message" :"${y}", "Timestamp" :"${dateTime}" }`;
    console.log(f);
    

    const myObj = JSON.parse(f);
    console.log("Json for IPFS",myObj);

    //Pinata function to pin the JSON to IPFS
    //Variable to access return from Pinata API outside of fetch .then response scope
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

    //Callback to wait for the pinata api to return ipfshash before moving to the next step.
    myCallback(data)
    })
    .catch((error) => {
    console.error('Error:', error);

    });
    
}

async function myDisplayer(some) {
  document.getElementById("demo").innerHTML = some.IpfsHash;
  document.getElementById("demo2").innerHTML = some.Timestamp;
  console.log("callback object",some);

  var x = document.getElementById("recepientAddress").value;
  console.log("myDisplayer--> address",x);
  console.log("-----calling mintNFT() function -----",x,some.IpfsHash)
  //var confirm= await 
  mintNFT(x,some.IpfsHash);

  console.log("-----AFTER calling mintNFT() function -----",confirm)

}