pragma solidity ^0.4.24;

// https://www.safaribooksonline.com/library/view/building-blockchain-projects/9781787122147/f5a3f18e-d656-4e7f-8801-30c0a6c78cdb.xhtml
// import "github.com/Arachnid/Solidity-stringutils/strings.sol";

contract Credit {
  // using strings for *;

  struct Post {
    string content;
    address createdBy;
    mapping (address => bool) isVoted;
  }

  uint numOfPosts;

  mapping (uint => Post) posts;
  mapping (uint => uint) likes;
  mapping (address => int) balances;
  mapping (address => bool) isCredited;

  event Transfer(address indexed _from, address indexed _to, int256 _value);
  event CreatePost(uint id);

  function MetaCoin() public {
    numOfPosts = 0;
  }

  function isUserCredited() public constant returns (bool) {
    return isCredited[msg.sender];
  }

  function creditForFirstTime() public returns (bool) {
    if (!isCredited[msg.sender]) {
      balances[msg.sender] = 100;
      isCredited[msg.sender] = true;
    }

    return true;
  }

  function sendCoin(address receiver, int amount) public returns (bool) {
    balances[msg.sender] -= amount;
    balances[receiver] += amount;
    Transfer(msg.sender, receiver, amount);
    return true;
  }

  function getBalanceInEth(address addr) public constant returns (int) {
    return convert(getBalance(addr), 2);
  }

  function getBalance(address addr) public constant returns (int) {
    return balances[addr];
  }

  function postQuestion(string content) public returns (bool) {
    numOfPosts += 1;
    posts[numOfPosts].content = content;
    posts[numOfPosts].createdBy = msg.sender;
    return true;
  }

  function getPost(uint postID) constant public returns (string content) {
    content = posts[postID].content;
  }

  function getLatestPost() constant public returns (string content) {
    content = posts[numOfPosts].content;
  }

  function getNumberOfPosts() constant public returns (uint) {
    return numOfPosts;
  }

  function likePost(uint postID) public returns (bool) {
    if (!posts[postID].isVoted[msg.sender]) {
      balances[posts[postID].createdBy] += 10;
      posts[postID].isVoted[msg.sender] = true;
      likes[postID] += 1;
    }

    return true;
  }

  function getLikes(uint postID) public constant returns (uint) {
    return likes[postID];
  }

  function convert(int amount, int conversionRate) internal pure returns (int convertedAmount) {
    return amount * conversionRate;
  }
}
