pragma solidity ^0.4.24;

contract OnlineMarket {
    address owner;
    mapping (address => bool) adminMapping;
    mapping (address => bool) storeOwnerMapping;
    mapping (address => Store) stores;

    address[] admins;
    address[] storeOwners;

    modifier shouldBeOwner () { require (msg.sender == owner); _;}
    modifier shouldBeAdmin () { require (adminMapping[msg.sender]); _; }
    modifier shouldBeStoreOwner () { require (storeOwnerMapping[msg.sender]); _;}

    struct Item {
        string name;
    }

    struct Store {
        string title;
        mapping (uint => Item) items;
    }

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
            stores[addr] = Store({title: ''});
        }
    }

    function isStoreOwner(address addr) public view returns (bool) {
        return storeOwnerMapping[addr];
    }

    function getStoreOwners() public view returns (address[]) {
        return storeOwners;
    }

    function getRole() public view returns (string) {
        if (adminMapping[msg.sender]) {
            return 'Admin';
        } else if (storeOwnerMapping[msg.sender]) {
            return 'StoreOwner';
        }

        return 'Shopper';
    }

    function setStoreTitle(string title) public shouldBeStoreOwner {
        stores[msg.sender].title = title;
    }

    function getStoreTitle() public view returns (string) {
        return stores[msg.sender].title;
    }
}
