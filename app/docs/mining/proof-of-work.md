# Proof-of-Work Mechanism

## Overview

Bitcoin uses a **[proof-of-work](/docs/glossary#proof-of-work-pow)** [consensus](/docs/glossary#consensus) mechanism where [miners](/docs/glossary#mining) compete to solve a cryptographic puzzle. This process secures the network and validates [transactions](/docs/glossary#transaction).

## How It Works

1. **Block Construction**: [Miners](/docs/glossary#mining) collect [transactions](/docs/glossary#transaction) from the [mempool](/docs/glossary#mempool-memory-pool) and create a candidate [block](/docs/glossary#block)
2. **Nonce Search**: [Miners](/docs/glossary#mining) repeatedly [hash](/docs/glossary#hash) the [block header](/docs/glossary#block-header) with different [nonce](/docs/glossary#nonce) values
3. **Difficulty Target**: The [hash](/docs/glossary#hash) must be below a certain target (set by network [difficulty](/docs/glossary#difficulty))
4. **Success**: When a [miner](/docs/glossary#mining) finds a valid [hash](/docs/glossary#hash), they broadcast the [block](/docs/glossary#block) to the network
5. **Reward**: The [miner](/docs/glossary#mining) receives the [block reward](/docs/glossary#block-reward) (currently 3.125 BTC) plus [transaction fees](/docs/glossary#transaction-fee)

## Mining Difficulty

- **Adjustment**: Every 2016 [blocks](/docs/glossary#block) (~2 weeks), the [difficulty](/docs/glossary#difficulty) adjusts based on network [hash rate](/docs/glossary#hash-rate)
- **Target**: Maintains ~10 minute average [block time](/docs/glossary#block-time)
- **Current Network Hash Rate**: ~700 EH/s (exahashes per second)
- **See Also**: [Difficulty Adjustment](/docs/mining/difficulty) for detailed explanation

## Technical Details

### Block Headers
- **Size**: 80 bytes of [block](/docs/glossary#block) metadata
- **Components**: Version, previous [block](/docs/glossary#block) [hash](/docs/glossary#hash), [merkle root](/docs/glossary#merkle-root), timestamp, [difficulty target](/docs/glossary#difficulty-target), [nonce](/docs/glossary#nonce)
- **Hash Function**: [SHA256D](/docs/glossary#sha256d) (double [SHA-256](/docs/glossary#sha-256))

### Nonce Space
- **Range**: 0 to 4,294,967,295 (2^32 - 1)
- **Exhaustion**: If all [nonces](/docs/glossary#nonce) fail, [miners](/docs/glossary#mining) change the [coinbase transaction](/docs/glossary#coinbase-transaction) or timestamp
- **Search Space**: Effectively unlimited through [coinbase](/docs/glossary#coinbase-transaction) modifications

### Target Difficulty
- **Network-Wide**: All [miners](/docs/glossary#mining) compete against the same target
- **Dynamic**: Adjusts every 2016 [blocks](/docs/glossary#block) based on actual vs. target [block time](/docs/glossary#block-time)
- **Purpose**: Maintains consistent [block](/docs/glossary#block) production rate

## Hash Function: SHA256D

Bitcoin uses a double SHA-256 hash function:

```
hash = SHA256(SHA256(block_header))
```

This means:
1. First SHA-256 hash of the block header
2. Second SHA-256 hash of the first hash result
3. Result must be below the network difficulty target

## Mining Process Flow

```
1. Collect Transactions
   ↓
2. Build Block Header
   ↓
3. Hash Block Header
   ↓
4. Check if Hash < Target
   ├─ Yes → Broadcast Block → Receive Reward
   └─ No → Increment Nonce → Repeat from Step 3
```

## Educational Value

### What You'll Learn
1. **Block Construction**: How Bitcoin blocks are built
2. **Mining Algorithms**: SHA256D hash function
3. **Network Protocol**: RPC communication with Bitcoin node
4. **Difficulty Adjustment**: How network difficulty works
5. **Economic Incentives**: Why mining is competitive

### Technical Concepts
- **[Block Headers](/docs/glossary#block-header)**: 80-byte [block](/docs/glossary#block) metadata
- **[Coinbase Transactions](/docs/glossary#coinbase-transaction)**: Special reward [transactions](/docs/glossary#transaction)
- **[Merkle Trees](/docs/glossary#merkle-tree)**: [Transaction](/docs/glossary#transaction) organization
- **[Nonce](/docs/glossary#nonce) Space**: 4.3 billion possible values
- **[Difficulty Target](/docs/glossary#difficulty-target)**: Network-wide [mining](/docs/glossary#mining) target

## Related Topics

- [Overview](/docs/mining) - Mining architecture and concepts
- [Mining Economics](/docs/mining/economics) - Rewards and profitability
