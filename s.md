🛠️
AVS Implementation
Every AVS must implement both execution and validation logic.

It's recommended to use the AVS Samples repo as a boilerplate for your AVS. It includes a couple of examples that make it clearer how the network operates and will get you up and running in no time.

Setup
Make sure you already deployed your AVS contracts prior to running the examples.
See Contracts Deployment.

To start, clone the AVS Samples repo:

Copy
git clone git@github.com:Othentic-Labs/simple-price-oracle-avs-example.git
Then, go into the directory and delete the .git directory:

Copy
cd simple-price-oracle-avs-example
rm -rf .git
Configuration
Running the demo network included in the repo requires you to configure the AVS details via a .env file.

You can use the .env.example file as a base:

Copy
AVS_GOVERNANCE_ADDRESS=
ATTESTATION_CENTER_ADDRESS=

PRIVATE_KEY_PERFORMER=
PRIVATE_KEY_AGGREGATOR=
PRIVATE_KEY_ATTESTER1=
PRIVATE_KEY_ATTESTER2=
PRIVATE_KEY_ATTESTER3=

PINATA_API_KEY=7824585a98fe36414d68
PINATA_SECRET_API_KEY=41a53a837879721969e73008d91180df30dbc66097c7f75f08cd5489176b43ea
IPFS_HOST=https://othentic.mypinata.cloud/ipfs/

OTHENTIC_BOOTSTRAP_ID=12D3KooWBNFG1QjuF3UKAKvqhdXcxh9iBmj88cM5eU2EK5Pa91KB
OTHENTIC_BOOTSTRAP_SEED=97a64de0fb18532d4ce56fb35b730aedec993032b533f783b04c9175d465d9bf
The addresses from the contracts should come from your AVS deployments. Note that you should use the proxy addresses.

The "Performer", "Aggregator" and "Attesters" are all "Operators". 
They should all be registered as Operators, see Operator Registration

Get AVS Addresses
To find your AVS contract addresses, run the following command:

Copy
othentic-cli network contracts
The output should contain the necessary env variables:

Copy
OTHENTIC_REGISTRY_ADDRESS=...
AVS_GOVERNANCE_ADDRESS=...
ATTESTATION_CENTER_ADDRESS=...
Structure
The AVS implementation is comprised of two parts:

Task Execution

Task Validation

Take a look at the Price_Oracle_AVS_JS directory to see how these are implemented.

They each run as their own service (Task_Performer for execution, AVS_WebAPI for validation), and you can invoke the Task_Performer via a simple curl call (see below).

Task Performer
The Task Performer must create a "proof" which can be validated by Attester Nodes easily. This proof could be the result of a calculation, a ZK proof, the CID of a JSON on IPFS, etc. 

Task Validation implementation should be able to use this proof to attest to the task properly.

In order to publish the task, the Task Performer must send a JSON-RPC request to an arbitrary node on the network, which propagates to its peers. See the sendTask function in the Task_Performer module to learn how to send such requests.

See Running a network to learn how to run a node with the JSON-RPC API exposed.

Task Validation
The Validation Service must implement the /validate endpoint.

The task validation API is an endpoint used by the Attester nodes. When an Attesters receives a proof from a Task Performer, they use the Validation Service in order to validate the task.

The Attester nodes themselves don't run the validation logic. They rely on the Validation Service for that. You can compare this to how the Consensus Client communicates with the Execution Client in Ethereum.

Check Validation Service example to learn more about how to implement this sort of API.

Run the Price Oracle AVS
Once you configure the necessary details in the .env file, you should be able to run the Price Oracle AVS against your deployed AVS contracts.

We provide a sample docker-compose configuration that sets up the following services:

Aggregator node

3 Attester nodes

Validation Service endpoint

TaskPerformer endpoint

To set up the environment, create a .env file with the usual Othentic configurations (see the .env.example), then run:

Copy
docker-compose up --build
Building the images might take a few minutes

Generating a task
The docker-compose environment includes the Task Performer service which exposes an endpoint that lets you manually run a task.
To invoke it, simply use curl:

Copy
curl -X POST http://localhost:4003/task/execute
In the docker-compose logs you should now see the task propagate inside the network as the attester nodes validate the task and the aggregator submits the task on-chain.

Updating the Othentic node version
To update the othentic-cli inside the docker images to the latest version, you need to rebuild the images using the following command:

Copy
docker-compose build --no-cache
