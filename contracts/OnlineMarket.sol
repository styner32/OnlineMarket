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

    enum State { ForSale, Sold }

    struct Item {
        uint id;
        string name;
        uint price;
        State state;
        address buyer;
    }

    struct Store {
        string title;
        uint itemCount;
        mapping (uint => Item) items;
    }

    event ItemCreated(address storeOwner, uint id);
    event ItemPurchased(address buyer, address storeOwner, uint id);

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

    function getStore(address addr) public view returns (address, string, uint) {
        return (addr, stores[addr].title, stores[addr].itemCount);
    }

    function addItem(string name, uint price) public shouldBeStoreOwner {
        emit ItemCreated(msg.sender, stores[msg.sender].itemCount);
        stores[msg.sender].items[stores[msg.sender].itemCount] = Item({
            id: stores[msg.sender].itemCount,
            name: name,
            price: price,
            state: State.ForSale,
            buyer: 0
        });
        stores[msg.sender].itemCount++;
    }

    function fetchItem(address storeOwner, uint itemId) public view
    returns(uint, string, uint, string) {
        string memory state = 'ForSale';
        if (stores[storeOwner].items[itemId].buyer != 0) {
            if (stores[storeOwner].items[itemId].buyer == msg.sender) {
                state = 'SoldByMe';
            } else {
                state = 'Sold';
            }
        }

        return (stores[storeOwner].items[itemId].id,
                stores[storeOwner].items[itemId].name,
                stores[storeOwner].items[itemId].price,
                state);
    }

    function buyItem(address storeOwner, uint itemId) public payable {
        emit ItemPurchased(msg.sender, storeOwner, itemId);
        stores[storeOwner].items[itemId].state = State.Sold;
        stores[storeOwner].items[itemId].buyer = msg.sender;
        storeOwner.transfer(stores[storeOwner].items[itemId].price);
    }
}
