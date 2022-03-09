const getWeb3 = () => {
    console.log("getWeb3() - 1st before return Promise",window.ethereum);
    return new Promise((resolve, reject) => {
      window.addEventListener("load", async () => {
        console.log("getWeb3() - check window.ethereum",window.ethereum);  
        if (window.ethereum) {
          console.log("getWeb3() - window.ethereum",window.ethereum);  
          const web3 = new Web3(window.ethereum);
          try {
            // ask user permission to access his accounts
            await window.ethereum.request({ method: "eth_requestAccounts" });
            resolve(web3);
          } catch (error) {
            reject(error);
          }
        } else {
          reject("Must install MetaMask");
        }
      });
    });
  };