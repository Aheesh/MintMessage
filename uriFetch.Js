function URI_Fetch() 
{
    var y = document.getElementById("messageArea").value;
    var x = document.getElementById("recepientAddress").value;
    var f = '{"address" :"'+x +'", "message" :"' +y +' "}'
    console.log(f)
    
    //const myJSON= '{"address":"0x123456", "message":"I want to buy your NFT"}';
    //const myObj = JSON.parse(myJSON);

    const myObj = JSON.parse(f);
    document.getElementById("demo").innerHTML = myObj.address; 

    fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'pinata_api_key': "217fd00b10cbda055867",
      'pinata_secret_api_key': "b0f986ab98c4a8fc2b4aab1dc85accdd0669602be671c13c8273f86c5b851d07"
    }, 
    body: JSON.stringify(myObj),
    })
    .then(response => response.json())
    .then(data => {

    console.log('Success:',data);
    console.log('IpfsHash:',data.IpfsHash);
    console.log('Timestamp',data.Timestamp);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}
