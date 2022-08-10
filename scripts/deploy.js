async function main() {
    // Grab the contract factory 
    const SupplyChain = await ethers.getContractFactory("SupplyChain");
  
  
 
    // Start deployment, returning a promise that resolves to a contract object
    
 
    const supplychain = await SupplyChain.deploy(); 


   
 
    console.log("SupplyChain Contract deployed to address:", supplychain.address);
    /*
    SupplyChain Contract deployed to address: 0xb47fe78841D914AF146A3599406690379F2dA5D4
*/
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });