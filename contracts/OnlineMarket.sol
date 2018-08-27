pragma solidity ^0.4.24;

import "./StateLib.sol";

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

    /** @dev add an admin
     * @param addr address representing new admin of this marketplace
     */
    function addAdmin(address addr) public shouldBeOwner {
        if (adminMapping[addr] != true) {
            adminMapping[addr] = true;
            admins.push(addr);
        }
    }

    /** @dev check if given address is an admin
     * @param addr address representing an admin of this marketplace
     * @return bool return true if given address is an admin, return
     * false otherwise
     */
    function isAdmin(address addr) public view returns (bool) {
        return adminMapping[addr];
    }

    /** @dev add a store owner
     * @param addr address representing a new store owner of this marketpalce
     */
    function addStoreOwner(address addr) public shouldBeAdmin {
        if (storeOwnerMapping[addr] != true) {
            storeOwnerMapping[addr] = true;
            storeOwners.push(addr);
            stores[addr] = Store({title: '', itemCount: 0});
        }
    }

    /** @dev check if given address is an store owner
     * @param addr address representing a store owner of this marketpalce
     * @return bool return true if given address is an store owner, return
     * false otherwise
     */
    function isStoreOwner(address addr) public view returns (bool) {
        return storeOwnerMapping[addr];
    }

    /** @dev fetch list of store owners
     *  @return list of store owners addresses
     */
    function getStoreOwners() public view returns (address[]) {
        return storeOwners;
    }

    /** @dev get a role of message sender in this marketplace
     *  @return role of message sender
     */
    function getRole() public view returns (string) {
        if (adminMapping[msg.sender]) {
            return 'Admin';
        } else if (storeOwnerMapping[msg.sender]) {
            return 'StoreOwner';
        }

        return 'Shopper';
    }

    /** @dev update store title
     * @param title new title of market place
     */
    function setStoreTitle(string title) public shouldBeStoreOwner {
        stores[msg.sender].title = title;
    }

    /** @dev return store information
     * @param addr address representing a store owner of this marketpalce
     * @return address store owner address
     * @return string title of store
     * @return uint number of items in the store
     */
    function getStore(address addr) public view returns (address, string, uint) {
        return (addr, stores[addr].title, stores[addr].itemCount);
    }

    /** @dev add an item to store
     * @param name name of item
     * @return price price of item
     */
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

    /** @dev return an item
     * @param storeOwner address representing a store owner of this marketpalce
     * @param itemId id representing  item id in the store
     * @return uint item id
     * @return string item name
     * @return uint item price
     * @return string item availability
     */
    function fetchItem(address storeOwner, uint itemId) public view returns(uint, string, uint, string) {
        return (stores[storeOwner].items[itemId].id,
                stores[storeOwner].items[itemId].name,
                stores[storeOwner].items[itemId].price,
                StateLib.getItemState(stores[storeOwner].items[itemId].buyer, msg.sender));
    }

    /** @dev buy an item
     * @param storeOwner address representing a store owner of this marketpalce
     * @param itemId id representing  item id in the store
     */
    function buyItem(address storeOwner, uint itemId) public payable {
        emit ItemPurchased(msg.sender, storeOwner, itemId);
        stores[storeOwner].items[itemId].state = State.Sold;
        stores[storeOwner].items[itemId].buyer = msg.sender;
        storeOwner.transfer(stores[storeOwner].items[itemId].price);
    }
}
