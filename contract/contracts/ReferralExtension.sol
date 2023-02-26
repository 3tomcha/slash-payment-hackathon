// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/ISlashCustomPlugin.sol";
import "./libs/UniversalERC20.sol";

contract ReferralExtension is ISlashCustomPlugin, Ownable {
    using UniversalERC20 for IERC20;

    struct Referral {
        address rewardAddress;
        uint256 rewardRate;
        uint256 cashBackRate;
    }

    uint256 public constant RATE_PRECISION = 10000;

    /**
     * @dev Receive payment
     * @param _receiveToken receive token
     * @param _amount amount
     * @param _reserved reserved
     */
    function receivePayment(
        address _receiveToken,
        uint256 _amount,
        bytes calldata,
        string calldata,
        bytes calldata _reserved
    ) external payable override {
        require(_amount > 0, "invalid amount");
        IERC20(_receiveToken).universalTransferFromSenderToThis(_amount);

        Referral memory referral = abi.decode(_reserved, (Referral));

        uint256 rewardAmount = (_amount * referral.rewardRate) / RATE_PRECISION;
        uint256 cashBackAmount = (_amount * referral.cashBackRate) / RATE_PRECISION;
        uint256 ownerAmount = _amount - rewardAmount - cashBackAmount;

        if (rewardAmount > 0) {
            IERC20(_receiveToken).universalTransfer(referral.rewardAddress, rewardAmount);
        }
        if (cashBackAmount > 0) {
            IERC20(_receiveToken).universalTransfer(tx.origin, cashBackAmount);
        }
        IERC20(_receiveToken).universalTransfer(owner(), ownerAmount);
    }

    /**
     * @dev Get slash extension interface version
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
