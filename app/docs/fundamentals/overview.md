# What is Bitcoin?

Bitcoin is a decentralized digital currency and payment system that operates without a central authority or intermediary. It was created in 2009 by an anonymous person or group using the pseudonym [Satoshi Nakamoto](/docs/history/people#satoshi-nakamoto).

## Core Definition

**Bitcoin** (capitalized) refers to the protocol, network, and system.  
**bitcoin** (lowercase) or **BTC** refers to the currency unit.

## How Bitcoin Works

### The Blockchain

Bitcoin uses a **blockchain** - a distributed ledger that records all transactions:

1. **Transactions**: Users send bitcoin to addresses
2. **Verification**: Network [nodes](/docs/glossary#node) verify [transactions](/docs/glossary#transaction)
3. **Grouping**: Transactions are grouped into [blocks](/docs/glossary#block)
4. **Mining**: [Miners](/docs/glossary#mining) compete to add blocks to the chain
5. **Consensus**: Network agrees on valid blocks
6. **Immutable**: Once added, blocks cannot be changed

### Addresses & Keys

Bitcoin uses public-key cryptography to secure ownership:

**Private Key:**
- A 256-bit random number (kept secret)
- Used to sign transactions and prove ownership
- Anyone with the private key controls the bitcoin

**Public Key:**
- Derived mathematically from the private key
- Can be shared publicly
- Used to verify signatures

**Address:**
- A hash of the public key (shorter, safer to share)
- Where others send bitcoin to you
- Multiple address formats exist (Legacy, SegWit, Taproot)

The relationship is one-way: private key → public key → address. You cannot reverse-engineer a private key from an address.

### Transaction Lifecycle

1. **Creation**: User constructs a transaction specifying inputs (UTXOs to spend) and outputs (recipient addresses and amounts)
2. **Signing**: User signs the transaction with their private key, proving ownership of the inputs
3. **Broadcasting**: Signed transaction is sent to the network
4. **Mempool**: Transaction waits in the [mempool](/docs/glossary#mempool) (memory pool) of unconfirmed transactions
5. **Selection**: A miner selects the transaction (typically prioritizing higher fees)
6. **Inclusion**: Transaction is included in a candidate block
7. **Mining**: Miner finds valid proof-of-work for the block
8. **Propagation**: New block spreads across the network
9. **Confirmation**: Each subsequent block adds another confirmation, increasing security

A transaction with 6 confirmations is generally considered irreversible.

### Network Participants

**Nodes:**
- [Full nodes](/docs/glossary#full-node): Store complete blockchain, validate all transactions
- Light nodes: Store minimal data, rely on full nodes
- Mining nodes: Create new blocks, secure the network

**Miners:**
- Verify transactions
- Create new blocks
- Secure the network through [proof-of-work](/docs/glossary#proof-of-work-pow)
- Receive [block rewards](/docs/glossary#block-reward) and fees

**Users:**
- Send and receive bitcoin
- Control their private keys
- Participate in the network

## Technical Innovation

### Proof-of-Work
- Secures the network through computational work
- Prevents [double-spending](/docs/glossary#double-spend)
- Reaches [consensus](/docs/glossary#consensus) without central authority
- Requires significant computational resources

### UTXO Model
- [Unspent Transaction Outputs](/docs/glossary#utxo-unspent-transaction-output)
- Each transaction consumes and creates UTXOs
- Enables parallel transaction processing
- Clear ownership model

### Merkle Trees
- Efficient transaction verification
- Compact block structure
- Enables [SPV](/docs/glossary#spv-simplified-payment-verification) (Simplified Payment Verification)
- Cryptographic integrity

## The Many Faces of Bitcoin

### The New Element

Bitcoin represents something unprecedented: **Element Zero**, consisting only of energy.

**Proof of Work** is the bridge between the physical and digital worlds. Real energy (electricity, computational power, thermodynamic work) is consumed to maintain the digital scarcity of bitcoin. This is not a bug, but a feature. The energy expenditure is what gives bitcoin its unforgeable costliness, anchoring digital value to physical reality in a way no other digital asset can claim.

### The Currency

Bitcoin is **deflationary money with absolute scarcity**. Only 21 million bitcoin will ever exist, a fixed supply that cannot be inflated, diluted, or manipulated.

This scarcity will produce conditions of human interaction never before seen in monetary history:
- **Abundance through deflation**: As productivity increases, the value of saved bitcoin grows
- **Long-term thinking**: Sound money encourages saving and investment over consumption
- **True price discovery**: Without monetary manipulation, markets can function honestly

### The Commodity

Bitcoin can **store value across time**. Like gold, but better:
- Infinitely divisible
- Perfectly portable
- Easily verifiable
- Impossible to counterfeit
- Resistant to confiscation

### The Protocol

Bitcoin is a protocol that allows for **free and instant transfers of value** across the entire planet.

- **Trustless**: No need to trust any third party
- **Permissionless**: Anyone can participate without asking permission
- **Borderless**: Works the same everywhere on Earth

**Bitcoin is a trust machine.** It replaces trust in institutions with mathematical verification.

### The Network

**Miners**: Transform energy into bitcoin. They compete to solve cryptographic puzzles, securing the network and processing transactions. In doing so, they convert raw energy into the most secure monetary network ever created.

**Nodes**: Verify that the network rules were followed. Every node is a server on the Bitcoin network, independently validating every transaction and block. This distributed verification is what makes Bitcoin truly decentralized.

### The Idea

At its core, Bitcoin is nothing but a **meme**, an idea that replicates itself through human minds.

Bitcoin embodies the idea that a **fixed set of rules can exist** around which entire societies can be built, rules that no government, corporation, or individual can change.

It unlocks the **true power of human cooperation**: voluntary exchange based on mutually agreed rules that cannot be violated.

Once the concept of sound, digital, decentralized money enters someone's mind, it cannot be unseen. It spreads from person to person, generation to generation, border to border.

### The Threat

Bitcoin is under **constant attack** from the most sophisticated entities on this planet:
- Intelligence agencies (NSA, KGB, Mossad, and countless others)
- Central banks protecting their monopoly on money
- Governments seeking to maintain financial control
- Hackers seeking the largest bug bounty in history

**And it has never been hacked.**

The network has operated continuously since January 3, 2009, securing hundreds of billions of dollars in value. The only theoretical attack (a 51% attack) would require controlling more computational power than all other miners combined, a feat that grows more impossible as the network expands.

Bitcoin cannot be hacked. It can only be adopted.
