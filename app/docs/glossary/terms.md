## 0-9

### 51% Attack
A theoretical attack where an entity controlling more than 50% of the network's hash rate could potentially double-spend transactions or prevent confirmations. The attacker could rewrite recent blockchain history by mining an alternative chain faster than the honest network. However, this attack becomes exponentially more expensive as the network grows, currently requiring billions of dollars in specialized hardware and ongoing electricity costs. Even with majority hash power, an attacker cannot steal coins, change consensus rules, or alter transactions that have many confirmations.

### 2-of-3 Multisig
A common multisignature configuration requiring 2 signatures from 3 possible signers to spend funds. This setup provides a balance between security and convenience: if one key is lost or compromised, funds remain accessible and secure. Often used for personal security (user key + hardware wallet + backup), business treasury management, or escrow services where a neutral third party can resolve disputes. The three keys are typically stored in different locations or controlled by different parties to minimize single points of failure.

### 21 Million
The maximum supply of Bitcoin that will ever exist, making it one of the scarcest assets ever created. This hard cap is enforced by the protocol's consensus rules and achieved through the halving schedule, with the last satoshi expected to be mined around the year 2140. The fixed supply creates a deflationary monetary policy that contrasts sharply with traditional fiat currencies, which can be printed without limit. This scarcity is often cited as a key driver of Bitcoin's value proposition as "digital gold" or a store of value.

## A

### Absolute Time Lock
A time lock that prevents a transaction from being spent until a specific block height or Unix timestamp is reached. Implemented using the OP_CHECKLOCKTIMEVERIFY (CLTV) opcode, which causes script execution to fail if the specified time hasn't passed. This is useful for creating vesting schedules, inheritance mechanisms, or ensuring funds cannot be moved before a certain date. Unlike relative time locks, absolute locks reference a fixed point in time rather than being relative to when the UTXO was created.

### Address
A public identifier where Bitcoin can be received, analogous to an email address for money. Generated from a public key through hash functions, addresses provide a shorter, checksummed format that's easier to share and helps detect typos. Different address types exist reflecting Bitcoin's evolution: P2PKH (starts with 1) for legacy, P2SH (starts with 3) for script hashes, P2WPKH/P2WSH (starts with bc1q) for native SegWit, and P2TR (starts with bc1p) for Taproot. Newer address types generally offer lower fees and better privacy.

### Address Reuse
Using the same Bitcoin address for multiple transactions, which is generally discouraged for both privacy and security reasons. Reusing addresses links transactions together on the public blockchain, making it easier to trace your financial activity and spending patterns. Additionally, once you spend from an address, your public key is revealed, which theoretically weakens security against future quantum computing attacks. Best practice is to generate a fresh address for each transaction, which HD wallets handle automatically.

### Anchor Outputs
A mechanism in Lightning Network that allows payment channels to be closed reliably even when on-chain fee rates have increased significantly since the channel was opened. Each commitment transaction includes small "anchor" outputs that either party can use to attach a child transaction with higher fees via CPFP (Child Pays for Parent). This solves the problem of pre-signed commitment transactions becoming stuck if network fees spike, ensuring channels can always be closed in a timely manner. Anchor outputs are a key improvement for Lightning Network reliability and security.

### ASIC (Application-Specific Integrated Circuit)
Specialized hardware designed and manufactured specifically for Bitcoin mining, optimized to perform SHA-256 hash calculations as efficiently as possible. ASICs are orders of magnitude more efficient than general-purpose CPUs or GPUs, making other hardware economically unviable for mining. Modern Bitcoin ASICs achieve hash rates measured in hundreds of terahashes per second while consuming several kilowatts of power. The development of ASICs has led to significant centralization concerns in mining hardware manufacturing, with a small number of companies dominating production.

### Atomic Swap
A peer-to-peer exchange of cryptocurrencies between two parties without the need for a trusted third party or centralized exchange. Atomic swaps use hash time-locked contracts (HTLCs) to ensure that either both parties receive their funds or neither does. The swap is "atomic" in the sense that it cannot be partially completed. This enables trustless trading across different blockchains, such as exchanging Bitcoin for Litecoin directly. The technology requires both blockchains to support compatible scripting capabilities and hash functions.

### API (Application Programming Interface)
A set of protocols and tools that allow applications to communicate with Bitcoin nodes, typically via JSON-RPC. The Bitcoin Core RPC API provides methods to query blockchain data, create and broadcast transactions, manage wallets, and monitor network status. Developers use these APIs to build wallets, block explorers, payment processors, and other Bitcoin applications. Third-party services also offer REST APIs that provide similar functionality without requiring users to run their own nodes.

## B

### Batching
Combining multiple payments into a single transaction to reduce fees by sharing the fixed overhead costs across many recipients. Instead of creating separate transactions (each with its own inputs and overhead), multiple outputs are included in one transaction, significantly reducing the total bytes and thus fees paid. Exchanges and payment processors commonly use batching to process withdrawals efficiently, sometimes saving 75% or more on transaction fees. The tradeoff is that recipients may need to wait until enough payments accumulate before the batch is broadcast.

### Base58
An encoding scheme used in legacy Bitcoin addresses that provides a human-readable format while minimizing transcription errors. It's similar to Base64 but excludes visually ambiguous characters (0, O, I, l) that could be confused when reading or typing addresses. Base58Check extends this with a 4-byte checksum appended to detect typos before funds are sent to an invalid address. While still used for legacy addresses, newer address formats use Bech32 encoding instead.

### Bech32
A checksummed base32 encoding format introduced with SegWit (BIP 173) that provides better error detection than Base58Check. Addresses start with `bc1` for mainnet or `tb1` for testnet, followed by a human-readable separator and the encoded data. Bech32 uses only lowercase letters and numbers, eliminating case-sensitivity issues and making addresses easier to read aloud or type on mobile devices. An updated version called Bech32m (BIP 350) is used for Taproot addresses to fix a minor issue with error detection.

### Block
A collection of transactions grouped together and permanently added to the blockchain approximately every 10 minutes. Each block contains a header with proof-of-work, a coinbase transaction that creates new Bitcoin, and typically thousands of user transactions. Blocks are limited in size (measured in weight units), creating competition for space that drives the fee market. Once a block is mined and accepted by the network, the transactions it contains are considered confirmed.

### Blockchain
A distributed, append-only ledger of all Bitcoin transactions maintained by thousands of independent nodes worldwide. Blocks are cryptographically linked in chronological order (each block header contains a hash of the previous block), making historical data tamper-evident and immutable. This chain structure means that altering any past transaction would require re-mining all subsequent blocks, which becomes computationally infeasible as more blocks are added. The blockchain serves as the single source of truth for Bitcoin ownership without requiring a central authority.

### Block Header
The 80-byte metadata at the start of each block that miners hash repeatedly during proof-of-work. It contains six fields: version number, previous block hash (linking to the chain), merkle root (summarizing all transactions), timestamp, difficulty target (the hash threshold to beat), and nonce (the value miners increment). Because the header is only 80 bytes, SPV clients can verify the chain's proof-of-work without downloading full blocks. The compact size also enables efficient verification of the longest chain.

### Block Height
The number of blocks in the chain before a given block, serving as a sequential identifier for blocks. The genesis block has height 0, and each subsequent block increments the height by one. Block height is used to reference specific points in Bitcoin's history, trigger protocol changes (like halvings at heights divisible by 210,000), and calculate confirmation depth. As of 2024, Bitcoin's block height exceeds 800,000.

### Block Reward
The amount of new Bitcoin created and awarded to miners for successfully mining a block, also called the block subsidy. Currently 3.125 BTC after the 2024 halving, this reward halves approximately every four years (210,000 blocks) until all 21 million Bitcoin are mined around 2140. The block reward, combined with transaction fees, provides the economic incentive for miners to secure the network. As the subsidy decreases over time, transaction fees are expected to become the primary source of miner revenue.

### Block Size
The size of a block measured in bytes or weight units, which is limited by consensus rules to prevent blockchain bloat. Bitcoin has a 1 MB base block size limit, but the SegWit upgrade introduced weight units that allow blocks to effectively reach ~4 MB when containing mostly SegWit transactions. This limit creates scarcity of block space, driving fee competition during high-demand periods. The block size debate was one of Bitcoin's most contentious controversies, ultimately leading to the creation of Bitcoin Cash in 2017.

### Block Time
The average time between consecutive blocks, which Bitcoin targets at 10 minutes through automatic difficulty adjustment. This target represents a tradeoff between confirmation speed and security; faster blocks would increase orphan rates and potentially centralize mining. The actual time between blocks varies due to the random nature of mining; individual blocks can take seconds or over an hour. The 10-minute average is maintained by adjusting difficulty every 2016 blocks based on actual block production rate.

### Block Template
A data structure containing selected transactions and partially-filled block header fields that miners use to construct candidate blocks. Mining pools generate block templates by selecting transactions from the mempool (typically prioritizing by fee rate), computing the merkle root, and providing all header fields except the nonce. Miners then repeatedly hash variations of this template, trying different nonces and extranonces, until finding a valid block. The getblocktemplate RPC allows miners to customize transaction selection rather than relying entirely on the pool.

### BOLT (Basis of Lightning Technology)
The technical specifications that define the Lightning Network protocol, similar to how RFCs define internet protocols. BOLT documents specify everything from the peer-to-peer message format to channel construction, payment routing, and invoice encoding. There are currently 11 main BOLT specifications (BOLT 1-11) covering different aspects of the protocol. Multiple independent implementations (LND, c-lightning, Eclair, LDK) follow these specs to ensure interoperability across the Lightning Network.

### BIP (Bitcoin Improvement Proposal)
A design document that proposes changes, additions, or informational content for the Bitcoin ecosystem, following a structured process for community review. BIPs are categorized as Standards Track (protocol changes), Informational, or Process documents. Notable examples include BIP 16 (P2SH), BIP 32 (HD wallets), BIP 39 (mnemonic seeds), BIP 141 (SegWit), and BIP 341 (Taproot). The BIP process provides a transparent, community-driven approach to Bitcoin development without requiring a central authority to approve changes.

## C

### CLTV (CheckLockTimeVerify)
An opcode (OP_CHECKLOCKTIMEVERIFY) that enforces absolute time locks by making a transaction invalid if spent before a specified block height or Unix timestamp. Introduced in BIP 65, CLTV enables time-locked contracts where funds cannot be moved until a future date regardless of who holds the keys. This is essential for Lightning Network HTLCs, which require time-locked refund paths, as well as inheritance planning and vesting schedules. CLTV checks the transaction's locktime field against the script's specified value and fails if the locktime hasn't been reached.

### Coinbase Transaction
The first transaction in every block, which has no inputs and creates new Bitcoin out of thin air as the block reward plus collected transaction fees. Miners construct the coinbase transaction to pay themselves, and it's the only transaction type that can create new coins. The coinbase includes an arbitrary data field (up to 100 bytes) where miners often include pool identifiers, political messages, or other data. Satoshi famously embedded a newspaper headline in the genesis block. Coinbase outputs cannot be spent until 100 blocks have passed, preventing issues if the block is orphaned.

### Coin Selection
The process of choosing which UTXOs to spend when creating a transaction, which significantly impacts fees, privacy, and future UTXO management. Various algorithms exist: largest-first minimizes input count but creates large change outputs; smallest-first consolidates dust but increases fees; branch-and-bound tries to find exact matches avoiding change entirely. Good coin selection balances immediate fee costs against long-term UTXO set health and privacy considerations. Wallet software typically handles this automatically, but advanced users may want manual control for privacy-sensitive transactions.

### CoinJoin
A privacy technique where multiple users combine their transactions into a single transaction, making it difficult for blockchain analysts to determine which inputs correspond to which outputs. Each participant signs only their own inputs, so no one can steal funds, and the coordinator (if any) never has custody. Implementations include Wasabi Wallet's WabiSabi protocol and JoinMarket's maker-taker model. CoinJoin breaks the common-input-ownership heuristic that chain analysis relies on, significantly improving transaction privacy when done correctly.

### Commitment Transaction
In Lightning Network, a pre-signed transaction that represents the current state of a payment channel and can be broadcast to close the channel unilaterally. Both channel parties hold their own version of the commitment transaction, which pays out the current balance distribution. These transactions are updated off-chain every time a payment flows through the channel, with old states being invalidated through revocation keys. The penalty mechanism ensures that broadcasting an outdated commitment transaction results in losing all channel funds to the counterparty.

### Confirmation
When a transaction is included in a block that is added to the blockchain, it receives its first confirmation; each subsequent block adds another confirmation. More confirmations increase certainty that the transaction is final because reversing it would require re-mining all those blocks. For small amounts, 1-3 confirmations are typically sufficient, while 6 confirmations (about 1 hour) is widely considered secure for large amounts. Zero-confirmation transactions are risky because they can be double-spent until mined, though they may be acceptable for small, in-person transactions.

### Consensus
Agreement among network participants about the current state of the blockchain, including which transactions are valid and which chain of blocks is authoritative. Bitcoin achieves consensus through proof-of-work and the longest chain rule: nodes accept the valid chain with the most accumulated work. This allows thousands of independent nodes to agree on a single transaction history without any central coordinator. Consensus is Bitcoin's core innovation, solving the double-spend problem in a decentralized way for the first time.

### Consensus Rules
The set of rules that all Bitcoin nodes must follow to validate transactions and blocks, forming the foundation of network agreement. These include rules about block structure, transaction format, signature validity, coin supply, and timing. Any transaction or block that violates consensus rules is rejected by honest nodes, regardless of how much hash power supports it. Changing consensus rules requires either a soft fork (tightening rules) or hard fork (loosening rules), both of which need broad network agreement to succeed.

### Censorship Resistance
The ability to make transactions that cannot be blocked, reversed, or seized by any central authority, government, or corporation. Bitcoin achieves this through decentralization: thousands of independent miners and nodes mean no single entity controls which transactions are included in blocks. Even if some miners refuse to include certain transactions, others will mine them for the fees. This property makes Bitcoin particularly valuable for people in authoritarian regimes, those facing financial censorship, or anyone needing to transact without permission.

### Change Output
A transaction output that sends excess funds back to the sender, created because Bitcoin's UTXO model requires spending entire outputs. When input value exceeds the payment amount plus fees, the difference must be explicitly sent somewhere, typically a new address controlled by the sender. For example, spending a 1 BTC UTXO to pay 0.3 BTC (plus 0.0001 BTC fee) requires a 0.6999 BTC change output. Wallets handle change automatically, but understanding it is important for privacy (change outputs can link transactions) and fee estimation.

### CPFP (Child Pays For Parent)
A fee bumping technique where a new transaction (the child) spends an unconfirmed output from a stuck transaction (the parent) with a high enough fee to make mining both transactions profitable. Miners evaluate transaction packages together, so a high-fee child incentivizes them to include the low-fee parent to collect both fees. This is useful when you're the recipient of a stuck transaction and can't use RBF because you didn't create the original. CPFP requires spending an output from the stuck transaction, which the receiver can do with their change or payment output.

### CSV (CheckSequenceVerify)
An opcode (OP_CHECKSEQUENCEVERIFY) that enforces relative time locks, preventing a UTXO from being spent until a specified number of blocks or time has passed since it was confirmed. Unlike CLTV's absolute locks, CSV's relative locks start counting from when the UTXO was created, making them ideal for protocols that need "wait N blocks after X happens" logic. Essential for Lightning Network, where CSV ensures that a party has time to respond to a fraudulent channel close. Introduced in BIP 112, CSV uses the transaction's sequence field to enforce the delay.

### Compact Block
A block relay protocol (BIP 152) that dramatically reduces bandwidth by sending only block headers and short transaction IDs instead of full transaction data. Since most transactions in a new block are already in a node's mempool, the node can reconstruct the full block locally using these short IDs. This optimization reduces block propagation time and bandwidth by roughly 90%, which improves network efficiency and reduces orphan rates. High-bandwidth mode pushes compact blocks immediately upon mining, while low-bandwidth mode uses a request-response pattern.

### Channel
A payment channel between two Lightning Network nodes that enables instant, low-cost payments without broadcasting each transaction to the blockchain. Channels are created by locking Bitcoin in a 2-of-2 multisig address on-chain, then updating balance distributions off-chain through signed commitment transactions. Payments can flow in either direction up to the channel's capacity, and channels can remain open indefinitely. When parties want to settle, they close the channel and the final balance is recorded on the Bitcoin blockchain.

### Channel Capacity
The total amount of Bitcoin locked in a Lightning payment channel, representing the maximum value that can flow through it at any moment. Capacity is set when the channel is opened and equals the sum of both parties' contributions (though single-funded channels are common). Importantly, capacity doesn't mean both parties can send that amount; each can only send up to their current balance in the channel. Large channels provide more routing flexibility but require more capital lockup; this liquidity tradeoff is a key consideration in Lightning Network economics.

### Channel Closing
The process of finalizing a Lightning payment channel by broadcasting the final state to the Bitcoin blockchain, which settles the channel balance and unlocks funds. Cooperative closes are preferred: both parties agree on the final balance and sign a closing transaction with minimal fees and no time locks. Force closes occur when one party is unresponsive or disputes arise: the initiator broadcasts their latest commitment transaction and must wait for a timelock before accessing funds. Breach closes happen when someone broadcasts an old state and loses all funds to the penalty mechanism.

### Channel Funding
The process of opening a Lightning payment channel by creating an on-chain transaction that locks Bitcoin in a 2-of-2 multisig address controlled by both channel parties. The funding transaction must be confirmed on the blockchain before the channel becomes usable, which typically takes 3-6 confirmations (30-60 minutes). Originally only one party funded channels, but dual-funded channels (where both contribute) are now supported, providing initial liquidity in both directions. The funding transaction output becomes the channel's capacity and anchor point on the blockchain.

### Channel State
The current balance distribution in a Lightning payment channel, representing how much each party would receive if the channel were closed immediately. State is updated off-chain through signed commitment transactions every time a payment flows through the channel. These updates are instant and free. Old states are invalidated through revocation keys, creating a penalty mechanism if anyone tries to broadcast an outdated state. The channel state is essentially a running tab that's only settled to the blockchain when the channel closes.

### Cooperative Close
The preferred method of closing a Lightning payment channel where both parties agree on the final balance and sign a single closing transaction. Unlike force closes, cooperative closes have no time delays, lower fees (no anchor outputs or penalty mechanisms needed), and settle immediately once confirmed on-chain. Both parties benefit from cooperative closes, so they're used in the vast majority of channel closures. A cooperative close is only impossible when one party is offline, unresponsive, or actively disputing the channel state.

## D

### Decentralization
The distribution of control, decision-making, and infrastructure across many independent participants rather than a single central authority. Bitcoin achieves this through open-source code that anyone can audit, distributed mining across thousands of operations worldwide, and permissionless node operation that lets anyone verify the blockchain. This architecture means no government, company, or individual can unilaterally change the rules, censor transactions, or shut down the network. Decentralization is often considered Bitcoin's most important property, as it underpins censorship resistance, trustlessness, and long-term resilience.

### Derivation Path
A sequence of indices that specifies how to derive a specific key from a master seed in an HD (hierarchical deterministic) wallet, enabling organized key management. The format `m/purpose'/coin'/account'/change/index` creates a tree structure where the apostrophe indicates hardened derivation (more secure but can't derive child public keys from parent public keys). Common paths include m/44'/0'/0' for legacy addresses, m/84'/0'/0' for native SegWit, and m/86'/0'/0' for Taproot. Understanding derivation paths is crucial for wallet recovery and interoperability between different wallet software.

### Descriptors
A standardized format (BIP 380-386) for describing how to derive addresses and spending conditions from keys, providing more complete wallet backup information than keys alone. Descriptors specify not just which keys to use but how to use them: the script type, derivation paths, and any multi-party arrangements. For example, `wpkh([fingerprint/84'/0'/0']xpub.../0/*)` describes a native SegWit wallet with a specific derivation. This enables wallet software to correctly reconstruct addresses and sign transactions without ambiguity, improving interoperability and backup reliability.

### DATUM
A decentralized mining protocol that allows individual miners to construct their own block templates rather than accepting whatever the pool provides. This gives miners control over which transactions to include, addressing concerns about pool-level transaction censorship and centralization of block construction. DATUM represents a shift toward "solo mining with pool payout variance smoothing," where miners maintain sovereignty over block content while still benefiting from pooled rewards. This protocol is part of a broader movement (including Stratum V2) toward more decentralized mining infrastructure.

### Difficulty
A measure of how computationally hard it is to find a valid block hash, automatically adjusted every 2016 blocks (roughly two weeks) to maintain approximately 10-minute block intervals. When blocks are found faster than target, difficulty increases; when slower, it decreases. This self-adjusting mechanism ensures consistent block times regardless of how much hash power joins or leaves the network. Difficulty has increased astronomically since Bitcoin's early days. Finding a block today requires roughly 10^23 times more computation than when the network launched.

### Difficulty Target
The maximum hash value that is considered valid for a block, expressed as a 256-bit number that miners must beat. Miners repeatedly hash block headers with different nonces until finding a hash numerically below this target. Lower targets are harder to hit and represent higher difficulty. The target is stored compactly in each block header as "nBits" and decoded into the full 256-bit threshold for validation. When you see a block hash starting with many zeros, those zeros represent the successful search for a value below the current target.

### Double Spend
An attempt to spend the same Bitcoin twice by creating two conflicting transactions that both reference the same UTXO. Bitcoin's blockchain consensus mechanism prevents this by establishing a single authoritative transaction history. Once one transaction is confirmed in a block, conflicting transactions become invalid. Before confirmation, double spends are possible (which is why merchants wait for confirmations), but after even one confirmation, reversing the transaction requires mining a longer alternative chain. This is why double-spend prevention is considered Bitcoin's fundamental innovation.

### Dust
A transaction output so small that the fee required to spend it would exceed or approach its value, making it economically irrational to use. The dust threshold depends on fee rates but is typically around 546 satoshis for standard outputs and 294 satoshis for SegWit outputs. Dust outputs bloat the UTXO set without providing useful value, so Bitcoin Core rejects transactions that create dust by default. Wallets should avoid creating dust through careful coin selection, and users accumulating many small outputs may need to consolidate during low-fee periods.

## E

### ECDSA (Elliptic Curve Digital Signature Algorithm)
The original cryptographic signature algorithm used in Bitcoin, based on the secp256k1 elliptic curve (chosen for its efficiency and lack of suspicious constants). ECDSA signatures prove ownership of private keys without revealing them, enabling secure authorization of transactions. Each signature is approximately 71-72 bytes and is mathematically tied to both the private key and the specific transaction data being signed. While still widely used, ECDSA is being supplemented by Schnorr signatures (introduced with Taproot), which offer better efficiency and enable signature aggregation.

### ECDH (Elliptic Curve Diffie-Hellman)
A key exchange protocol that allows two parties to establish a shared secret over an insecure channel using elliptic curve cryptography. In Lightning Network, ECDH is used in onion routing (Sphinx protocol) to derive shared secrets between each hop without revealing them to other nodes in the path. The sender uses each routing node's public key to create encrypted layers, and each node uses its private key to decrypt only its layer and learn the next hop. This enables private, trustless payment routing where no single node learns the full payment path.

## F

### Fee Bumping
Techniques to increase the effective fee of an unconfirmed transaction to speed up confirmation when the original fee is too low for current network conditions. The two main methods are RBF (Replace-by-Fee), which replaces the stuck transaction with a higher-fee version, and CPFP (Child Pays for Parent), which spends an output from the stuck transaction with enough fee to make mining both worthwhile. Fee bumping is essential for time-sensitive transactions during fee spikes and for Lightning channel management. Modern wallets increasingly support fee bumping by default, signaling RBF on all transactions.

### Fee Rate
The fee paid per virtual byte (vByte) of transaction size, expressed in satoshis per vByte (sat/vB), which determines a transaction's priority for inclusion in blocks. Miners typically sort transactions by fee rate and fill blocks from highest to lowest, so higher rates mean faster confirmation. Fee rates fluctuate based on network demand; they might be 1-5 sat/vB during quiet periods but spike to 100+ sat/vB during high activity. Fee estimation services and mempool visualizers help users choose appropriate rates for their urgency level.

### Force Close
Unilaterally closing a Lightning payment channel by broadcasting your latest commitment transaction to the Bitcoin blockchain without the counterparty's cooperation. Force closes are necessary when the other party is offline, unresponsive, or attempting fraud, but they're more expensive and slower than cooperative closes. The initiator must wait for a timelock (typically 1-2 weeks) before accessing their funds, giving the counterparty time to dispute with a penalty transaction if an old state was broadcast. Force closes should be a last resort due to higher fees and locked funds.

### Finality
The assurance that a confirmed transaction cannot be reversed or altered, which in Bitcoin is probabilistic rather than absolute. Each additional confirmation makes reversal exponentially more difficult and expensive. After 6 confirmations, reversing a transaction would require an attacker to re-mine those 6 blocks plus stay ahead of the honest network. While never mathematically impossible, deep confirmations provide practical finality that approaches certainty for any realistic attacker. This probabilistic model differs from traditional payment systems where finality is instant but dependent on trusted intermediaries.

### Fork
A divergence in the blockchain where two or more competing chains temporarily or permanently coexist, which can occur naturally or through protocol changes. Temporary forks happen when two miners find valid blocks simultaneously; the network resolves this by eventually building on one chain, orphaning the other. Hard forks create permanent splits when protocol changes make new blocks incompatible with old software (like Bitcoin Cash in 2017). Soft forks tighten rules in a backward-compatible way, where old nodes still accept new blocks but may not understand new features.

### Full Node
A Bitcoin node that independently validates every transaction and block against consensus rules, maintaining a complete copy of the blockchain without trusting any external source. Full nodes download and verify ~600GB+ of historical data during initial sync, then validate new blocks as they arrive. Running a full node provides the highest level of security and privacy, as you verify your own transactions rather than trusting third parties. Full nodes also contribute to network decentralization by rejecting invalid blocks and relaying valid transactions to peers.

## G

### Genesis Block
The first block in the Bitcoin blockchain (block height 0), created by Satoshi Nakamoto on January 3, 2009, with a timestamp reflecting that date. The coinbase transaction famously includes the text "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks," both proving the block wasn't pre-mined before that date and commenting on the financial system Bitcoin aimed to provide an alternative to. The genesis block is hardcoded into Bitcoin software as the starting point of the chain. Interestingly, its 50 BTC reward is unspendable due to a quirk in the original code.

### Gossip Protocol
The peer-to-peer mechanism by which Bitcoin nodes share information about new blocks, transactions, and network addresses with their connected peers. When a node receives valid new data, it announces it to peers who haven't seen it yet (avoiding re-broadcasting to the sender). This creates a flooding pattern where information propagates across the network in seconds without any central coordinator. The gossip protocol includes mechanisms to prevent spam and denial-of-service attacks, such as validating data before relay and limiting bandwidth per peer.

## H

### Halving
An event that occurs every 210,000 blocks (approximately every four years) where the block reward paid to miners is cut in half, reducing Bitcoin's inflation rate. This mechanism is central to Bitcoin's monetary policy, creating a predictable and diminishing supply schedule that asymptotically approaches the 21 million cap. Halvings have historically been significant market events as they directly reduce the rate of new Bitcoin entering circulation, affecting miner economics and supply-demand dynamics. The most recent halving in April 2024 reduced the block reward from 6.25 to 3.125 BTC.

### Hash
A cryptographic function that takes any input and produces a fixed-size output (digest) that appears random but is deterministic: the same input always produces the same output. Bitcoin uses SHA-256 for proof-of-work and transaction IDs, and RIPEMD-160 combined with SHA-256 for address generation. Hash functions are one-way (you can't reverse them to find the input), collision-resistant (finding two inputs with the same output is computationally infeasible), and avalanche-sensitive (small input changes completely change the output). These properties make hashes essential for blockchain integrity and mining.

### Hash Rate
The total computational power dedicated to Bitcoin mining, measured in hashes per second, representing the network's security level. The network currently operates at approximately 500-700 EH/s (exahashes per second, or 10^18 hashes per second), requiring massive amounts of specialized hardware and electricity. Higher hash rate means the network is more secure against 51% attacks, as an attacker would need proportionally more resources. Hash rate has grown exponentially over Bitcoin's history as mining technology advanced from CPUs to GPUs to ASICs.

### Hard Fork
A protocol change that loosens consensus rules, making previously invalid blocks or transactions valid, which is not backward-compatible. Nodes that don't upgrade will reject new blocks as invalid, potentially creating a permanent chain split where two incompatible networks exist. Bitcoin Cash (2017) and Bitcoin SV (2018) resulted from contentious hard forks over block size. Hard forks are controversial in Bitcoin because they risk splitting the network and are generally avoided in favor of soft forks, which maintain backward compatibility.

### HD Wallet (Hierarchical Deterministic Wallet)
A wallet architecture (BIP 32) that generates all keys from a single master seed, typically represented as a 12-24 word mnemonic phrase for backup. The hierarchical structure allows deriving billions of addresses in an organized tree, with branches for different accounts, purposes (receiving vs. change), and address types. HD wallets revolutionized Bitcoin usability by making backups simple (one seed phrase backs up all past and future addresses) while also improving privacy by making fresh address generation trivial. Most modern wallets use HD architecture with BIP 39 mnemonics and BIP 44/84/86 derivation paths.

### HTLC (Hash Time-Locked Contract)
A conditional payment contract that forms the foundation of Lightning Network and atomic swaps, combining a hash lock with a time lock. The payment can only be claimed by revealing a secret (preimage) that hashes to a known value, and it automatically refunds to the sender if not claimed before the timeout expires. In Lightning, HTLCs chain across multiple channels to enable multi-hop payments. Each node only releases payment upon receiving the preimage from the next hop. This creates trustless routing where either the entire payment succeeds or it fails and refunds atomically.

## I

### IBD (Initial Block Download)
The process of downloading and validating the entire blockchain history when first starting a Bitcoin full node, which can take hours to days depending on hardware and bandwidth. During IBD, the node downloads all ~600GB+ of block data, verifies every signature, checks all consensus rules, and builds the UTXO set from scratch. This process is intentionally thorough; it's how full nodes achieve trustless verification without relying on any external source. Modern optimizations like assumevalid and assumeutxo can speed up IBD by skipping some signature verification for deeply buried blocks while maintaining security guarantees.

### Input
A reference to a previous transaction output (UTXO) that is being consumed in a new transaction, essentially pointing to where the funds came from. Each input contains the previous transaction's ID, the output index being spent, and a script (or witness data) proving authorization to spend those funds. A transaction can have multiple inputs to combine UTXOs when the payment amount exceeds any single available output. The total value of all inputs minus the total value of all outputs equals the transaction fee paid to miners.

### Invoice
A payment request in Lightning Network encoded as a BOLT11 string that contains all information needed to make a payment. Invoices typically start with `lnbc` for mainnet (or `lntb` for testnet), followed by an amount, and include the payment hash, recipient's node public key, expiry time, routing hints, and a signature. They're usually displayed as QR codes for easy mobile scanning. BOLT12 "offers" are a newer standard that enables reusable payment requests and other advanced features not possible with one-time BOLT11 invoices.

## K

### Key Pair
A cryptographic pair consisting of a private key (a 256-bit secret number) and its corresponding public key (derived through elliptic curve multiplication). The private key signs transactions to prove ownership, while the public key allows anyone to verify those signatures without learning the private key. From the public key, Bitcoin addresses are generated through hashing, creating a one-way chain: private key → public key → address. Keeping private keys secret is paramount—anyone with access can spend the associated funds—while public keys and addresses can be freely shared.

## L

### Lightning Network
A second-layer payment protocol built on top of Bitcoin that enables instant, high-volume, low-cost transactions through a network of payment channels. Instead of recording every payment on the blockchain, Lightning users open channels by locking Bitcoin in 2-of-2 multisig addresses, then exchange signed transactions off-chain to update balances. Payments can route through multiple channels, enabling payments to anyone on the network without direct channel connections. Settlement to the Bitcoin blockchain only occurs when channels are opened or closed, dramatically reducing fees and enabling micropayments as small as 1 satoshi.

### Locktime
A transaction-level field (nLockTime) that prevents the transaction from being valid until a specified block height or Unix timestamp is reached. When set to a block height (values < 500,000,000) or timestamp (values >= 500,000,000), nodes will not relay or mine the transaction until that condition is met. Locktime enables use cases like post-dated checks, where a transaction is signed now but can't be spent until later. It's also foundational to Lightning Network, where pre-signed transactions with future locktimes serve as backup recovery mechanisms.

## M

### Mainnet
The production Bitcoin network where real Bitcoin with actual monetary value is transacted, as opposed to test networks used for development. Mainnet addresses start with "1" (legacy), "3" (P2SH), or "bc1" (SegWit/Taproot), distinguishing them from testnet addresses. All consensus rules are fully enforced on mainnet, and transactions are irreversible. When people refer to "Bitcoin" without qualification, they mean mainnet—the network that launched on January 3, 2009, and has operated continuously since.

### Mempool (Memory Pool)
The collection of valid, unconfirmed transactions that a node has received and is holding in memory, waiting to be included in a block. Each node maintains its own mempool, and they may differ slightly based on when transactions were received and node-specific policies. Miners select transactions from their mempool when constructing blocks, typically prioritizing by fee rate. Mempool size fluctuates with network demand—during busy periods it can grow to hundreds of thousands of transactions, while during quiet times it may nearly empty. Mempool visualization tools help users choose appropriate fee rates.

### Merkle Root
A single hash that cryptographically summarizes all transactions in a block, created by repeatedly hashing pairs of transaction hashes in a tree structure until one root remains. The merkle root is included in the 80-byte block header, allowing the entire block's transactions to be verified from this single value. This enables Simplified Payment Verification (SPV), where light clients can verify transaction inclusion using only the merkle root and a small proof path, without downloading the full block. Changing any transaction would change the merkle root, making tampering detectable.

### Merkle Tree
A binary tree structure where each leaf node is a hash of a transaction, and each parent node is the hash of its two children combined, ultimately producing a single root hash. This structure enables efficient proofs of inclusion—proving a transaction is in a block only requires log₂(n) hashes rather than all n transactions. Bitcoin uses Merkle trees for transaction summarization in block headers, and Taproot uses them for organizing spending conditions (MAST). The ability to prove membership with logarithmic-sized proofs is crucial for light clients and scalability.

### MAST (Merkle Abstract Syntax Tree)
A technique implemented in Taproot that represents multiple spending conditions as leaves in a Merkle tree, with only the executed path revealed when spending. This dramatically improves privacy because unused conditions remain hidden—a complex contract with many possible outcomes looks identical to a simple payment when only one path is used. MAST also reduces transaction size and fees by only requiring proof of the executed branch. Complex smart contracts like inheritance schemes, timelocked escrows, or multi-party arrangements benefit significantly from MAST's privacy and efficiency gains.

### MuSig
A multi-signature scheme using Schnorr signatures that allows multiple parties to create a single aggregated signature indistinguishable from a regular single-key signature. Unlike traditional multisig (which requires listing all public keys and signatures), MuSig combines keys and signatures off-chain, producing an output that looks like a normal Taproot key-path spend on the blockchain. This provides significant privacy improvements—observers can't tell a transaction was multi-party—and fee savings from the smaller signature size. MuSig2 is the production-ready version that requires only two communication rounds between signers.

### MPP (Multi-Part Payment)
A Lightning Network feature that allows splitting a large payment into multiple smaller parts that route independently through different paths, then recombine at the destination. This improves payment success rates by utilizing multiple channels' liquidity simultaneously and enables payments larger than any single channel's capacity. The receiver waits until all parts arrive before revealing the preimage, ensuring atomicity—either the entire payment completes or none of it does. MPP (also called AMP for atomic multi-path payments) significantly improved Lightning's reliability for larger transactions.

### Miniscript
A structured language for writing Bitcoin Scripts that is easier to analyze, compose, and reason about than raw Script. Miniscript maps to a subset of valid Bitcoin Script but provides guarantees about spending conditions, costs, and required signatures that would be difficult to determine from raw opcodes. Wallets can automatically analyze Miniscript policies to determine all possible spending paths, compute worst-case transaction sizes for fee estimation, and verify that scripts behave as intended. This makes complex multi-party contracts and time-locked conditions safer to implement and use.

### Mining Pool
A collective of miners who combine their computational power and share block rewards proportionally to each member's contributed work. Pools reduce payout variance—instead of rarely winning large rewards, miners receive frequent smaller payments based on submitted shares. The pool operator constructs blocks and distributes work to members, paying out when blocks are found. While pools provide economic benefits to small miners, their concentration has raised centralization concerns, as large pools could theoretically influence which transactions get mined.

### Multisig (Multi-Signature)
A Bitcoin script pattern requiring multiple cryptographic signatures to authorize spending, providing enhanced security and enabling shared custody arrangements. Common configurations include 2-of-3 (any two of three keyholders can spend), 3-of-5 (majority required), or 2-of-2 (both parties must agree, as used in Lightning channels). Multisig protects against single points of failure: losing one key doesn't lose funds, and compromising one key doesn't enable theft. Pre-Taproot multisig visibly reveals the m-of-n structure on-chain, while Taproot with MuSig can make multisig indistinguishable from single-sig.

## N

### Node
A computer running Bitcoin software that participates in the network by validating transactions and blocks, relaying data to peers, and maintaining its own view of the blockchain. Full nodes verify everything independently against consensus rules, while lightweight (SPV) nodes trust others for some validation. Running a node provides trustless verification of your own transactions and contributes to network decentralization. Nodes communicate using a peer-to-peer protocol, typically maintaining 8-10 outbound connections and accepting inbound connections from other nodes.

### Node (Lightning)
A computer running Lightning Network software (such as LND, Core Lightning, Eclair, or LDK) that participates in the payment network by opening channels, routing payments, and managing liquidity. Lightning nodes maintain connections to the Bitcoin network to monitor channel funding transactions and handle on-chain settlements. Each node has a unique public key identity and advertises its channels and fee policies to the network. Well-connected nodes with good liquidity and uptime earn routing fees by forwarding payments between other participants in the network.

### Nonce
A 32-bit number in the block header that miners increment while searching for a valid proof-of-work hash. When combined with other header fields and hashed, different nonce values produce different hashes. Miners try billions of nonces looking for one that produces a hash below the difficulty target. Since the nonce provides only 4 billion possibilities (2^32), modern miners also vary the extranonce in the coinbase transaction to expand the search space. Finding the right nonce is essentially a lottery where more hash power buys more tickets per second.

## O

### OP_RETURN
An opcode that marks a transaction output as provably unspendable, allowing data to be embedded in transactions without bloating the UTXO set. Since OP_RETURN outputs can never be spent, nodes can safely discard them rather than tracking them forever. This provides a "legitimate" way to store small amounts of data (up to 80 bytes per output) on the blockchain for timestamping, asset protocols, or other applications. While controversial due to non-financial blockchain use, OP_RETURN is preferred over alternative methods that create spendable dust outputs that must be tracked indefinitely.

### OPCODE
A single operation in Bitcoin's stack-based scripting language, used to define spending conditions for transaction outputs. Each opcode performs a specific function: OP_DUP duplicates the top stack item, OP_HASH160 hashes it, OP_CHECKSIG verifies a signature, OP_IF enables conditional execution, and so on. Standard transactions use well-known opcode patterns (like P2PKH or P2WPKH), while more complex contracts combine opcodes to create multisig, time locks, or hash locks. Bitcoin Script is intentionally limited (not Turing-complete) to ensure all scripts terminate and can be analyzed for validity.

### Onion Routing
A privacy technique used in Lightning Network (via the Sphinx protocol) where payment information is encrypted in multiple layers, like an onion, with each routing node only able to decrypt its layer. Each node learns only the previous hop (where the payment came from) and the next hop (where to forward it), never the full payment path or final amount. The sender constructs all encryption layers using each routing node's public key, so intermediate nodes can't determine their position in the path or who the original sender is. This provides strong privacy for payment routing.

### Orphan Block
A valid block that was mined but is not part of the main chain because another block at the same height was adopted by the network instead. Orphans occur naturally when two miners find blocks nearly simultaneously; the network temporarily has two competing chain tips until one gets extended and becomes the longest chain. The "losing" block becomes orphaned, and its transactions return to the mempool to be included in future blocks. Orphan rates increase with larger blocks or slower propagation, which is why block size limits and efficient relay protocols matter.

### Output
A component of a Bitcoin transaction that specifies an amount of Bitcoin and the conditions (locking script or scriptPubKey) required to spend it. Each output represents a new UTXO that can later be used as an input in a future transaction. The locking script typically specifies a public key hash (address) that must provide a valid signature to spend, though more complex conditions are possible. A transaction can have multiple outputs—commonly one for the payment recipient and another returning change to the sender.

## P

### Payjoin
A privacy technique where both the sender and receiver contribute inputs to a transaction, breaking the common-input-ownership heuristic that blockchain analysis relies on. Normally, analysts assume all inputs to a transaction belong to the same entity. Payjoin defeats this by mixing ownership. The transaction looks like a normal payment on-chain, but the true amounts are obscured because inputs from both parties are combined. Also known as P2EP (Pay-to-Endpoint), Payjoin requires coordination between sender and receiver but provides significant privacy benefits without the coordination overhead of CoinJoin.

### Peer
Another Bitcoin node that your node maintains a direct TCP connection with for exchanging blocks, transactions, and network information. Nodes typically maintain 8-10 outbound connections (ones they initiated) and accept inbound connections (up to 125 total by default) from other nodes. Peer selection uses various heuristics to achieve diversity, connecting to nodes in different IP ranges, different parts of the world, and different ASNs to reduce the risk of eclipse attacks. The peer-to-peer nature of these connections means no central server controls the network.

### P2PKH (Pay-to-Pubkey-Hash)
The original and most common legacy Bitcoin script pattern, where funds are locked to the hash of a public key. Addresses start with "1" and spending requires providing the full public key and a valid signature. The hash provides an extra layer of protection: until funds are spent, only the hash is public, so even a (theoretical) public key crack couldn't steal unspent coins. P2PKH was the dominant address type for Bitcoin's first years but is being superseded by more efficient SegWit formats.

### P2SH (Pay-to-Script-Hash)
A script pattern (BIP 16) that locks funds to the hash of an arbitrary script, with the actual script only revealed when spending. Addresses start with "3" and can encapsulate any valid script—most commonly multisig arrangements or wrapped SegWit. The sender only needs to know the script hash (address); the complexity of the actual spending conditions is hidden until redemption. P2SH shifted the storage burden for complex scripts from the sender to the recipient and enabled more sophisticated Bitcoin contracts.

### P2TR (Pay-to-Taproot)
The modern Bitcoin address type introduced with the Taproot upgrade (BIP 341), providing the best combination of privacy, efficiency, and flexibility. Addresses start with "bc1p" and can be spent either with a simple key signature (key path) or by revealing one of potentially many script conditions (script path via MAST). Crucially, key path spends look identical regardless of whether the underlying setup was single-sig or complex multisig, dramatically improving privacy. P2TR also benefits from Schnorr signature efficiencies and should be the default choice for new applications.

### P2WPKH (Pay-to-Witness-Pubkey-Hash)
A native SegWit address type (BIP 141/173) that provides the same security as P2PKH but with lower fees by moving signature data to the witness section. Addresses start with "bc1q" followed by 42 characters and use Bech32 encoding for better error detection. P2WPKH transactions are approximately 38% cheaper than equivalent P2PKH transactions because witness data is discounted in the weight calculation. This is currently the most common address type in use, offering a good balance of compatibility, efficiency, and wallet support.

### P2WSH (Pay-to-Witness-Script-Hash)
A native SegWit address type for complex scripts (like multisig), providing the same capabilities as P2SH but with SegWit's fee discount on witness data. Addresses start with "bc1q" but are longer than P2WPKH (62 characters) due to the larger script hash. Like P2SH, the actual script is only revealed when spending, but the witness discount makes complex redemptions significantly cheaper. P2WSH is commonly used for multisig wallets and Lightning channel funding transactions, though P2TR is increasingly preferred for new deployments.

### Payment Channel
A mechanism that enables multiple Bitcoin transactions between two parties without broadcasting each one to the blockchain, using a 2-of-2 multisig address as the foundation. Funds are locked in the multisig through an on-chain funding transaction, then balance updates happen off-chain through exchanging signed transactions. Only the final state needs to be published to the blockchain, dramatically reducing fees and enabling instant transfers. Payment channels are the building block of the Lightning Network, which connects many channels into a routable payment network.

### Payment Hash
A cryptographic hash of the payment preimage, used in Lightning Network HTLCs to cryptographically link payment attempts across the network. The receiver generates a random preimage and provides its hash to the sender; the payment can only be claimed by revealing the preimage that produces this hash. As the preimage propagates backward through the payment path, each hop can verify they received the correct secret by hashing it themselves. This creates an atomic payment mechanism where either the entire path succeeds (preimage revealed) or fails (preimage never revealed).

### Payment Preimage
A random 32-byte secret generated by the payment recipient that, when hashed, produces the payment hash included in Lightning invoices. The preimage is the "key" that unlocks payment—the receiver reveals it to claim funds, and this revelation cascades back through all routing nodes to settle the HTLCs. Knowledge of the preimage serves as proof of payment, since only the original recipient could have revealed it. This mechanism enables trustless multi-hop payments where no routing node can steal funds or deny payment.

### Preimage
The original input data that produces a specific hash output through a cryptographic hash function. In general cryptography, finding a preimage from a hash should be computationally infeasible (preimage resistance). In Lightning Network specifically, the payment preimage is the secret whose hash is the payment hash—revealing it proves payment receipt. The preimage/hash relationship is fundamental to HTLCs, enabling conditional payments where funds are released only when the secret is revealed.

### Propagation
The process by which new blocks and transactions spread across the Bitcoin network from node to node through the gossip protocol. Fast propagation is critical for network security; slow block propagation increases orphan rates and gives advantages to miners with better connectivity. Bitcoin Core includes optimizations like compact blocks (sending only transaction IDs for blocks) and transaction relay improvements to minimize propagation delay. A new block typically reaches most of the network within seconds, while transactions propagate even faster.

### Private Key
A 256-bit secret number that cryptographically proves ownership of associated Bitcoin addresses, enabling the creation of valid signatures to spend funds. Private keys must be generated with sufficient randomness and kept absolutely secure. Anyone who obtains a private key can irreversibly steal all funds it controls. Modern wallets generate private keys from seed phrases using deterministic derivation, so users typically only need to secure the seed phrase. Private keys should never be shared, stored unencrypted on connected devices, or entered into websites.

### Proof-of-Work (PoW)
The consensus mechanism securing Bitcoin, requiring miners to expend computational resources to find a block hash below a target difficulty threshold. This work is easy to verify but expensive to produce, creating a cost to create blocks that prevents spam and makes chain reorganization economically infeasible. PoW also provides a fair mechanism for distributing new coins and achieves consensus without requiring identity or permission. The energy expenditure, often criticized, is the fundamental source of Bitcoin's security. Attacking the network requires matching or exceeding this ongoing investment.

### PSBT (Partially Signed Bitcoin Transaction)
A standardized format (BIP 174) for creating, transferring, and signing Bitcoin transactions that require multiple steps or multiple signers. PSBTs contain all necessary information (UTXOs, derivation paths, scripts) for signers to validate and sign, then can be combined into a final transaction. This enables workflows like hardware wallet signing (computer creates PSBT, hardware wallet signs it), multisig coordination (multiple parties each add their signatures), and air-gapped signing (moving unsigned transactions via QR codes or USB). PSBTs are essential for secure, multi-party Bitcoin operations.

### Public Key
A cryptographic key derived from a private key through one-way elliptic curve multiplication (on the secp256k1 curve), used to verify signatures and generate addresses. Public keys can be safely shared—the mathematical relationship to the private key cannot be reversed. Bitcoin uses two forms: uncompressed (65 bytes, starting with 04) and compressed (33 bytes, starting with 02 or 03), with compressed now standard for efficiency. In Taproot, public keys are further tweaked with 32-byte x-only representation, saving additional space.

## R

### RBF (Replace-by-Fee)
A feature (BIP 125) that allows replacing an unconfirmed transaction with a new version paying higher fees, useful when the original fee was too low for timely confirmation. For RBF to work, the original transaction must signal replaceability (by setting a sequence number below 0xfffffffe), and the replacement must pay strictly higher fees. Full RBF (allowing replacement of any unconfirmed transaction regardless of signaling) is gaining support and is available in Bitcoin Core 24.0+. RBF is safer and more flexible than CPFP for fee bumping when you created the original transaction.

### Regtest
A local regression testing network mode where you can mine blocks instantly with minimal difficulty, creating a private blockchain for development and testing. Unlike testnet or signet, regtest runs entirely on your local machine with no connection to other nodes, giving complete control over block production and timing. This makes it ideal for automated testing, debugging, and developing applications that need predictable block times. Regtest coins have no value and the chain can be reset at any time.

### Relative Time Lock
A time lock that prevents a UTXO from being spent until a certain number of blocks or time units have passed since the UTXO itself was confirmed, implemented using OP_CHECKSEQUENCEVERIFY (CSV) and the sequence field. Unlike absolute time locks (CLTV), relative locks count from when the spending UTXO was created, enabling "wait N blocks after X happens" logic. This is essential for Lightning Network, where CSV ensures parties have time to respond to channel disputes. Relative time locks enable complex protocols that depend on ordering of events rather than calendar dates.

### Relay
The act of receiving valid blocks or transactions from peers and forwarding them to other connected nodes, which is how information propagates across the decentralized Bitcoin network. Nodes validate data before relaying to prevent spam and invalid data from spreading. Relay policies can differ between nodes—some may reject transactions below certain fee rates or with specific characteristics—but blocks that meet consensus rules are always relayed. Efficient relay is critical for network health, and improvements like compact blocks and Erlay reduce bandwidth requirements.

### RIPEMD-160
A cryptographic hash function that produces a 160-bit (20-byte) output, used in Bitcoin address generation to create shorter addresses while maintaining security. The standard address derivation applies SHA-256 to the public key first, then RIPEMD-160 to that result, producing the 20-byte "pubkey hash" that forms the core of an address. This HASH160 operation (SHA256 + RIPEMD160) provides 160-bit security while keeping addresses reasonably short. RIPEMD-160 was chosen for its output size; the double-hash construction provides defense in depth against potential weaknesses in either algorithm.

### RPC (Remote Procedure Call)
The JSON-RPC protocol interface that Bitcoin Core exposes for programmatic interaction, allowing applications to query blockchain data, manage wallets, and create transactions. Common RPC commands include getblockchaininfo, getblock, getrawtransaction, sendrawtransaction, and wallet management functions. The RPC interface is how block explorers, payment processors, and other applications integrate with Bitcoin nodes. Access is controlled by authentication credentials in bitcoin.conf, and the interface listens only on localhost by default for security.

### Routing
The process of finding a path through the Lightning Network's channel graph from the payment sender to the recipient. Senders query the network gossip data to build a local graph of channels, then use pathfinding algorithms to find routes with sufficient liquidity and acceptable fees. Routes must have enough capacity at each hop, and the sender typically tries multiple paths if the first fails. Good routing considers fees, channel reliability, and privacy (avoiding routes through potentially malicious nodes). Routing remains one of Lightning's active research areas.

### Routing Fee
The fee charged by Lightning nodes for forwarding payments through their channels, compensating them for providing liquidity and taking on channel management costs. Fees consist of two components: a base fee (fixed amount per forwarded payment, often 0-1000 millisatoshis) and a proportional fee (percentage of the payment amount, often 0.0001% to 0.1%). Routing nodes set their own fee policies, and senders choose routes partly based on total fees. Well-connected nodes with good liquidity can earn meaningful income from routing fees, incentivizing network connectivity.

## S

### Satoshi
The smallest unit of Bitcoin, representing 0.00000001 BTC (one hundred millionth of a Bitcoin). Named after Bitcoin's pseudonymous creator, Satoshi Nakamoto, this denomination enables Bitcoin to be used for micropayments despite any future price appreciation. Lightning Network even uses millisatoshis (1/1000 of a satoshi) for routing fee calculations, though on-chain transactions are limited to whole satoshi precision. As Bitcoin's value has increased, satoshis (often abbreviated "sats") have become the more practical unit for everyday discussion of prices and payments.

### Seed Phrase
A human-readable backup of a wallet's master secret, typically consisting of 12-24 words from a standardized BIP39 wordlist of 2048 words. This mnemonic phrase encodes the entropy used to derive all wallet keys through hierarchical deterministic (HD) derivation, allowing complete wallet recovery from just these words. Seed phrases should be stored securely offline (metal backups are popular) and never entered into computers except during recovery. Compromising a seed phrase means losing all funds across all addresses and chains derived from it, as it's effectively the master key to everything.

### Share
A proof-of-work submission from a miner to a mining pool that meets the pool's difficulty target (lower than the actual network difficulty). Shares prove the miner is doing work without requiring them to find actual blocks, enabling fair reward distribution. A pool might require shares at 1/1000th of network difficulty, so miners submit approximately 1000 shares for every block the pool finds. Share counting allows pools to distribute block rewards proportionally to contributed hash power, dramatically reducing individual miner variance.

### Script
Bitcoin's stack-based programming language used to define spending conditions for transaction outputs and provide proofs to satisfy them. Script is intentionally limited (not Turing complete) to ensure all programs terminate and can be analyzed for validity and resource consumption. Scripts execute by pushing data and running opcodes that manipulate a stack; a successful spend results in a non-empty stack with a true value on top. While most transactions use standard script templates (P2PKH, P2WPKH, P2TR), Script enables sophisticated smart contracts including multisig, time locks, and hash locks.

### ScriptPubKey
The locking script embedded in a transaction output that defines what conditions must be met to spend those funds. Named because it typically involves a public key or its hash, the scriptPubKey is essentially a puzzle that the spender must solve. Common patterns include requiring a signature matching a specific public key hash (P2PKH), satisfying a hashed script (P2SH), or meeting SegWit witness requirements (P2WPKH, P2WSH, P2TR). The scriptPubKey is created by the sender when making a payment and determines the address format used.

### ScriptSig
The unlocking script in a transaction input that provides the data needed to satisfy the referenced output's scriptPubKey conditions. For P2PKH outputs, the scriptSig contains the signature and public key; for P2SH, it contains the serialized redeem script and any necessary signatures. The scriptSig is concatenated with the scriptPubKey during validation, and the combined script must execute successfully to validate the spend. With SegWit, much of this data moved to the separate witness field, but legacy transactions still use scriptSig.

### SegWit (Segregated Witness)
A major protocol upgrade activated in August 2017 (BIP 141) that moves signature data ("witness") outside the base transaction structure, fixing several important issues. SegWit resolved transaction malleability (which had blocked Lightning Network development), increased effective block capacity through a new weight-based limit, and enabled future upgrades like Taproot. By segregating witness data and applying a discount factor, SegWit transactions pay lower fees—typically 30-40% less than equivalent legacy transactions. SegWit also created a cleaner upgrade path through witness versioning.

### SHA-256
A cryptographic hash function from the SHA-2 family that produces a 256-bit (32-byte) output, used extensively in Bitcoin for proof-of-work, transaction IDs, and block hashing. SHA-256 provides strong security properties: it's computationally infeasible to find an input that produces a specific hash (preimage resistance), to find two different inputs with the same hash (collision resistance), and small input changes completely change the output (avalanche effect). Bitcoin's proof-of-work specifically uses double SHA-256, hashing the block header twice.

### SHA256D
Double SHA-256 hashing used throughout Bitcoin, where data is hashed twice in succession: `SHA256(SHA256(data))`. Block headers, transaction IDs, and merkle tree nodes all use SHA256D. This construction provides defense in depth—even if vulnerabilities were discovered in single SHA-256, attacking double-hashed values would remain difficult. When miners perform proof-of-work, they're computing SHA256D of 80-byte block headers billions of times per second, searching for results below the difficulty target.

### Schnorr Signature
A digital signature scheme (BIP 340) introduced with Taproot that offers several advantages over the previously-used ECDSA. Schnorr signatures are mathematically simpler, provably secure under standard assumptions, and enable powerful features like signature aggregation (combining multiple signatures into one) and batch verification (verifying many signatures faster than individually). With Schnorr, a transaction from a multisig wallet can look identical to a single-sig transaction on-chain, significantly improving privacy. Schnorr also reduces signature size and enables MuSig protocols for collaborative signing.

### Selfish Mining
An attack strategy where a miner with significant hash power secretly mines blocks without broadcasting them, then strategically releases them to orphan honest miners' blocks. By withholding blocks and timing releases, an attacker can potentially earn more than their proportional share of hash power would suggest. Research shows selfish mining becomes profitable above roughly 25-33% of hash power (depending on network connectivity). While concerning theoretically, no sustained selfish mining attacks have been documented on Bitcoin, partly due to the capital costs and detection risks.

### Silent Payments
A privacy protocol (BIP 352) enabling recipients to publish a static identifier from which senders can derive unique, unlinkable addresses for each payment. This solves the address reuse problem without requiring interaction—the recipient doesn't need to generate and share new addresses for each payment. Senders use ECDH with their transaction inputs and the recipient's public key to derive a unique one-time address. Recipients scan the blockchain using their private key to detect payments. Silent Payments provide stealth address-like privacy while being simpler and more compatible with the existing ecosystem.

### Signet
A test network (BIP 325) that adds a signature requirement to block validity, enabling more controlled and realistic testing than regtest while avoiding testnet's issues with griefing and worthless coins. Signet blocks must be signed by specific keys, so only authorized parties can mine blocks, preventing the spam and instability that plagued testnet. The default signet is maintained by Bitcoin developers and operates similarly to mainnet in terms of transaction competition and fee markets. Custom signets can be created for private testing networks.

### Soft Fork
A backward-compatible protocol change that tightens consensus rules, making some previously valid transactions or blocks now invalid. Non-upgraded nodes continue accepting new blocks but may not understand new features (they see transactions as "anyone can spend" but observe miners not spending them). Examples include SegWit (BIP 141) and Taproot (BIP 341). Soft forks can be activated through various methods including flag-day activation, miner signaling, or speedy trial. Because soft forks don't force the network to split, they're Bitcoin's preferred upgrade mechanism.

### Sphinx Protocol
The onion routing protocol used in Lightning Network to provide payment privacy, where route information is encrypted in layers like an onion. The sender constructs the entire encrypted packet, with each routing node only able to decrypt their layer to learn the next hop. Sphinx ensures that no intermediate node learns the payment origin, destination, or their position in the route. The protocol also provides a return path for error messages without revealing route information. Sphinx is specified in BOLT 4 and is fundamental to Lightning's privacy guarantees.

### SPV (Simplified Payment Verification)
A method described in the Bitcoin whitepaper for lightweight clients to verify transactions without downloading the full blockchain, relying on merkle proofs and block headers. SPV clients download only block headers (~80 bytes each vs. megabytes of full blocks), then request merkle proofs for transactions affecting their addresses. By verifying the proof against the merkle root in the header and checking that header is part of the longest chain, SPV clients can confirm transaction inclusion with reasonable security. The tradeoff is trusting that miners are not mining invalid blocks.

### Stratum
The de facto standard protocol for communication between Bitcoin miners and mining pools, enabling work distribution and share submission. Stratum v1 has pools send work (block header template and target) to miners, who submit shares (valid proofs of work). Stratum V2 is a next-generation protocol that adds encryption, enables miners to select their own transactions (improving decentralization), and reduces bandwidth usage. Most mining operations use Stratum to connect to pools, with the pool handling block construction and broadcasting.

### Sybil Attack
An attack where a malicious actor creates many fake identities (nodes) to gain disproportionate influence over the network, potentially to eclipse victims from honest nodes or manipulate peer discovery. Bitcoin mitigates Sybil attacks through several mechanisms: proof-of-work means mining power can't be faked, nodes limit connections per IP range, and the economic cost of running many nodes provides some resistance. However, well-resourced attackers can still attempt Sybil attacks, which is why users running their own full nodes and having diverse peer connections matters for security.

## T

### Taproot
A major Bitcoin protocol upgrade activated in November 2021 (BIPs 340, 341, 342) that significantly improves privacy, efficiency, and smart contract capabilities. Taproot combines Schnorr signatures, MAST (Merkle Abstract Syntax Trees), and a new script version to make complex transactions indistinguishable from simple payments when using the key path. This means multisig wallets, Lightning channels, and sophisticated contracts all look like normal single-signature transactions on-chain, dramatically improving privacy for everyone. Taproot also enables more efficient complex scripts and paves the way for future innovations like cross-input signature aggregation.

### Testnet
A public Bitcoin network using worthless test coins, designed for development and testing without risking real money. Testnet uses different address prefixes (starting with "m", "n", "2", or "tb1") and different genesis block, ensuring testnet and mainnet transactions can never be confused. Testnet has had issues with griefing (malicious difficulty spikes) and coins sometimes acquiring value despite being meant to be free. For more controlled testing, many developers prefer signet (more stable) or regtest (fully local). Testnet4 was introduced in 2024 to address some of testnet3's accumulated issues.

### Time Lock
A mechanism built into Bitcoin transactions that prevents funds from being spent until specified conditions are met, enabling time-based smart contracts. Absolute time locks (CLTV) prevent spending until a specific block height or Unix timestamp. Relative time locks (CSV) prevent spending until a certain time has passed since the UTXO was created. Time locks are fundamental to Lightning Network (for HTLC refunds), inheritance planning, vesting schedules, and various escrow arrangements. Both transaction-level (nLockTime, nSequence) and script-level (OP_CLTV, OP_CSV) time locks exist.

### TLV (Type-Length-Value)
A flexible encoding format used extensively in Lightning Network protocol messages (BOLT specifications) that allows for extensible and forward-compatible data structures. Each TLV record contains a type identifier (what kind of data), a length (how many bytes), and the value itself. Nodes can safely ignore TLV types they don't understand while processing ones they do, enabling smooth protocol upgrades where new features can be added without breaking older implementations. TLV encoding is used for onion payloads, channel announcements, and various other Lightning message types.

### Transaction
The fundamental unit of value transfer in Bitcoin, consisting of inputs (references to previously unspent outputs being consumed), outputs (new UTXOs being created with specified amounts and spending conditions), and metadata. Every Bitcoin transaction must consume at least one existing UTXO and create at least one new one. The sum of input values must equal or exceed the sum of output values, with any difference becoming the miner fee. Transactions are validated by nodes, broadcast through the network, and eventually included in blocks by miners.

### Transaction Fee
The amount paid to miners as incentive for including a transaction in a block, calculated as the difference between total input value and total output value. Fees are paid in satoshis and typically expressed as a fee rate (satoshis per virtual byte) to account for transaction size. During periods of high demand, users compete by offering higher fee rates to get faster confirmation. Transaction fees represent an increasingly important component of miner revenue as block subsidies halve every four years, and they're essential to Bitcoin's long-term security model.

### Transaction ID (TXID)
A unique 256-bit identifier for a transaction, calculated as the SHA256D hash of the serialized transaction data. TXIDs are used to reference transactions in inputs (specifying which output to spend), in block merkle trees, and throughout the ecosystem for tracking and identification. Before SegWit, TXIDs could be changed by third parties through malleability attacks by altering signatures without invalidating them. SegWit introduced the WTXID (witness transaction ID) that includes witness data, while the TXID excludes it, fixing malleability for SegWit transactions.

### Transaction Malleability
A historical vulnerability where transaction signatures could be modified by third parties without invalidating them, causing the transaction ID to change even though the transaction itself remained valid. This was problematic for protocols that needed to reference unconfirmed transactions by TXID, like Lightning Network channels that reference funding transactions before they confirm. SegWit (BIP 141) fixed malleability by moving signature data to a separate witness structure not included in the TXID calculation. This fix was a prerequisite for Lightning Network's development and security.

## U

### UTXO (Unspent Transaction Output)
A transaction output that hasn't been spent yet, representing the actual "coins" in Bitcoin's accounting model. Unlike account-based systems (like bank accounts), Bitcoin tracks ownership through discrete UTXOs—each is either entirely unspent or entirely consumed when used as an input. When you "have 1 BTC", you actually possess one or more UTXOs that sum to that amount. Spending requires consuming entire UTXOs and creating new ones, including change outputs when the input exceeds the payment. Understanding the UTXO model is fundamental to grasping Bitcoin's transaction structure and privacy characteristics.

### UTXO Set
The complete database of all unspent transaction outputs at a given point in time, representing the current state of Bitcoin ownership. Full nodes maintain the UTXO set in memory or fast storage for quick transaction validation—checking that referenced inputs exist and aren't already spent. The UTXO set currently contains around 70-100 million entries requiring several gigabytes to store. Keeping the UTXO set manageable is important for node performance, which is why creating dust outputs and unnecessary UTXOs is discouraged. AssumeUTXO allows new nodes to bootstrap quickly with a trusted UTXO set snapshot.

## V

### vByte (Virtual Byte)
A unit of transaction size measurement introduced with SegWit, calculated as weight units divided by 4, used for fee calculation and block space accounting. Virtual bytes provide backward compatibility with legacy fee estimation while incorporating SegWit's discount for witness data. A legacy transaction has equal vBytes and actual bytes, while SegWit transactions have fewer vBytes than actual bytes due to the witness discount. Fee rates are typically expressed in satoshis per vByte (sat/vB), and the block limit of 4 million weight units translates to 1 million vBytes maximum per block.

## W

### Wallet
Software (or hardware) that manages Bitcoin private keys, tracks balances, and creates transactions on behalf of the user. Wallets can be full node (run their own node for verification), SPV (trust others for block validation), or custodial (third party holds keys). Hardware wallets store keys on secure devices that never expose private keys to potentially compromised computers. Modern wallets typically use HD (hierarchical deterministic) architecture, deriving all keys from a single seed phrase for easy backup. Wallet selection involves tradeoffs between security, convenience, privacy, and self-custody.

### Watchtower
A service that monitors the Bitcoin blockchain on behalf of Lightning Network users, watching for attempts to close channels with outdated (fraudulent) states. When a channel counterparty broadcasts a revoked commitment transaction while you're offline, the watchtower detects it and broadcasts a penalty transaction to claim all channel funds on your behalf. Watchtowers solve the "always online" problem in Lightning, allowing users to go offline safely knowing their channels are monitored. Some watchtowers operate as paid services, while users can also run their own or use free community services.

### Weight Units
The measurement system introduced by SegWit for calculating transaction size and block capacity, where base transaction data counts as 4 weight units per byte and witness data counts as 1 weight unit per byte. This 4:1 discount for witness data incentivizes SegWit adoption and reduces the fee cost of signatures. The block limit is 4 million weight units, which translates to approximately 1 MB of base data plus additional witness data, enabling effective block sizes of around 2-4 MB for blocks full of SegWit transactions. Weight units divided by 4 gives virtual bytes (vBytes), used for fee calculation.

### Witness
The segregated data structure in SegWit transactions containing signatures, public keys, and other unlocking data that proves authorization to spend inputs. By moving witness data outside the base transaction (and thus outside the TXID calculation), SegWit fixed transaction malleability and enabled the witness discount for fee calculation. The witness is committed to through a separate witness root in the coinbase transaction rather than affecting the main merkle tree. For Taproot (witness version 1), the witness structure includes Schnorr signatures and, for script path spends, the revealed script and merkle proof.

## Z

### ZMQ (ZeroMQ)
A high-performance messaging library integrated into Bitcoin Core that provides real-time publish-subscribe notifications for new blocks, transactions, and other events. Applications can subscribe to ZMQ topics (like "rawtx" for new transactions or "hashblock" for new blocks) and receive instant notifications without polling the RPC interface. This is essential for building responsive applications that need to react immediately to blockchain events. Block explorers, payment processors, and Lightning nodes commonly use ZMQ for event-driven architectures. ZMQ must be explicitly enabled in Bitcoin Core configuration and typically binds to a TCP port for local connections.
