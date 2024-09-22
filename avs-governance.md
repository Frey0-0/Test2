AVS Governance
Overview
The AVS Governance acts as the interface of the AVS on top of the Ethereum blockchain (L1). Each AVS deploys its own AVS Governance contract. 

The AVS Governance manages the registration and de-registration of operators, enforces governance policies, and coordinates interactions between AVS operators and various system components. The AVS Governance uses roles and access-control authorizations to manage permissions, handle operator deposits and rewards, and allow for the update of governance logic and settings. Additionally, it interfaces with other contracts for message handling, registry management, and signature verification to maintain the integrity and functionality of the AVS.

Governance actions are controlled by multiple Governance Multisigs.

The AVS Governance handles:

Pausing and Unpausing contracts in emergency situations

Registration and deregistration of operators

Reward distribution for operators

Configuration of slashing and penalty conditions

Set supported strategies (security for AVS)

And more..  

API
Operator Methods
Operators use operator methods to manage their registration to the AVS.

Copy
function registerAsOperator(
    uint256[4] calldata _blsKey, 
    address _rewardsReceiver,
    ISignatureUtils.SignatureWithSaltAndExpiry memory _operatorSignature,
    BLSAuthLibrary.Signature calldata _blsRegistrationSignature
) external;

function registerAsAllowedOperator(
    uint256[4] calldata _blsKey, 
    bytes calldata _authToken, 
    address _rewardsReceiver,
    ISignatureUtils.SignatureWithSaltAndExpiry memory _operatorSignature,
    BLSAuthLibrary.Signature calldata _blsRegistrationSignature
) external;
    
function unregisterAsOperator() external;
registerAsOperator(uint256[4], ISignatureUtils.SignatureWithSaltAndExpiry)
Register to non-allowlisted AVSs. If the AVS registration is permissionless, anyone can register as long as they comply with the AVS' minimum requirements.

Parameter	Type	Description
_blsKey

uint256[4]

The operator's public BLS key

_rewardsReceiver

address

The address to which operator rewards should be sent

_operatorSignature

ISignatureUtils.SignatureWithSaltAndExpiry

The operator signature required by EigenLayer

_blsRegistrationSignature

BLSAuthLibrary.Signature

A BLS signature (see note below)

The _blsRegistrationSignature parameter is a BLS signature:

Domain: keccak256("OthenticBLSAuth")

Message: keccak256(abi.encode(msg.sender, avsGovernanceAddress, block.chainid))

registerAsAllowedOperator(uint256[4], bytes, ISignatureUtils.SignatureWithSaltAndExpiry)
AVSs may require operators to be pre-approved by an "Allowlister" service. If the AVS requires to be allowlisted, the operators must pass an additional bytes parameter containing the Allowlister's signature.

Parameter	Type	Description
_blsKey

uint256[4]

The operator's public BLS key

_authToken

bytes

The signature from the Allowlister service

_rewardsReceiver

address

The address to which operator rewards should be sent

_operatorSignature

ISignatureUtils.SignatureWithSaltAndExpiry

The operator signature required by EigenLayer

_blsRegistrationSignature

BLSAuthLibrary.Signature

A BLS signature (see note below)

The _blsRegistrationSignature parameter is a BLS signature:

Domain: keccak256("OthenticBLSAuth")

Message: keccak256(abi.encode(msg.sender, avsGovernanceAddress, block.chainid))

unregisterAsOperator()
Unregister as an operator. This method receives no arguments.

Governance Methods
The governance methods are used by the AVS developers or DAO in order to control and manage their AVS governance configurations.

Copy
function setNumOfOperatorsLimit(uint256 _newLimitOfNumOfOperators) external;
function setSlashingRate(uint24 _slashingRate) external;
function depositRewardsWithApprove(uint256 _amount) external;
function setAvsName(string calldata _avsName) external;
function setAvsGovernanceMultisig(address _newAvsGovernanceMultisig) external; 
function setAvsGovernanceLogic(IAvsGovernanceLogic _avsGovernanceLogic) external;
function setSupportedStrategies(address[] calldata _strategies) external;
function updateAVSMetadataURI(string calldata _metadataURI) external;
function setMinVotingPower(uint256 _minVotingPower) external;
function setMaxEffectiveBalance(uint256 _maxBalance) external;
function setMinSharesForStrategy(address _strategy, uint256 _minShares) external;
setNumOfOperatorsLimit(uint256)
Limit the amount of active operators allowed on the AVS at any given moment.

Parameter	Type	Description
_newLimitOfNumOfOperators

uint256

The operator's public BLS key

setSlashingRate(uint256)
Set the amount of token slashed per offense (in wei units).

Parameter	Type	Description
_slashingRate

uint256

The penalty incurred by slashing (in wei units)

depositRewardsWithApprove(uint256)
Deposit rewards into the AVS Vault contract.

Parameter	Type	Description
_amount

uint256

The amount of ERC20 token to transfer to the vault

setAvsName(string)
Set a human-readable identifier for your AVS contract.

Parameter	Type	Description
_avsName

string

New AVS name

setAvsGovernanceMultisig(address)
Set the account that is authorized to invoke the governance methods.

Parameter	Type	Description
_newAvsGovernanceMultisig

address

The new governance owner

setAvsGovernanceLogic(IAvsGovernanceLogic)
Connect an AvsLogic contract to the governance contract.

Parameter	Type	Description
_avsGovernanceLogic

IAvsGovernanceLogic

Address of an AvsLogic contract

setSupportedStrategies(address[])
Set the list of EigenLayer strategies supported by the AVS.

Parameter	Type	Description
_strategies

address[]

List of EigenLayer strategies supported by the AVS

updateAVSMetadataURI(string)
Update the AVS Metadata URI which contains the information appearing on the EigenLayer UI.

Parameter	Type	Description
_metadataURI

string

The new metadata URI

setMinVotingPower(uint256)
Set the Minimum Voting Power required to register an operator to the AVS. Learn more here. 

Parameter	Type	Description
_minVotingPower

uint256

minimum voting power

setMaxEffectiveBalance(uint256)
Set the Maximum Effective Balance for the AVS. Learn more here. 

Parameter 	Type	Description
_maxBalance

uint256 

maximum effective balance

setMinSharesForStrategy(address, uint256)
Set a minimum voting power per strategy required to register an operator to the AVS. Learn more here.

Parameter	Type	Description
_strategy

address

address of the strategy

_minShares

uint256

minimum voting power for that strategy
