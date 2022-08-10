
const alchemyKey = "https://eth-rinkeby.alchemyapi.io/v2/gslsa8usxf0yOBAsKHHZZ5rVSOiud-AB"
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const contractABI = require('../SupplyChain.json');
const contractAddress = "0xb47fe78841D914AF146A3599406690379F2dA5D4";
export const smartContract = new web3.eth.Contract(contractABI.abi, contractAddress);
//1
export const produceItemByDistributor = async (upc, name,description,quantity,purchasePrice,walletAddress) => {
    //set up transaction parameters
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: walletAddress, // must match user's active address.
        data: await smartContract.methods.ProduceDistributor(upc, name, description, quantity, purchasePrice).encodeABI(),
    };

    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });

        return {
            status: (
                <span>
                    ✅{" "}
                    <a target="_blank" rel="noreferrer" href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
                        Produced item by Distributor, View the status of your transaction on Etherscan!
                    </a>
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }

}

export const checkDist = async (walletAddress) => {
    const result = await smartContract.methods.isDistributor(walletAddress).call();

    return result;
}
export const addDist = async (walletAddress, owner) => {
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: owner, // must match user's active address.
        data: await smartContract.methods.addDistributor(walletAddress).encodeABI(),
    };

    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });

        return {
            status: (
                <span>
                    ✅{" "}
                    <a target="_blank" rel="noreferrer" href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
                        Distributor adding, View the status of your transaction on Etherscan!
                    </a>
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }
}
export const removeDist = async (owner) => {
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: owner, // must match user's active address.
        data: await smartContract.methods.renounceDistributor().encodeABI(),
    };

    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });

        return {
            status: (
                <span>
                    ✅{" "}
                    <a target="_blank" rel="noreferrer" href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
                        Distributor removing, View the status of your transaction on Etherscan!
                    </a>
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }
}
export const checkRet = async (walletAddress) => {
    const result = await smartContract.methods.isRetailer(walletAddress).call();

    return result;
}
export const addRet = async (walletAddress, owner) => {
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: owner, // must match user's active address.
        data: await smartContract.methods.addRetailer(walletAddress).encodeABI(),
    };

    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });

        return {
            status: (
                <span>
                    ✅{" "}
                    <a target="_blank" rel="noreferrer" href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
                        Retailer adding, View the status of your transaction on Etherscan!
                    </a>
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }
}
export const removeRet = async (owner) => {
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: owner, // must match user's active address.
        data: await smartContract.methods.renounceRetailer().encodeABI(),
    };

    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });

        return {
            status: (
                <span>
                    ✅{" "}
                    <a target="_blank" rel="noreferrer" href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
                        Retailer removing, View the status of your transaction on Etherscan!
                    </a>
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }
}

export const SellByDistributor = async (upc, price,quantity, walletAddress) => {
    const transactionParameters = {
        to: contractAddress,
        from: walletAddress,
        data: await smartContract.methods.SellDistributor(upc, price,quantity).encodeABI(),
    };
    //sign the transaction
    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });

        return {
            status: (
                <span>
                    ✅{" "}
                    <a target="_blank" rel="noreferrer" href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
                        Sell item by Distributor, View the status of your transaction on Etherscan!
                    </a>
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }

}
export const shipByDistributor = async (upc, walletAddress) => {
    const transactionParameters = {
        to: contractAddress,
        from: walletAddress,
        data: await smartContract.methods.ShippedDistributor(upc).encodeABI(),
    };
    //sign the transaction
    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });

        return {
            status: (
                <span>
                    ✅{" "}
                    <a target="_blank" rel="noreferrer" href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
                        Shipping item by Distributor, View the status of your transaction on Etherscan!
                    </a>
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }

}
export const purchasedbyRetailer = async (upc, walletAddress) => {
    const { unipc, ownerID, productName, quantity, Price, productDate, itemState } = await smartContract.methods.fetchitemSold(upc).call();
    const transactionParameters = {
        to: contractAddress,
        value:Price,
        from: walletAddress,
        data: await smartContract.methods.PurchaseRetailer(upc).encodeABI(),
    };
    //sign the transaction
    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });

        return {
            status: (
                <span>
                    ✅{" "}
                    <a target="_blank" rel="noreferrer" href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
                        Purchased item by Retailer, View the status of your transaction on Etherscan!
                    </a>
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }

}
export const receivedRetailer = async (upc, walletAddress) => {
    const transactionParameters = {
        to: contractAddress,
        from: walletAddress,
        data: await smartContract.methods.ReceivedRetailer(upc).encodeABI(),
    };
    //sign the transaction
    //sign the transaction
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
        });

        return {
            status: (
                <span>
                    ✅{" "}
                    <a target="_blank" rel="noreferrer" href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
                        Received item by Retailer, View the status of your transaction on Etherscan!
                    </a>
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }

}


export const BuffOne = async (_upc) => {


    try {
        const {  universalpc,ownerID, productName, ProductDescription, DistributorId, quantity, purchasePrice, productDate, itemState } = await smartContract.methods.fetchItems(_upc).call();

        return {
            status: (
                <span>
                    ✅{" "}
                    <p>unversal product code : {universalpc}</p>
                    <p>owner id : {ownerID}</p>
                    <p>Product name : {productName}</p>
                    <p>Product Description : {ProductDescription}</p>
                    <p>DistributorId : {DistributorId}</p>
                    <p>quantity : {quantity}</p>
                    <p>purchase Price : {purchasePrice}</p>
                    <p>product Date : {productDate}</p>
                    <p>itemState : {itemState}</p>
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }

}
export const Bufftwo = async (_upc) => {


    try {
        const { unipc, ownerID, productName, quantity, Price, productDate, itemState } = await smartContract.methods.fetchitemSold(_upc).call();

        return {
            status: (
                <span>
                    ✅{" "}
                    <p>universal product code : {unipc}</p>
                    <p>owner id : {ownerID}</p>
                    <p>product name : {productName}</p>
                    <p>quantity : {quantity}</p>
                    <p>sold price : {Price}</p>
                    <p>product date : {productDate}</p>
                    <p>item state : {itemState}</p>
                    
                </span>
            ),
        };
    } catch (error) {
        return {
            status: "😥 " + error.message,
        };
    }

}

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const obj = {
                status: "Write a message in the text-field above",
                address: addressArray[0],
            };
            return obj;
        }
        catch (error) {
            return {
                address: "",
                status: error.messsage,
            };
        }
    }
    else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="_blank" href={`https://metamask.io/download.html`}>
                            You must install Metamask, a virtual Ethereum wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            )
        }
    }
};
export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (addressArray.length > 0) {
                return {
                    address: addressArray[0],
                    status: "Wallet conected",
                };
            }
            else {
                return {
                    address: "",
                    status: "🦊 Connect to Metamask using the top right button.",
                };
            }
        }
        catch (error) {
            return {
                address: "",
                status: error.messsage,
            };
        }
    }
    else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="_blank" href={`https://metamask.io/download.html`}>
                            You must install Metamask, a virtual Ethereum wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};