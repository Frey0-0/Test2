AVS Governance Logic
Overview
The AVSGovernance contract is responsible for operator registration and deregistration. The Othentic Stack allows developers to implement their custom logics during this process. 

The IAVSGovernanceLogic provides pre and post execution hooks for operator registration and deregistration on-chain. 

Interface
Copy
// SPDX-License-Identifier: BUSL-1.1
pragma solidity >=0.8.20;

/**
 * @author Othentic Labs LTD.
 * @notice Terms of Service: https://www.othentic.xyz/terms-of-service
 * @notice Depending on the application, it may be necessary to add reentrancy gaurds to hooks
 */
interface IAvsGovernanceLogic {
    function beforeOperatorRegistered(address _operator, uint256 _numOfShares, uint256[4] calldata _blsKey) external;
    function afterOperatorRegistered(address _operator, uint256 _numOfShares, uint256[4] calldata _blsKey) external;
    function beforeOperatorUnregistered(address _operator) external;
    function afterOperatorUnregistered(address _operator) external;
}
The interface declares 4 functions, before and after operator registration and unregistration. Developers can implement custom logic during these events. 

These functions are called inside the registerAsOperator and unRegisterAsOperator functions respectively. 

Copy
function _registerAsOperator(address _operator, uint256[4] calldata _blsKey) internal {
        AvsGovernanceStorageData storage _avsGovernanceStorageData = _getStorage();
        IAvsGovernanceLogic _avsGovernanceLogic = _avsGovernanceStorageData.avsGovernanceLogic;
        bool _isAvsGovernanceLogicSet = address(_avsGovernanceLogic) != address(0);
        
        if (_isAvsGovernanceLogicSet) {
            _avsGovernanceLogic.beforeOperatorRegistered(_operator, _numOfShares, _blsKey);
        }
        ...
        if (_isAvsGovernanceLogicSet) {
            _avsGovernanceLogic.afterOperatorRegistered(_operator, _numOfShares, _blsKey);
        }
    }
Deployment and setup
After implementation, you can deploy the contract on the same L1 network as the AvsGovernance. Note that you should deploy the Othentic contracts before deploying the Avs Governance Logic. 

Copy
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

/*______     __      __                              __      __ 
 /      \   /  |    /  |                            /  |    /  |
/$$$$$$  | _$$ |_   $$ |____    ______   _______   _$$ |_   $$/   _______ 
$$ |  $$ |/ $$   |  $$      \  /      \ /       \ / $$   |  /  | /       |
$$ |  $$ |$$$$$$/   $$$$$$$  |/$$$$$$  |$$$$$$$  |$$$$$$/   $$ |/$$$$$$$/ 
$$ |  $$ |  $$ | __ $$ |  $$ |$$    $$ |$$ |  $$ |  $$ | __ $$ |$$ |
$$ \__$$ |  $$ |/  |$$ |  $$ |$$$$$$$$/ $$ |  $$ |  $$ |/  |$$ |$$ \_____ 
$$    $$/   $$  $$/ $$ |  $$ |$$       |$$ |  $$ |  $$  $$/ $$ |$$       |
 $$$$$$/     $$$$/  $$/   $$/  $$$$$$$/ $$/   $$/    $$$$/  $$/  $$$$$$$/
*/
/**
 * @author Othentic Labs LTD.
 * @notice Terms of Service: https://www.othentic.xyz/terms-of-service
 */

import {Script, console} from "forge-std/Script.sol";
import "../src/IAvsGocernance.sol";
import "../src/AvsGovernanceLogic.sol";

// forge script AvsGovernanceLogicScript --rpc-url $L1_RPC --private-key $PRIVATE_KEY
// --broadcast -vvvv --verify --etherscan-api-key $L1_ETHERSCAN_API_KEY --chain
// $L1_CHAIN --verifier-url $L1_VERIFIER_URL --sig="run(address)" $ATTESTATION_CENTER_ADDRESS
contract AvsGovernanceLogicScript is Script {
    function setUp() public {}

    function run(address avsGovernance) public {
        vm.broadcast();
        AvsGovernanceLogic avsGovernanceLogic = new AvsGovernanceLogic(avsGovernance);
        IAvsGovernance(avsGovernance).setAvsGovernanceLogic(address(avsGovernanceLogic));
    }
}
After deploying, you need to call the setAvsGovernanceLogic function on the AvsGovernance and pass in the address of the AvsGovernnaceLogic as the parameter. Now, the AVS contracts are set and ready to be used. 

Examples
Gated Operators
As an AVS, you might wish to whitelist operators that register to your AVS. That can be done using the beforeOperatorRegister function. You can handle the whitelisting in your contract or use a token gating system. 

Post Registration Benefits
Operators that register to your AVS can be minted NFTs or whitelisted to use certain services in your AVS. These can be enabled using the afterOperatorRegsiter function. 
