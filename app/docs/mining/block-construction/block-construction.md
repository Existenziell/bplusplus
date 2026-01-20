# Block Construction

Block construction is the process by which miners assemble a new block from pending transactions. This is where the mempool meets the blockchain. Miners must decide which transactions to include, how to order them, and how to structure the block for maximum profit while following consensus rules.

## Anatomy of a Block

A Bitcoin block consists of two main parts:

### Block Header (80 bytes)

```
┌─────────────────────────────────────────────────┐
│ Version (4 bytes)                               │
├─────────────────────────────────────────────────┤
│ Previous Block Hash (32 bytes)                  │
├─────────────────────────────────────────────────┤
│ Merkle Root (32 bytes)                          │
├─────────────────────────────────────────────────┤
│ Timestamp (4 bytes)                             │
├─────────────────────────────────────────────────┤
│ Difficulty Target (4 bytes)                     │
├─────────────────────────────────────────────────┤
│ Nonce (4 bytes)                                 │
└─────────────────────────────────────────────────┘
```

### Block Body

- **Coinbase Transaction**: First transaction, creates new bitcoin
- **Regular Transactions**: Payments selected from the mempool

## The Coinbase Transaction

The coinbase transaction is special: it's the only transaction that creates new bitcoin.

### Structure

```
Inputs:
  - No previous output (creates coins from nothing)
  - Coinbase data: Arbitrary data (up to 100 bytes)
    - Must include block height (BIP34)
    - Often includes miner identifier, messages, extra nonce

Outputs:
  - Block reward: Currently 3.125 BTC (after April 2024 halving)
  - Transaction fees: Sum of all fees from included transactions
  - Can have multiple outputs (pool payouts, etc.)
```

### Famous Coinbase Messages

- **Genesis Block**: "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"
- **Block 629999** (pre-halving): "NYTimes 09/Apr/2020 With $2.3T Injection, Fed's Plan Far Exceeds 2008 Rescue"

### Coinbase Maturity

Coinbase outputs cannot be spent until 100 blocks have passed. This prevents issues if the block is orphaned.

## Transaction Selection

Miners want to maximize revenue, which means selecting transactions that pay the highest fees per unit of block space.

### The Knapsack Problem

Block construction is a variant of the knapsack optimization problem:

- **Constraint**: Block weight limit (4 million weight units ≈ 1 MB base + 3 MB witness)
- **Objective**: Maximize total fees
- **Complication**: Transaction dependencies (child transactions require parents)

### Fee Rate Priority

Transactions are generally sorted by **fee rate** (satoshis per virtual byte):

```
Priority Queue:
1. Tx A: 100 sat/vB, 250 vB → 25,000 sats fee
2. Tx B: 80 sat/vB, 500 vB → 40,000 sats fee
3. Tx C: 50 sat/vB, 200 vB → 10,000 sats fee
...
```

### Ancestor Fee Rate

When transactions have dependencies, miners calculate the **ancestor fee rate**:

```
Parent Tx: 10 sat/vB, 200 vB
Child Tx: 100 sat/vB, 150 vB

Ancestor fee rate of child = (10×200 + 100×150) / (200 + 150)
                           = 17,000 / 350 = 48.6 sat/vB
```

This is how CPFP (Child Pays for Parent) works: the child's high fee pulls the parent along.

### Block Template Algorithm

Bitcoin Core's `getblocktemplate` uses this approach:

1. **Sort by ancestor fee rate**: Calculate effective fee rate for each transaction
2. **Add highest-fee transactions**: Fill the block greedily
3. **Handle dependencies**: Include all ancestors when adding a transaction
4. **Respect limits**: Stay within weight and sigop limits
5. **Update calculations**: Recalculate fee rates as transactions are added

## Block Weight and SegWit

Since SegWit (2017), blocks use **weight** instead of raw size:

```
Block Weight = (Base Size × 4) + Witness Size

Maximum Block Weight = 4,000,000 weight units (4 MWU)
```

### Practical Capacity

- **Non-SegWit transactions**: ~1 MB per block
- **All SegWit transactions**: Up to ~2.3 MB per block
- **Typical mixed blocks**: ~1.5-2 MB

### Why Weight Matters for Miners

SegWit transactions are "discounted" because their witness data costs less weight. This means:

- SegWit transactions can pay lower absolute fees for the same priority
- Miners can fit more transactions in a block
- More fees collected overall

## Constructing the Merkle Root

All transactions in a block are hashed into a **Merkle tree**:

```
                    Merkle Root
                   /           \
              Hash AB          Hash CD
             /      \         /      \
         Hash A    Hash B   Hash C   Hash D
           |         |        |        |
          Tx A      Tx B     Tx C     Tx D
```

### Why Merkle Trees?

- **Efficient verification**: Prove a transaction is in a block with O(log n) hashes
- **Compact proofs**: SPV wallets only need the Merkle path, not the full block
- **Tamper detection**: Any change to any transaction changes the root

### Merkle Tree Construction

1. Hash each transaction (double SHA-256)
2. Pair hashes and hash together
3. If odd number, duplicate the last hash
4. Repeat until one hash remains (the root)

## The Block Template

When a miner requests work, they receive a **block template**:

```json
{
  "version": 536870912,
  "previousblockhash": "00000000000000000002a7c...",
  "transactions": [
    {
      "txid": "abc123...",
      "fee": 25000,
      "weight": 1000
    },
    ...
  ],
  "coinbasevalue": 312510000,
  "target": "00000000000000000004b3f...",
  "mintime": 1699999999,
  "mutable": ["time", "transactions", "coinbase"]
}
```

### Template Updates

Miners should update their template:

- **Every few seconds**: To include new high-fee transactions
- **When a new block arrives**: Previous block hash changes
- **When transactions confirm**: Remove now-invalid transactions

## Empty Blocks

Sometimes miners produce **empty blocks** (only coinbase transaction):

### Why Empty Blocks?

1. **Speed**: Immediately after finding a block, miners start on the next
2. **Validation lag**: New block's transactions aren't yet validated
3. **Profit**: Block reward alone is still profitable

### SPV Mining

Some pools practice "SPV mining":

1. See new block header from competitor
2. Start mining on top immediately (without validating transactions)
3. If the previous block was invalid, their block is also invalid

This is risky but provides a head start.

## Extra Nonce

The 4-byte nonce in the header provides only 2³² possibilities, which is not enough for modern ASICs.

### Expanding the Search Space

Miners use additional variables:

1. **Extra nonce in coinbase**: Arbitrary data that changes the Merkle root
2. **Timestamp**: Can be adjusted within limits
3. **Version bits**: Some bits can be rolled

```
Search space:
- Nonce: 4 bytes → 2³² combinations
- Extra nonce: 4-8 bytes → 2³²-2⁶⁴ combinations
- Combined: Effectively unlimited
```

## Block Propagation Incentives

Miners want their blocks to propagate quickly:

### Compact Blocks (BIP 152)

Instead of sending full blocks:

1. Send block header + short transaction IDs
2. Receiver reconstructs from mempool
3. Request only missing transactions

Reduces block propagation from megabytes to kilobytes.

### FIBRE Network

A private relay network for miners:

- Uses forward error correction
- Optimized routing
- Reduces orphan risk from slow propagation

## Practical Example

Building a block step by step:

```
1. Start with empty block
   - Weight used: 0 / 4,000,000
   - Fees collected: 0

2. Create coinbase transaction
   - Block reward: 3.125 BTC
   - Reserve space for coinbase: ~200 weight units

3. Select transactions from mempool
   - Tx1: 50 sat/vB, 500 vB, 25,000 sat fee ✓
   - Tx2: 45 sat/vB, 1000 vB, 45,000 sat fee ✓
   - Tx3: 40 sat/vB, 800 vB, 32,000 sat fee ✓
   ...continue until block is full...

4. Calculate Merkle root from all transactions

5. Assemble block header
   - Version: 0x20000000
   - Previous hash: [from chain tip]
   - Merkle root: [calculated]
   - Timestamp: [current time]
   - Bits: [current difficulty]
   - Nonce: [start searching]

6. Mine (search for valid nonce)
```

## Summary

Block construction is where mining meets economics:

- **Coinbase creates new bitcoin** plus collects all fees
- **Transaction selection** optimizes for fee revenue
- **Merkle trees** provide efficient verification
- **Weight limits** determine block capacity
- **Propagation speed** affects orphan risk

Miners balance:
- Including high-fee transactions (more profit)
- Keeping blocks small (faster propagation)
- Updating templates (fresh transactions)
- Starting quickly (after new block found)

## Related Topics

- [Mempool](/docs/mining/mempool) - Where transactions wait
- [Proof-of-Work](/docs/mining/proof-of-work) - Finding valid blocks
- [Mining Economics](/docs/mining/economics) - Revenue and costs
- [Mining Pools](/docs/mining/pools) - Collaborative mining

## Resources

- [BIP 152: Compact Blocks](https://github.com/bitcoin/bips/blob/master/bip-0152.mediawiki)
- [Bitcoin Core getblocktemplate](https://developer.bitcoin.org/reference/rpc/getblocktemplate.html)
