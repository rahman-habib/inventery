//SPDX-License-Identifier:MIT
pragma solidity >=0.8.0;
import "./DistributorRole.sol";
import "./RetailerRole.sol";
import "./Ownable.sol";

contract SupplyChain is Ownable, DistributorRole, RetailerRole {
    address owner;
    uint256 upc;
    mapping(uint256 => item) items;
    mapping(uint256 => itemForSell) itemsell;
    enum State {
        ProducedbyDistributor,
        SellbyDistributor,
        PurchasedbyRetailer,
        ShippedbyDistributor,
        ReceivedbyRetailer
    }
    State constant defaultState = State.ProducedbyDistributor;
     constructor()   {
        owner = payable(msg.sender);
        
    }

    struct item {
        uint256 upc;
        address ownerID;
        string productName;
        string ProductDescription;
        address DistributorId;
        uint256 quantity;
        uint256 purchasePrice;
        uint256 productDate;
        State itemState;
    }
    struct itemForSell {
        uint256 upc;
        address ownerID;
        string productName;
        uint256 quantity;
        uint256 Price;
        uint256 productDate;
        State itemState;
    }

    mapping(uint256 => bool) universalCode;
    modifier productCode(uint256 _upc) {
        require(universalCode[_upc] == false);
        _;
    }
    
    modifier paidEnough(uint256 _price) {
        require(msg.value >= _price);
        _;
    }
    modifier checkValue(uint256 _upc, address payable addressToFund) {
        uint256 _price = itemsell[_upc].Price;
        uint256 amountToReturn = msg.value - _price;
        addressToFund.transfer(amountToReturn);
        _;
    }
    modifier purchasebyRetailer(uint256 _upc) {
        require(itemsell[_upc].itemState == State.PurchasedbyRetailer);
        _;
    }
    modifier verifyCaller(address _address) {
        require(msg.sender == _address);
        _;
    }
    modifier shippedDistributor(uint256 _upc){
        require(itemsell[_upc].itemState==State.ShippedbyDistributor);
        _;
    }

    function _make_payable(address x) internal pure returns (address payable) {
        return payable(x);
    }


    event ProducedByDistributor(uint256 upc, uint256 quantity);
    event SellByDistributor(uint256 upc, uint256 price);
    event PurchasedByRetailer(uint256 upc, uint256 quantity);
    event ShippedByDistributor(uint256 upc, uint256 quatity);
    event ReceivedByRetailer(uint256 upc);

    function ProduceDistributor(
        uint256 _upc,
        string memory productName,
        string memory productDescription,
        uint256 quantity,
        uint256 purchasePrice
    ) public onlyDistributor productCode(_upc) {
        item memory newProduce;
        newProduce.upc = _upc;
        newProduce.ownerID = msg.sender;
        newProduce.DistributorId = msg.sender;
        newProduce.productName = productName;
        newProduce.ProductDescription = productDescription;
        newProduce.quantity = quantity;
        newProduce.purchasePrice = purchasePrice;
        newProduce.productDate = block.timestamp;
        newProduce.itemState = State.ProducedbyDistributor;
        universalCode[_upc] = true;

        items[_upc] = newProduce;
        emit ProducedByDistributor(_upc, quantity);
    }

    function SellDistributor(
        uint256 _upc,
        uint256 _price,
        uint256 quantity
    ) public onlyDistributor
    verifyCaller(items[_upc].DistributorId) {
        itemForSell memory newitem;
        newitem.upc = _upc;
        newitem.itemState = State.SellbyDistributor;
        newitem.ownerID = items[_upc].ownerID;
        newitem.Price = _price;
        newitem.productDate = block.timestamp;
        newitem.productName = items[_upc].productName;
        newitem.quantity = quantity;
        itemsell[_upc] = newitem;
    }

    function PurchaseRetailer(uint256 _upc)
        public
        payable
        onlyRetailer
        paidEnough(itemsell[_upc].Price)
        checkValue(_upc, payable(msg.sender))
    {
        address payable ownerAddressPayable = _make_payable(
            items[_upc].ownerID
        );
        ownerAddressPayable.transfer(itemsell[_upc].Price);
        itemsell[_upc].ownerID = msg.sender;
        itemsell[_upc].itemState = State.PurchasedbyRetailer;

        items[_upc].quantity = items[_upc].quantity - itemsell[_upc].quantity;

        emit PurchasedByRetailer(upc, itemsell[_upc].Price);
    }

    function ShippedDistributor(uint256 _upc)
        public
        onlyDistributor
        purchasebyRetailer(_upc)
        verifyCaller(items[_upc].DistributorId)
    {
        itemsell[_upc].itemState=State.ShippedbyDistributor;
        emit ShippedByDistributor(_upc, itemsell[_upc].quantity);
    }
    function ReceivedRetailer(uint256 _upc)public
    onlyRetailer
    verifyCaller(itemsell[_upc].ownerID)
    {
        itemsell[_upc].itemState=State.ReceivedbyRetailer;
        emit ReceivedByRetailer(_upc);

    }
    function fetchItems(uint256 _upc) public view returns(uint256 universalpc,
        address ownerID,
        string memory productName,
        string memory ProductDescription,
        address DistributorId,
        uint256 quantity,
        uint256 purchasePrice,
        uint256 productDate,
        State itemState
        )
        {
            item memory data=items[_upc];
            return (data.upc,data.ownerID,data.productName,data.ProductDescription,data.DistributorId,data.quantity,data.purchasePrice,data.productDate,data.itemState);
           


    }
    function fetchitemSold(uint256 _upc)public view 
    returns(
        uint256 unipc,
        address ownerID,
        string memory productName,
        uint256 quantity,
        uint256 Price,
        uint256 productDate,
        State itemState
    )
    {
        itemForSell memory data=itemsell[_upc];
        return(data.upc,data.ownerID,data.productName,data.quantity,data.Price,data.productDate,data.itemState);
    }
}
