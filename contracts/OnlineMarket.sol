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
        uint id;
        string name;
        uint price;
    }

    struct Store {
        string title;
        uint itemCount;
        mapping (uint => Item) items;
    }

    event ItemCreated(address storeOwner, uint id);

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
            stores[addr] = Store({title: '', itemCount: 0});
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

    function getStoreTitle() public view returns (string, uint) {
        return (stores[msg.sender].title, stores[msg.sender].itemCount);
    }

    function addItem(string name, uint price) public shouldBeStoreOwner {
        emit ItemCreated(msg.sender, stores[msg.sender].itemCount);
        stores[msg.sender].items[stores[msg.sender].itemCount] = Item({
            id: stores[msg.sender].itemCount,
            name: name,
            price: price
        });
        stores[msg.sender].itemCount++;
    }

    function fetchItem(uint id) public shouldBeStoreOwner view returns(uint, string, uint) {
        return (stores[msg.sender].items[id].id,
                stores[msg.sender].items[id].name,
                stores[msg.sender].items[id].price);
    }
}
