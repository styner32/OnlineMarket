pragma solidity ^0.4.24;

library StateLib {
    /** @dev returns state of item
     *  @param buyer address representing a buyer of item
     *  @param currentUser address representing message sender
     *  @return state of item
     */
    function getItemState(address buyer, address currentUser) public pure returns (string) {
        string memory state = 'ForSale';
        if (buyer != 0) {
            if (buyer == currentUser) {
                state = 'SoldByMe';
            } else {
                state = 'Sold';
            }
        }

        return state;
    }
}
