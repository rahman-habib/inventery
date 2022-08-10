//SPDX-License-Identifier:MIT
pragma solidity >=0.8.0;
import "./Roles.sol";

contract RetailerRole {
    using Roles for Roles.Role;
    event RetailerAdded(address indexed account);
    event RetailerRemoved(address indexed account);
    Roles.Role private Retailer;

    modifier onlyRetailer() {
        require(isRetailer(msg.sender));
        _;
    }
    constructor()public{
        _addRetailer(msg.sender);
    }

    function isRetailer(address account) public view returns (bool) {
        return Retailer.has(account);
    }
    function addRetailer(address account )public onlyRetailer{
        _addRetailer(account);
    }
    function _addRetailer(address account )internal {
        Retailer.add(account);
        emit RetailerAdded(account);
    }
    function renounceRetailer(address account)public onlyRetailer{
        _removeRetailer(account);
    }
    function _removeRetailer(address account)internal{
        Retailer.remove(account);
        emit RetailerRemoved(account);
    }
}
