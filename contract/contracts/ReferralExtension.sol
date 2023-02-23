// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ISlashCustomPlugin.sol";
import "./libs/UniversalERC20.sol";

contract ReferralExtension is ISlashCustomPlugin, Ownable {
    using UniversalERC20 for IERC20;

    struct Referral {
        address rewardAddress;
        uint16  rewardRate;
        uint16  cashBackRate;
    }

    uint16 public constant RATE_PRECISION = 10000;
    mapping(string => Referral) private _referralCode;

    function receivePayment(
        address _receiveToken,
        uint256 _amount,
        bytes calldata,
        string calldata,
        bytes calldata  _reserved
    ) external payable override {
        require(_amount > 0, "invalid amount");
        
        string memory usedReferralCode = abi.decode(_reserved, (string));
        Referral memory referral = _referralCode[usedReferralCode];

        uint256 rewardAmount = _amount * referral.rewardRate / RATE_PRECISION;
        uint256 cashBackAmount = _amount * referral.cashBackRate / RATE_PRECISION;
        uint256 ownerAmount = _amount - rewardAmount - cashBackAmount;

        if (rewardAmount > 0) {
            IERC20(_receiveToken).universalTransfer(referral.rewardAddress, rewardAmount);
        }
        if(cashBackAmount > 0) {
            IERC20(_receiveToken).universalTransfer(msg.sender, cashBackAmount);
        }
        IERC20(_receiveToken).universalTransfer(owner(), ownerAmount);

    }

    function setReferralCode(
        string memory _code,
        address _rewardAddress,
        uint16 _rewardRate,
        uint16 _cashBackRate
    ) external onlyOwner {
        require(_rewardRate + _cashBackRate <= RATE_PRECISION, "invalid rate");
        require(_rewardAddress != address(0), "invalid reward address");
        require(_referralCode[_code].rewardAddress == address(0), "code already exists");

        _referralCode[_code] = Referral(_rewardAddress, _rewardRate, _cashBackRate);
    }

    function deleteReferralCode(string memory _code) external onlyOwner {
        require(_referralCode[_code].rewardAddress != address(0), "code not exists");

        delete _referralCode[_code];
    }

    function withdrawToken(address tokenContract) external onlyOwner {
        require(
            IERC20(tokenContract).universalBalanceOf(address(this)) > 0,
            "balance is zero"
        );

        IERC20(tokenContract).universalTransfer(
            msg.sender,
            IERC20(tokenContract).universalBalanceOf(address(this))
        );

        emit TokenWithdrawn(
            tokenContract,
            IERC20(tokenContract).universalBalanceOf(address(this))
        );
    }

    event TokenWithdrawn(address tokenContract, uint256 amount);

    /**
     * @dev Check if the contract is Slash Plugin
     *
     * Requirement
     * - Implement this function in the contract
     * - Return true
     */
    function supportSlashExtensionInterface()
        external
        pure
        override
        returns (uint8)
    {
        return 2;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(
        bytes4 /*interfaceId*/
    ) public view virtual returns (bool) {
        return false;
    }

}