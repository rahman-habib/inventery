//SPDX-License-Identifier:MIT
pragma solidity >=0.8.0;
import "./Roles.sol";
contract DistributorRole{
    using Roles for Roles.Role;
    event DistributorAdded(address indexed account);
    event DistributorRemoved(address indexed account);
    Roles.Role private Distributor;
    constructor ()public{
        _addDistributor(msg.sender);
    }
    modifier onlyDistributor(){
        require(isDistributor(msg.sender));
        _;
    }
    function isDistributor(address account)public view returns(bool){

        return Distributor.has(account);
    }
    function addDistributor(address account)public onlyDistributor{
        _addDistributor(account);
    }
    function _addDistributor(address account)internal{
        Distributor.add(account);
        emit DistributorAdded(account);
    }
    function renounceDistributor(address account)public onlyDistributor{
        _removeDistributor(account);
    }
    function _removeDistributor(address account)internal{
            Distributor.remove(account);
            emit DistributorRemoved(account);
    }

}