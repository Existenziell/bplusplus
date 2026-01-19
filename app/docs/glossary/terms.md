## A

### 51% Attack
A theoretical attack where an entity controlling more than 50% of the network's hash rate could potentially double-spend transactions or prevent confirmations. Becomes exponentially more expensive as the network grows.

### Absolute Time Lock
A time lock that prevents a transaction from being spent until a specific block height or timestamp. Implemented using OP_CHECKLOCKTIMEVERIFY (CLTV).

### Address
A public identifier where Bitcoin can be received. Generated from a public key using hash functions. Different types exist: P2PKH (starts with 1), P2SH (starts with 3), P2WPKH/P2WSH (starts with bc1q), P2TR (starts with bc1p).

### Address Reuse
Using the same Bitcoin address for multiple transactions. Generally discouraged as it reduces privacy by linking transactions together and revealing spending patterns.

### Anchor Outputs
A mechanism in Lightning Network that allows channels to be closed with lower fees by using a small "anchor" output that can be used to bump fees via CPFP.

### ASIC (Application-Specific Integrated Circuit)
Specialized hardware designed specifically for Bitcoin mining. ASICs are far more efficient than CPUs or GPUs for SHA-256 hashing.

### Atomic Swap
A peer-to-peer exchange of cryptocurrencies between two parties without the need for a trusted third party. Uses hash time-locked contracts (HTLCs).

### API (Application Programming Interface)
How applications communicate with Bitcoin nodes (typically via RPC).

## B

### Batching
Combining multiple payments into a single transaction to reduce fees. Instead of creating separate transactions, multiple outputs are included in one transaction, sharing the overhead costs.

### Base58
An encoding scheme used in Bitcoin addresses. Similar to Base64 but excludes characters that could be confused (0, O, I, l) and includes a checksum.

### Bech32
A checksummed base32 format used for SegWit addresses. Addresses start with `bc1` for mainnet or `tb1` for testnet.

### Block
A collection of transactions grouped together and added to the blockchain. Each block contains a header with proof-of-work and a list of transactions.

### Blockchain
A distributed, immutable ledger of all Bitcoin transactions. Blocks are cryptographically linked in chronological order, making historical data tamper-evident.

### Block Header
The 80-byte metadata at the start of each block. Contains version, previous block hash, merkle root, timestamp, difficulty target, and nonce.

### Block Height
The number of blocks in the chain before a given block. The genesis block has height 0.

### Block Reward
The amount of Bitcoin awarded to miners for successfully mining a block. Currently 3.125 BTC (after the 2024 halving).

### Block Size
The size of a block in bytes. Bitcoin has a 1 MB base block size limit, which can effectively reach ~4 MB with SegWit transactions.

### Block Time
The average time between consecutive blocks. Bitcoin targets 10 minutes per block, maintained through difficulty adjustment.

### Block Template
A structure containing transactions and block header fields that miners use to construct blocks.

### BOLT (Basis of Lightning Technology)
Technical specifications for the Lightning Network protocol. BOLT documents define how Lightning nodes communicate and route payments.

### BIP (Bitcoin Improvement Proposal)
A design document proposing changes or additions to Bitcoin. Examples include BIP 16 (P2SH), BIP 141 (SegWit), BIP 341 (Taproot).

## C

### CLTV (CheckLockTimeVerify)
An opcode that locks funds until a specific block height or timestamp. Used for absolute time locks.

### Coinbase Transaction
The first transaction in every block. It has no inputs and creates new Bitcoin as the block reward plus transaction fees.

### Coin Selection
The process of choosing which UTXOs to spend when creating a transaction. Various algorithms exist (largest first, smallest first, branch and bound).

### CoinJoin
A privacy technique where multiple users combine their transactions into a single transaction, making it difficult to determine which inputs correspond to which outputs. Each participant signs only their own inputs.

### Commitment Transaction
In Lightning Network, a transaction that represents the current state of a payment channel. Updated off-chain as payments are made.

### Confirmation
When a transaction is included in a block that is added to the blockchain. More confirmations (subsequent blocks) increase certainty that the transaction is final. 6 confirmations is widely considered secure for large amounts.

### Consensus
Agreement among network participants about the state of the blockchain.

### Consensus Rules
The rules that all Bitcoin nodes must follow to maintain consensus. Breaking these rules makes transactions or blocks invalid.

### Censorship Resistance
The ability to make transactions that cannot be blocked or reversed by any central authority. Achieved through decentralization - no single entity controls which transactions are included in blocks.

### Change Output
A transaction output that sends excess funds back to the sender. Created when input value exceeds payment amount plus fees.

### CPFP (Child Pays For Parent)
A fee bumping technique where a child transaction pays higher fees, incentivizing miners to include both the parent and child transactions in a block.

### CSV (CheckSequenceVerify)
An opcode that locks funds for a relative time period (relative to when the transaction is confirmed). Used for relative time locks.

### Compact Block
A block relay protocol that reduces bandwidth by sending only block headers and short transaction IDs, allowing nodes to reconstruct blocks from their mempool.

### Channel
A payment channel between two Lightning nodes. Enables off-chain payments.

### Channel Capacity
The total amount of Bitcoin locked in a payment channel (sum of both parties' contributions).

### Channel Closing
The process of finalizing a Lightning payment channel by broadcasting the final state to the Bitcoin blockchain. Can be cooperative or force close.

### Channel Funding
The process of opening a Lightning payment channel by creating an on-chain transaction that locks Bitcoin in a 2-of-2 multisig address.

### Channel State
The current balance distribution in a Lightning payment channel. Updated off-chain as payments are made through the channel.

### Cooperative Close
In Lightning Network, closing a payment channel with both parties' agreement. Fastest and cheapest way to close a channel.

## D

### Decentralization
The distribution of control, decision-making, and infrastructure across many independent participants rather than a single central authority. Bitcoin achieves this through open-source code, distributed mining, and permissionless node operation.

### Derivation Path
A sequence of indices that specifies how to derive a specific key from a master seed in an HD wallet. Format: `m/purpose'/coin'/account'/change/index`. The apostrophe indicates hardened derivation.

### Descriptors
A standardized format (BIP 380-386) for describing how to derive addresses and scripts from keys. More expressive than raw keys alone, supporting complex scripts and multiple key types.

### DATUM
A mining template format that allows miners to customize transaction ordering and inclusion in blocks. Used by some mining pools to give miners more control over block construction.

### Difficulty
A measure of how hard it is to find a valid block hash. Adjusts every 2016 blocks to maintain ~10 minute block times.

### Difficulty Target
The maximum hash value that is considered valid for a block. Miners must find a hash below this target. Lower target = higher difficulty.

### Double Spend
An attempt to spend the same Bitcoin twice. Prevented by the blockchain's consensus mechanism.

### Dust
A transaction output so small that the fee to spend it would exceed its value. Typically 546 satoshis is considered dust.

## E

### ECDSA (Elliptic Curve Digital Signature Algorithm)
The cryptographic algorithm used for Bitcoin signatures. Based on the secp256k1 elliptic curve.

### ECDH (Elliptic Curve Diffie-Hellman)
A key exchange protocol used in Lightning Network onion routing to derive shared secrets between hops.

## F

### Fee Bumping
Techniques to increase the fee of an unconfirmed transaction to speed up confirmation. Methods include RBF (Replace-by-Fee) and CPFP (Child Pays for Parent).

### Fee Rate
The fee paid per virtual byte (vByte) of transaction size. Expressed in satoshis per vByte (sat/vB).

### Force Close
In Lightning Network, closing a payment channel unilaterally by broadcasting the latest commitment transaction. Requires waiting for a timelock to expire.

### Finality
The assurance that a transaction cannot be reversed. Bitcoin provides probabilistic finality—more confirmations make reversal exponentially more difficult and expensive, but never mathematically impossible.

### Fork
When the blockchain splits into two competing chains. Can be temporary (orphan blocks) or permanent (hard fork).

### Full Node
A Bitcoin node that validates all transactions and blocks, maintaining a complete copy of the blockchain.

## G

### Genesis Block
The first block in the Bitcoin blockchain, created by Satoshi Nakamoto on January 3, 2009.

### Gossip Protocol
The mechanism by which Bitcoin nodes share information (blocks, transactions) with their peers. Nodes don't re-broadcast to the sender.

## H

### Halving
An event that occurs every 210,000 blocks (~4 years) where the block reward is cut in half. Reduces Bitcoin's inflation rate.

### Hash
A one-way cryptographic function that produces a fixed-size output from any input. Bitcoin uses SHA-256 and RIPEMD-160.

### Hash Rate
The number of hash calculations per second performed by the Bitcoin network. Currently ~700 EH/s (exahashes per second).

### Hard Fork
A protocol change that makes previously invalid blocks/transactions valid. Requires all nodes to upgrade. Non-upgraded nodes will reject new blocks, potentially creating a permanent chain split.

### HD Wallet (Hierarchical Deterministic Wallet)
A wallet that generates keys from a single seed phrase using BIP32. Allows backup of all keys with just the seed and enables organized key derivation paths.

### HTLC (Hash Time-Locked Contract)
A conditional payment used in Lightning Network. Requires knowledge of a preimage (hash lock) and expires after a time period (time lock).

## I

### IBD (Initial Block Download)
The process of downloading and validating the entire blockchain when first starting a Bitcoin node.

### Input
A reference to a previous transaction output (UTXO) that is being spent in a new transaction.

### Invoice
A payment request in Lightning Network. Encoded as a BOLT11 string (starts with `lnbc` or `lntb`).

## K

### Key Pair
A cryptographic pair consisting of a private key and its corresponding public key. The private key signs transactions, and the public key verifies signatures and generates addresses.

## L

### Lightning Network
A second-layer payment protocol built on Bitcoin. Enables instant, low-cost payments through payment channels.

### Locktime
A field in transactions that prevents the transaction from being included in a block before a certain time or block height.

## M

### Mainnet
The production Bitcoin network where real Bitcoin is used.

### Mempool (Memory Pool)
The collection of unconfirmed transactions that a node has received but not yet included in a block.

### Merkle Root
A hash of all transactions in a block, organized in a Merkle tree. Included in the block header.

### Merkle Tree
A binary tree structure where each leaf is a transaction hash, and parent nodes are hashes of their children. Used to efficiently verify transaction inclusion in blocks.

### MAST (Merkle Abstract Syntax Tree)
A data structure used in Taproot that allows representing multiple spending conditions as a Merkle tree. Only the executed path needs to be revealed, improving privacy.

### MuSig
A signature aggregation scheme using Schnorr signatures that allows multiple parties to create a single combined signature. Enables efficient multisig with Taproot.

### MPP (Multi-Part Payment)
A Lightning payment split across multiple routes. Allows larger payments and improves success rates.

### Miniscript
A structured subset of Bitcoin Script that is easier to analyze and compose. Enables building complex spending conditions in a predictable, composable way with automatic analysis of spending costs and requirements.

### Mining Pool
A group of miners who combine their hash power and share rewards proportionally.

### Multisig (Multi-Signature)
A script that requires multiple signatures to spend. Common patterns include 2-of-3 or 3-of-5 signatures.

## N

### Node
A computer running Bitcoin software that maintains a copy of the blockchain and validates transactions.

### Node (Lightning)
A computer running Lightning Network software. Connects to other nodes via payment channels.

### Nonce
A number that miners change when trying to find a valid block hash. Part of the proof-of-work process.

## O

### OP_RETURN
An opcode that creates provably unspendable outputs. Used for storing data on the blockchain without bloating the UTXO set.

### OPCODE
An operation in Bitcoin Script. Examples include OP_CHECKSIG, OP_DUP, OP_HASH160.

### Onion Routing
A privacy technique where payment data is encrypted in layers. Each hop only knows the previous and next hop.

### Orphan Block
A valid block that is not part of the main chain. Occurs when two blocks are found simultaneously.

### Output
A destination in a transaction that specifies an amount and a locking script (scriptPubKey).

## P

### Payjoin
A privacy technique where the sender and receiver both contribute inputs to a transaction, breaking the common-input-ownership heuristic used by blockchain analysis. Also known as P2EP (Pay-to-Endpoint).

### Peer
Another Bitcoin node that your node is connected to. Nodes maintain 8-10 outbound and 8-10 inbound connections.

### P2PKH (Pay-to-Pubkey-Hash)
The most common legacy Bitcoin script pattern. Locks funds to a hash of a public key.

### P2SH (Pay-to-Script-Hash)
A script pattern that locks funds to a hash of a script. The actual script is revealed when spending.

### P2TR (Pay-to-Taproot)
The modern Bitcoin script pattern using Taproot. Provides better privacy and efficiency.

### P2WPKH (Pay-to-Witness-Pubkey-Hash)
A SegWit script pattern that uses witness data instead of scriptSig.

### P2WSH (Pay-to-Witness-Script-Hash)
A SegWit script pattern for complex scripts, using witness data.

### Payment Channel
A 2-of-2 multisig address that locks Bitcoin between two parties, enabling off-chain transactions.

### Payment Hash
A hash of the payment preimage. Used in HTLCs to ensure only the recipient can claim payment.

### Payment Preimage
A random secret that hashes to the payment hash. Revealed by the recipient to claim payment.

### Preimage
The original data that produces a specific hash. In Lightning, the payment preimage proves payment was received.

### Propagation
The process of spreading blocks and transactions through the Bitcoin network.

### Private Key
A 256-bit secret number that allows spending Bitcoin from its associated addresses. Must be kept secure - anyone with the private key can spend the funds. Generated randomly or derived from a seed phrase.

### Proof-of-Work (PoW)
The consensus mechanism that secures Bitcoin. Miners must find a hash below a target difficulty.

### PSBT (Partially Signed Bitcoin Transaction)
A standardized format for Bitcoin transactions that need multiple signatures. Allows signing in steps.

### Public Key
A cryptographic key derived from a private key using elliptic curve multiplication. Used to generate addresses and verify signatures. Can be shared publicly without compromising security.

## R

### RBF (Replace-by-Fee)
A feature that allows replacing an unconfirmed transaction with a new one paying higher fees.

### Regtest
A local testing network where you can create blocks instantly. Useful for development.

### Relative Time Lock
A time lock that prevents a transaction from being spent until a certain number of blocks have passed since the UTXO was confirmed. Implemented using OP_CHECKSEQUENCEVERIFY (CSV).

### Relay
The act of forwarding blocks and transactions to other nodes in the network.

### RIPEMD-160
A cryptographic hash function used in Bitcoin alongside SHA-256. Used in address generation (SHA256 then RIPEMD-160 of public key).

### RPC (Remote Procedure Call)
A protocol for communicating with a Bitcoin node. Used by applications to query blockchain data and create transactions.

### Routing
The process of finding a path through the Lightning Network from sender to recipient.

### Routing Fee
The fee charged by Lightning nodes for forwarding payments. Consists of base fee and proportional fee.

## S

### Satoshi
The smallest unit of Bitcoin. 1 BTC = 100,000,000 satoshis. Named after Satoshi Nakamoto.

### Seed Phrase
A human-readable backup of a wallet's master key, typically 12-24 words from the BIP39 wordlist. Also called mnemonic phrase or recovery phrase. Allows complete wallet recovery if stored securely.

### Share
A proof-of-work submission in pool mining that meets pool difficulty (lower than network difficulty).

### Script
Bitcoin's programming language. Used to define spending conditions for transaction outputs.

### ScriptPubKey
The locking script in a transaction output. Defines the conditions required to spend the output.

### ScriptSig
The unlocking script in a transaction input. Provides the data needed to satisfy the scriptPubKey.

### SegWit (Segregated Witness)
A protocol upgrade that separates witness data from transaction data. Fixes transaction malleability and increases capacity.

### SHA-256
The cryptographic hash function used in Bitcoin's proof-of-work. Produces a 256-bit output.

### SHA256D
Double SHA-256 hashing used in Bitcoin. The block header is hashed twice: `SHA256(SHA256(block_header))`. This is what miners compute during proof-of-work.

### Schnorr Signature
A cryptographic signature scheme used in Taproot (BIP 340). More efficient than ECDSA and enables signature aggregation and batch verification.

### Selfish Mining
An attack strategy where a miner withholds found blocks to gain an unfair advantage. By selectively releasing blocks, an attacker with sufficient hash rate can waste honest miners' work.

### Silent Payments
A privacy protocol (BIP 352) that allows generating fresh addresses without interaction. The sender derives a unique address from the recipient's public key, preventing address reuse while maintaining a static identifier.

### Signet
A test network with additional signature requirements. More realistic than regtest, safer than testnet.

### Soft Fork
A protocol change that tightens consensus rules, making previously valid blocks/transactions invalid. Backward compatible - non-upgraded nodes will still accept new blocks but may not understand new features.

### Sphinx Protocol
The onion routing protocol used in Lightning Network. Provides privacy by encrypting payment data in layers.

### SPV (Simplified Payment Verification)
A method for lightweight clients to verify transactions without downloading the full blockchain.

### Stratum
A protocol used for communication between miners and mining pools.

### Sybil Attack
An attack where a malicious actor creates many fake identities (nodes) to gain disproportionate influence over the network. Bitcoin mitigates this through proof-of-work, which requires real resources to participate.

## T

### Taproot
A Bitcoin protocol upgrade (BIP 341) that improves privacy and efficiency. Uses Schnorr signatures and Merkle trees.

### Testnet
A public testing network with test Bitcoin. Used for development and testing.

### Time Lock
A mechanism that prevents funds from being spent until a certain condition is met. Can be absolute (specific time/block) or relative (time since confirmation).

### TLV (Type-Length-Value)
A flexible encoding format used in Lightning Network for extensible protocol fields.

### Transaction
A transfer of Bitcoin from one or more inputs to one or more outputs. The fundamental unit of Bitcoin transfers.

### Transaction Fee
The amount paid to miners for including a transaction in a block. Calculated as inputs minus outputs.

### Transaction ID (TXID)
A unique identifier for a transaction, calculated as the hash of the transaction data.

### Transaction Malleability
A vulnerability where transaction signatures could be modified without invalidating them, changing the transaction ID. Fixed by SegWit, which moved signatures to witness data.

## U

### UTXO (Unspent Transaction Output)
A transaction output that hasn't been spent yet. UTXOs are the "coins" in Bitcoin.

### UTXO Set
The collection of all unspent transaction outputs. Represents the current state of who owns what Bitcoin.

## V

### vByte (Virtual Byte)
A unit of transaction size used for fee calculation in SegWit. Weight units divided by 4.

## W

### Wallet
Software that manages Bitcoin keys and creates transactions. Can be full node, SPV, or custodial.

### Watchtower
A service in Lightning Network that monitors channels for malicious force close attempts. Helps protect users who go offline from being cheated.

### Weight Units
A measure of transaction size used in SegWit. Base transaction data counts as 4 weight units per byte, witness data counts as 1.

### Witness
Data in SegWit transactions that is separated from the base transaction. Includes signatures and public keys.

## Z

### ZMQ (ZeroMQ)
A messaging library used for real-time notifications from Bitcoin nodes. Provides instant block and transaction notifications.
