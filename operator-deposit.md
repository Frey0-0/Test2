To have shares in EigenLayer protocol and operate the network, participants must deposit any LST shares into EigenLayer's delegation manager.

Using the CLI
This is the recommended approach.

The Othentic CLI streamlines the staking process on EigenLayer protocol and supports multiple strategies. This command also supports conversions between ETH and LRTs.

To do so, issue the following command:

Copy
othentic-cli operator deposit --strategy <name:string> --shares <float> --convert <float>
Command Options:

strategy is the name of LRT, the following are the optional strategies:

stETH

rETH

wETH

shares is the amount in strategy token to be staked on EigenLayer.

convert is the amount of ETH to be converted for strategy token.

For Example:

Copy
othentic-cli operator deposit --strategy stETH --shares 0.001 --convert 0.002
This will start up the process of depositing as an Operator on EigenLayer.


Manual Deposit Process
Instructions for Holesky Testnet

Depositing as an Operator on EigenLayer is a two-step process:

Acquire stETH

Stake with EigenLayer

Get stETH
Contracts
stETH ERC20 Contract

How to
The stETH address on Holesky is: 0x3F1c547b21f65e10480dE3ad8E19fAAC46C95034

To generate stETH on Holesky, simply transfer any ETH amount to the stETH contract.


See the example transaction here.


Example transaction for minting stETH on Holesky
Stake with EigenLayer
Contracts
stETH ERC20 Contract

stETH StrategyManager

How to
To stake with EigenLayer, you need to deposit stETH into the stETH Strategy contract.

First, approve the StrategyManager account as spender on your stETH: 


approve the StrategyManager
Values should be:

_spender: 0xA744429bf286789225308a81A5a4b8049562A362

_amount: 115792089237316195423570985008687907853269984665640564039457584007913129639935

Then, find the depositIntoStrategy function on the StrategyManager contract and call it with the amount you'd like to restake:


Call depositIntoStrategy
The parameters to pass should be:

strategy: 0x96D47307C2844fb46792BcEFC903855440b4b2ad

token: 0x3F1c547b21f65e10480dE3ad8E19fAAC46C95034

amount: amount you'd like to re-stake

To make sure your tokens got deposited, go to the strategy contract and call the function shares.


