pragma solidity ^0.5.8;

contract T1{
    uint256 public counter;
    event countervalue(address,uint256);
    function addcounter() public{
        counter++;
        emit countervalue(msg.sender,counter);
    }
    function subcounter() public{
        counter--;
        emit countervalue(msg.sender,counter);
    }
    function counter1() public view returns(uint256){
        return counter;
    }
    
}