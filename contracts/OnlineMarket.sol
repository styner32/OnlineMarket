pragma solidity ^0.4.24;

contract OnlineMarket {
    address owner;
    mapping (address => bool) adminMapping;
    mapping (address => bool) storeOwnerMapping;

    address[] admins;
    address[] storeOwners;

    modifier shouldBeOwner () { require (msg.sender == owner); _;}
    modifier shouldBeAdmin () { require (adminMapping[msg.sender]); _; }

    constructor() public {
        owner = msg.sender;
        adminMapping[owner] = true;
        admins.push(owner);
    }

    function addAdmin(address addr) public shouldBeOwner {
        if (adminMapping[addr] != true) {
            adminMapping[addr] = true;
            admins.push(addr);
        }
    }

    function isAdmin(address addr) public view returns (bool) {
        return adminMapping[addr];
    }

    function addStoreOwner(address addr) public shouldBeAdmin {
        if (storeOwnerMapping[addr] != true) {
            storeOwnerMapping[addr] = true;
            storeOwners.push(addr);
        }
    }

    function isStoreOwner(address addr) public view returns (bool) {
        return storeOwnerMapping[addr];
    }

    function getStoreOwners() public view returns (address[]) {
        return storeOwners;
    }

    function getRole(address addr) public view returns (string) {
        if (adminMapping[addr] == true) {
            return 'Admin';
        } else if (storeOwnerMapping[addr] == true) {
            return 'StoreOwner';
        }

        return 'Shopper';
    }
}
