# The Mempool

The **mempool** (memory pool) is Bitcoin's waiting room for unconfirmed transactions. When you broadcast a transaction, it doesn't immediately go into a block—it first enters the mempool, where it waits for a miner to include it in the next block.

Every full node maintains its own mempool. There is no single, global mempool—each node has its own view of pending transactions, though they generally converge through transaction propagation across the network.

## How the Mempool Works

### Transaction Lifecycle

1. **Broadcast**: User signs and broadcasts a transaction
2. **Validation**: Nodes verify the transaction is valid (correct signatures, sufficient funds, proper format)
3. **Mempool Entry**: Valid transactions enter the node's mempool
4. **Propagation**: Nodes relay transactions to their peers
5. **Selection**: Miners select transactions from their mempool to include in blocks
6. **Confirmation**: Once included in a block, the transaction leaves the mempool

### Mempool Policies

Each node can set its own mempool policies:

- **Size Limit**: Maximum memory allocated to the mempool (default: 300 MB in Bitcoin Core)
- **Minimum Fee Rate**: Transactions below this rate are rejected
- **Transaction Expiration**: Transactions may be dropped after a period (default: 2 weeks)
- **Replace-by-Fee**: Whether to accept transaction replacements

## Fee Market Dynamics

The mempool creates a **fee market** where users bid for block space.

### How Fees Work

- Transactions pay fees measured in **satoshis per virtual byte (sat/vB)**
- Miners prioritize higher-fee transactions (more profit per block)
- When blocks are full, low-fee transactions wait longer
- Fee rates fluctuate based on demand for block space

### Fee Estimation

Wallets estimate fees by analyzing the mempool:

```
Current mempool state:
├── 1-2 blocks: 50+ sat/vB (high priority)
├── 3-6 blocks: 20-50 sat/vB (medium priority)
├── 7+ blocks: 10-20 sat/vB (low priority)
└── Eventually: 1-10 sat/vB (no rush)
```

During congestion, fees spike. During quiet periods, even 1 sat/vB transactions confirm quickly.

### Mempool Congestion

When transaction volume exceeds block capacity:

1. **Mempool grows**: Unconfirmed transactions accumulate
2. **Fees rise**: Users bid higher to get confirmed faster
3. **Low-fee eviction**: Nodes drop lowest-fee transactions when mempool is full
4. **Backlog clears**: Eventually, transaction volume decreases and the mempool empties

## Replace-by-Fee (RBF)

**RBF** allows replacing an unconfirmed transaction with a new version paying a higher fee.

### How RBF Works

1. Original transaction signals RBF capability (sequence number < 0xfffffffe)
2. User broadcasts replacement with higher fee
3. Nodes replace the original with the new transaction
4. Miners see only the higher-fee version

### RBF Use Cases

- **Fee bumping**: Speed up a stuck transaction
- **Payment updates**: Change the amount or destination before confirmation
- **Consolidation**: Combine outputs more efficiently

### Full RBF vs Opt-in RBF

- **Opt-in RBF**: Only transactions that signal RBF can be replaced (current default)
- **Full RBF**: Any unconfirmed transaction can be replaced (controversial, increasingly adopted)

## Child Pays for Parent (CPFP)

An alternative to RBF for fee bumping.

### How CPFP Works

1. Parent transaction is stuck with low fee
2. Create a child transaction spending the parent's output
3. Child pays a high enough fee to cover both transactions
4. Miners include both (they want the child's high fee)

### CPFP vs RBF

| Aspect | RBF | CPFP |
|--------|-----|------|
| Who can bump | Sender only | Sender or recipient |
| Requires | RBF signaling | Spendable output |
| Efficiency | More efficient | Uses extra block space |

## Mempool Visualization

The mempool can be visualized as a queue sorted by fee rate:

```
Block Space Available: ~1 MB (4 MWU)

Fee Rate (sat/vB)
    │
100+│ ████ ← Confirmed in next block
    │ ████
 50 │ ████████ ← Confirmed in 1-3 blocks
    │ ████████
 20 │ ████████████ ← Confirmed in 3-6 blocks
    │ ████████████
 10 │ ████████████████ ← May wait hours/days
    │ ████████████████
  1 │ ████████████████████ ← May never confirm
    └─────────────────────────────────────
      Transaction Volume (by size)
```

## Mempool Sniping and Games

### Transaction Pinning

An attack where someone prevents a transaction from being replaced:

1. Attacker creates a low-fee child transaction
2. Child is large, making CPFP expensive
3. Original transaction is "pinned" and hard to bump

This is a concern for Lightning Network and other Layer 2 protocols.

### Front-Running

Watching the mempool to exploit pending transactions:

1. See a profitable pending transaction
2. Create your own transaction with higher fee
3. Your transaction confirms first

Common in DeFi on other chains, less relevant for Bitcoin's simpler transactions.

## Mempool Tools and Resources

> **Query the mempool yourself!** Try `getmempoolinfo` and `getrawmempool` in the [Bitcoin CLI Terminal](/terminal) — real mainnet data, no setup required.

### Mempool Explorers

- **[mempool.space](https://mempool.space)**: Beautiful visualization of mempool and fee estimates
- **[jochen-hoenicke.de/queue](https://jochen-hoenicke.de/queue/)**: Historical mempool data
- **[mempoolexplorer.com](https://mempoolexplorer.com)**: Detailed mempool analytics

### What You Can Learn

- Current fee rates for different confirmation targets
- Mempool size and growth trends
- Transaction propagation status
- Historical congestion patterns

## Implications for Users

### Sending Transactions

1. **Check mempool first**: See current fee rates before sending
2. **Use appropriate fees**: Overpaying wastes money; underpaying causes delays
3. **Enable RBF**: Always signal RBF for flexibility
4. **Batch transactions**: Combine multiple payments to save fees

### Receiving Transactions

1. **Wait for confirmations**: Unconfirmed transactions can be replaced or dropped
2. **Check RBF status**: RBF transactions are more easily double-spent before confirmation
3. **Monitor mempool**: Track your incoming transaction's position

## Technical Details

### Mempool Data Structures

Bitcoin Core maintains several structures:

- **mapTx**: Main transaction storage, indexed multiple ways
- **Ancestor/Descendant tracking**: For CPFP calculations
- **Fee rate buckets**: For efficient transaction selection

### Transaction Relay Policies

Not all valid transactions are relayed:

- **Dust limit**: Outputs below ~546 sats are non-standard
- **OP_RETURN size**: Limited to 80 bytes by default (policy, not consensus)
- **Non-standard scripts**: Some valid scripts aren't relayed

### Mempool Accept Rules

Transactions must pass:

1. **Consensus rules**: Valid signatures, scripts, amounts
2. **Standardness rules**: Follow common patterns
3. **Policy rules**: Meet node's minimum fee, size limits
4. **Package rules**: Ancestor/descendant limits (25 transactions, 101 KB)

## Summary

The mempool is the heartbeat of Bitcoin's transaction processing:

- **Waiting room**: Where transactions queue for confirmation
- **Fee market**: Creates price discovery for block space
- **Strategic space**: RBF and CPFP allow fee management
- **Per-node**: Each node has its own mempool view

Understanding the mempool helps you:
- Set appropriate fees
- Troubleshoot stuck transactions
- Understand network congestion
- Make informed timing decisions

## Related Topics

- [Mining Economics](/docs/mining/economics) - How miners profit from fees
- [Block Construction](/docs/mining/block-construction) - How miners select transactions
- [Proof-of-Work](/docs/mining/proof-of-work) - The mining process

## Resources

- [mempool.space](https://mempool.space) - Real-time mempool visualization
- [Bitcoin Core mempool documentation](https://github.com/bitcoin/bitcoin/blob/master/doc/policy/mempool-limits.md) - Technical details
