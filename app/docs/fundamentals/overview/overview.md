# What is Bitcoin?

## Overview

Bitcoin is a decentralized digital currency and payment system that operates without a central authority or intermediary. It was created in 2009 by an anonymous person or group using the pseudonym Satoshi Nakamoto.

## Core Definition

**Bitcoin** (capitalized) refers to the protocol, network, and system.  
**bitcoin** (lowercase) or **BTC** refers to the currency unit.

## Key Characteristics

### Decentralized
- No central authority controls Bitcoin
- Operated by a network of nodes worldwide
- No single point of failure
- Censorship-resistant

### Digital
- Exists only in digital form
- No physical coins or bills
- Transferred electronically over the internet
- Stored in digital wallets

### Peer-to-Peer
- Direct transactions between users
- No intermediaries required
- No banks or payment processors
- Users maintain full control

### Cryptographically Secured
- Uses cryptographic proof instead of trust
- Digital signatures verify ownership
- Hash functions secure the blockchain
- Public-key cryptography for addresses

## How Bitcoin Works

### The Blockchain

Bitcoin uses a **blockchain** - a distributed ledger that records all transactions:

1. **Transactions**: Users send bitcoin to addresses
2. **Verification**: Network [nodes](/docs/glossary#node) verify [transactions](/docs/glossary#transaction)
3. **Grouping**: [Transactions](/docs/glossary#transaction) are grouped into [blocks](/docs/glossary#block)
4. **Mining**: [Miners](/docs/glossary#mining) compete to add [blocks](/docs/glossary#block) to the chain
5. **Consensus**: Network agrees on valid [blocks](/docs/glossary#block)
6. **Immutable**: Once added, [blocks](/docs/glossary#block) cannot be changed

### Network Participants

**Nodes:**
- [Full nodes](/docs/glossary#full-node): Store complete blockchain, validate all [transactions](/docs/glossary#transaction)
- Light nodes: Store minimal data, rely on [full nodes](/docs/glossary#full-node)
- Mining [nodes](/docs/glossary#node): Create new [blocks](/docs/glossary#block), secure the network

**Miners:**
- Verify [transactions](/docs/glossary#transaction)
- Create new [blocks](/docs/glossary#block)
- Secure the network through [proof-of-work](/docs/glossary#proof-of-work-pow)
- Receive [block rewards](/docs/glossary#block-reward) and fees

**Users:**
- Send and receive bitcoin
- Control their private keys
- Participate in the network

## What Makes Bitcoin Unique

### Fixed Supply
- Maximum of 21 million BTC will ever exist
- Predictable issuance schedule
- Deflationary by design
- Scarcity built into the protocol

### Permissionless
- Anyone can use Bitcoin
- No account creation required
- No identity verification
- No geographic restrictions

### Borderless
- Works anywhere with internet
- No currency conversion needed
- Same rules everywhere
- Global payment network

### Transparent
- All transactions are public
- Blockchain is auditable
- Anyone can verify transactions
- Open-source code

### Pseudonymous
- Addresses are not directly linked to identities
- Privacy through address reuse avoidance
- Optional privacy enhancements
- Transparent but not necessarily identifiable

## Bitcoin's Purpose

### Digital Cash
- Fast, global payments
- Low transaction fees (compared to traditional systems)
- Works 24/7
- No banking hours

### Store of Value
- Limited supply creates scarcity
- Inflation-resistant
- "Digital gold" properties
- Long-term value preservation

### Financial Sovereignty
- Users control their money
- No third-party custody
- Censorship-resistant
- Financial inclusion

## Technical Innovation

### Proof-of-Work
- Secures the network through computational work
- Prevents [double-spending](/docs/glossary#double-spend)
- Reaches [consensus](/docs/glossary#consensus) without central authority
- Requires significant computational resources

### UTXO Model
- [Unspent Transaction Outputs](/docs/glossary#utxo-unspent-transaction-output)
- Each [transaction](/docs/glossary#transaction) consumes and creates [UTXOs](/docs/glossary#utxo-unspent-transaction-output)
- Enables parallel [transaction](/docs/glossary#transaction) processing
- Clear ownership model

### Merkle Trees
- Efficient [transaction](/docs/glossary#transaction) verification
- Compact [block](/docs/glossary#block) structure
- Enables [SPV](/docs/glossary#spv-simplified-payment-verification) (Simplified Payment Verification)
- Cryptographic integrity

## Resources

- [Bitcoin GitHub Repository](https://github.com/bitcoin/bitcoin) - Bitcoin Core source code
- [Bitcoin Whitepaper](https://bitcoin.org/bitcoin.pdf) - Original Bitcoin paper by Satoshi Nakamoto

## Related Topics

- [Problems Bitcoin Solved](/docs/fundamentals/problems) - The fundamental problems Bitcoin addresses
- [Bitcoin Trilemma](/docs/fundamentals/trilemma) - The fundamental trade-offs in Bitcoin design
- [Decentralization](/docs/fundamentals/decentralization) - Why decentralization matters
- [Trust Model](/docs/fundamentals/trust-model) - How Bitcoin eliminates the need for trust
- [Monetary Properties](/docs/fundamentals/monetary-properties) - Bitcoin's economic characteristics
- [Consensus Mechanism](/docs/fundamentals/consensus) - How Bitcoin reaches agreement

## Navigation

- [Fundamentals Documentation](/docs/fundamentals) - Return to Fundamentals overview
