// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

/// @notice Monad Testnet-only demonstration. Points are non-transferable,
/// have no cash value, and do not establish real course reward eligibility.
contract DemoPaceRewards {
    address public owner;
    uint256 public constant POINTS_PER_ROUND = 100;
    mapping(bytes32 => mapping(address => bool)) public approved;
    mapping(bytes32 => mapping(address => bool)) public claimed;
    mapping(address => uint256) public points;

    event RoundApproved(bytes32 indexed roundId, address indexed golfer);
    event RewardClaimed(bytes32 indexed roundId, address indexed golfer, uint256 points);

    constructor() {
        require(block.chainid == 10143, "Monad Testnet only");
        owner = msg.sender;
    }

    function approveRound(bytes32 roundId, address golfer) external {
        require(msg.sender == owner, "Course owner only");
        require(roundId != bytes32(0) && golfer != address(0), "Invalid approval");
        require(!claimed[roundId][golfer], "Already claimed");
        approved[roundId][golfer] = true;
        emit RoundApproved(roundId, golfer);
    }

    function claim(bytes32 roundId) external {
        require(approved[roundId][msg.sender], "Course approval required");
        require(!claimed[roundId][msg.sender], "Already claimed");
        claimed[roundId][msg.sender] = true;
        points[msg.sender] += POINTS_PER_ROUND;
        emit RewardClaimed(roundId, msg.sender, POINTS_PER_ROUND);
    }
}
