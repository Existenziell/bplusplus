# The Bitcoin Trilemma

The Bitcoin Trilemma describes the challenge of balancing three critical blockchain properties: **Scalability**, **Security**, and **Decentralization**. Optimizing one typically comes at the cost of another.

## The Three Pillars

| Property | Definition | Bitcoin's Approach |
|----------|------------|-------------------|
| **Scalability** | Ability to process many transactions quickly | ~7 TPS, 1 MB blocks (up to ~4 MB with SegWit), 10-min block time |
| **Security** | Resistance to attacks and manipulation | 700+ EH/s hash rate, proof-of-work, economic incentives |
| **Decentralization** | Distribution of control across participants | Thousands of global nodes, open participation, multiple mining pools |

## The Trade-offs

| Trade-off | What Happens | Example |
|-----------|--------------|---------|
| **Scalability ↔ Security** | Larger/faster blocks require more resources → fewer nodes can participate → weaker security | Bitcoin Cash's 32 MB blocks resulted in fewer nodes |
| **Scalability ↔ Decentralization** | Higher hardware requirements → only well-funded entities can run nodes | 100+ MB blocks would exclude most participants |
| **Security ↔ Decentralization** | Higher hash rate requires expensive ASICs → mining power concentrates | ASIC mining improved security but reduced miner diversity |

## Bitcoin's Solution

### Layer 1: Prioritize Security + Decentralization

Bitcoin intentionally limits base-layer scalability to maintain security and decentralization. The philosophy: the settlement layer should be maximally secure and decentralized.

### Layer 2: Scale on Top

Scalability is addressed through Layer 2 solutions that inherit base-layer security:

- **Lightning Network:** Off-chain payment channels enabling millions of TPS with low fees
- **Sidechains:** Liquid, Rootstock for specific use cases
- **State/Payment channels:** Direct peer-to-peer transactions

## Historical Examples

| Change | Year | Scalability | Security | Decentralization |
|--------|------|-------------|----------|------------------|
| **Bitcoin Cash** (8→32 MB blocks) | 2017 | ✅ Higher TPS | ⚠️ Lower hash rate | ❌ Fewer nodes |
| **SegWit** (witness data separated) | 2017 | ✅ ~2x capacity | ✅ Maintained | ✅ Soft fork compatible |
| **Lightning Network** | 2018+ | ✅ Millions TPS | ✅ Base layer intact | ✅ Base layer intact |

## Current State

Bitcoin optimizes for **Security** (⭐⭐⭐⭐⭐) and **Decentralization** (⭐⭐⭐⭐), accepting limited base-layer **Scalability** (⭐⭐). This is intentional:

- **Base layer** = Settlement layer (high-value, infrequent transactions)
- **Layer 2** = Payment layer (low-value, frequent transactions)

This separation of concerns provides the benefits of all three properties across the stack.

## Related Topics

- [What is Bitcoin?](/docs/fundamentals/overview) - High-level Bitcoin overview
- [Decentralization](/docs/fundamentals/decentralization) - Why decentralization matters
- [Lightning Network](/docs/lightning) - Layer 2 scaling solution
