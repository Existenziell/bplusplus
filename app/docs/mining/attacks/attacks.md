# Mining Attacks

## Overview

Bitcoin's proof-of-work security model is designed to make attacks economically irrational. However, understanding potential attacks is crucial for appreciating Bitcoin's security properties and the incentives that protect the network.

This section covers theoretical attacks on Bitcoin mining, their costs, and why they generally don't happen.

## The 51% Attack

The most discussed attack on Bitcoin: what if someone controls more than half the network's hashrate?

### What It Enables

With >50% hashrate, an attacker can:

1. **Double-spend**: Reverse their own transactions
2. **Block transactions**: Prevent specific transactions from confirming
3. **Empty blocks**: Mine blocks with no transactions (censorship)

### What It Doesn't Enable

Even with 51%, an attacker **cannot**:

- **Steal coins**: Can't create valid signatures for others' coins
- **Change consensus rules**: Can't create coins, change block rewards
- **Spend anyone's coins**: Only their own (for double-spends)
- **Modify historical transactions**: Only recent blocks (cost increases with depth)

### How It Works

```
Honest chain:    A → B → C → D → E → F
                              ↑
                        Attacker buys something
                        
Attacker mines secretly:
                 A → B → C → D'→ E'→ F'→ G'
                              ↑
                        Same coins spent differently
                        
When attacker's chain is longer, it becomes the valid chain.
The honest chain is orphaned. Double-spend succeeds.
```

### Cost Analysis

**Renting Hashrate**

At 500 EH/s network hashrate, 51% = 250 EH/s

```
Cost to rent 250 EH/s:
- Hardware doesn't exist to rent at this scale
- Would require owning majority of world's ASICs
- Estimated cost: $10-20 billion in equipment alone
- Plus electricity, facilities, etc.
```

**Opportunity Cost**

If you have 51% hashrate, honest mining is extremely profitable:

```
51% of block rewards:
- 225 blocks/day × 3.375 BTC × 51% = 387 BTC/day
- At $60,000/BTC = $23M per day
- $8.5 billion per year

Why attack when honest mining is this lucrative?
```

### Historical Non-Attacks

No successful 51% attack on Bitcoin mainnet has ever occurred. The economics don't work:

- Cost exceeds potential gain
- Attack destroys value of the asset you're attacking
- Your own holdings lose value
- Criminal liability is enormous

### Detection

51% attacks are visible:

- Sudden hashrate spike from unknown source
- Chain reorganizations (reorgs)
- Confirmed transactions disappearing

### Defenses

- **Wait for confirmations**: More confirmations = harder to reverse
- **6 confirmations**: Traditional standard (~1 hour)
- **Large amounts**: Wait for more confirmations
- **Economic finality**: Eventually, attack cost exceeds transaction value

## Selfish Mining

A subtle attack where miners can gain unfair advantage with less than 50% hashrate.

### How It Works

Normal mining: Find a block → immediately broadcast it

Selfish mining:
1. Find a block → **keep it secret**
2. Continue mining on your secret chain
3. If honest miners catch up, release your block
4. You get the reward, honest miners' work is wasted

### The Strategy

```
Scenario: Selfish miner has 30% hashrate

1. Selfish miner finds block A
   Secret chain: [A]
   Public chain: []
   
2. Keep mining secretly
   If selfish miner finds B before public finds anything:
   Secret chain: [A, B]  ← 2 block lead
   
3. When public finds a block:
   - If selfish lead ≥ 2: release one block, maintain lead
   - If selfish lead = 1: race to propagate
   - If selfish lead = 0: lost this round
```

### Profitability Threshold

Selfish mining becomes profitable above ~33% hashrate (with optimal network position) or ~25% (with network advantages).

Below this threshold, the strategy loses money compared to honest mining.

### Why It Rarely Happens

1. **Threshold is high**: Need significant hashrate
2. **Detection risk**: Unusual block timing patterns
3. **Pool transparency**: Large pools are monitored
4. **Reputation damage**: Discovered selfish mining destroys trust
5. **Coordination**: Requires all pool miners to participate

### Defenses

- **Uniform tie-breaking**: Nodes randomly choose between equal-height blocks
- **Timestamp analysis**: Detect anomalous block timing
- **Pool monitoring**: Watch for suspicious behavior

## Block Withholding Attack

An attack by pool miners against their own pool.

### How It Works

1. Miner joins a pool
2. Submits partial shares (proving work)
3. When finding a valid block, **doesn't submit it**
4. Pool pays miner for shares but gets no blocks

### Impact

- Pool loses revenue (missing blocks)
- Attacker earns from shares but sabotages pool
- Other pool members subsidize the attacker

### Motivation

- Competitor pools attacking each other
- Extortion
- Spite

### Defenses

- **Statistical analysis**: Detect miners who never find blocks
- **Stratum V2**: Better work validation
- **Reputation systems**: Track miner history

## Fee Sniping

Miners stealing high-fee transactions from other miners' blocks.

### How It Works

```
Block N contains a transaction with 10 BTC in fees (unusually high)

Attacker sees Block N, thinks:
"If I mine an alternative Block N with that transaction, 
I get those 10 BTC instead."

Attacker mines competing Block N' including the high-fee tx.
```

### Requirements

- Very high-fee transaction (worth the orphan risk)
- Significant hashrate (to win the race)
- Quick reaction (see block, start mining alternative)

### Why It's Rare

- Need to out-mine honest miners extending Block N
- Costs the block reward if you lose
- Not worth it for normal fees

### Prevention

- **nLockTime**: Transactions can specify earliest block
- **CLTV**: Similar lock-time mechanism
- **Low fees**: Don't create tempting targets

## Transaction Pinning

An attack relevant to Layer 2 protocols like Lightning.

### How It Works

1. Attacker creates a low-fee transaction spending the same output
2. Transaction is large, making CPFP expensive
3. Victim's transaction can't confirm
4. Time-sensitive protocols (Lightning) may fail

### Impact on Lightning

Lightning channels have time-locked transactions. If these can't confirm:

- Attacker might steal funds
- Force-close may fail
- Victim loses money

### Defenses

- **Package relay**: Let related transactions propagate together
- **Anchor outputs**: Pre-planned fee-bumping mechanisms
- **v3 transactions**: New policy to limit pinning

## Time-Warp Attack

Exploiting timestamp manipulation over difficulty adjustment periods.

### How It Works

Difficulty adjusts every 2016 blocks based on timestamps.

```
Normal: 2016 blocks in 2 weeks → difficulty unchanged

Attack:
1. Set first block timestamp = minimum allowed
2. Set last block timestamp = maximum allowed
3. Period appears longer than 2 weeks
4. Difficulty decreases artificially
5. Mine faster, get more rewards
```

### Requirements

- Majority hashrate (to control timestamps)
- Patience (takes many difficulty periods)
- Coordination (all block timestamps must be manipulated)

### Why It's Theoretical

- Requires 51% hashrate (major attack already)
- Slow payoff (months to exploit)
- Easily detected
- Could be fixed with soft fork

## Eclipse Attack

Isolating a node from the real network.

### How It Works

1. Attacker surrounds victim with malicious nodes
2. Victim only connects to attacker's nodes
3. Attacker feeds victim a fake chain
4. Victim accepts invalid transactions

### Impact

- Victim might accept unconfirmed transactions
- Victim might mine on wrong chain
- Victim might accept double-spends

### Defenses

- **More connections**: Connect to many diverse peers
- **DNS seeds**: Use multiple bootstrap sources
- **Manual peering**: Add known-good peers
- **Outbound connections**: Prioritize connections you initiate

## Finney Attack

Named after Hal Finney—a race between broadcasting blocks and transactions.

### How It Works

1. Attacker mines block containing tx spending to themselves
2. Keep block secret
3. Spend same coins at merchant (buy something)
4. Immediately broadcast secret block
5. Merchant's transaction is now invalid

### Requirements

- Find a block (significant hashrate)
- Execute purchase very quickly (before someone else finds a block)
- Merchant accepts 0-confirmation transactions

### Defense

- **Wait for confirmations**: Even 1 confirmation defeats this
- **Don't accept 0-conf**: For significant amounts

## Goldfinger Attack

Attack Bitcoin not for profit, but for destruction.

### Motivation

- Nation-state wanting to kill Bitcoin
- Competitor (central bank?) wanting to discredit crypto
- Ideological opposition

### Method

- Acquire massive hashrate regardless of cost
- Use it to disrupt the network
- Not trying to profit—trying to destroy

### Defense

- **Sheer scale**: 500+ EH/s is hard to match
- **Decentralization**: No single point of attack
- **Adaptability**: Network can respond (emergency difficulty adjustment, algorithm change)
- **Resilience**: Bitcoin has survived many attacks and attempts

### Reality Check

This attack requires:

- Billions of dollars
- Global supply chain capture
- Sustained attack (one-time disruption isn't fatal)
- Facing legal consequences in every jurisdiction

## Summary

Bitcoin's mining attacks show why the security model works:

| Attack | Requirement | Profitability | Likelihood |
|--------|-------------|---------------|------------|
| 51% Attack | >50% hashrate | Usually negative | Very low |
| Selfish Mining | >25-33% hashrate | Marginal | Low |
| Block Withholding | Pool participation | Negative-sum | Low |
| Fee Sniping | High fees + hashrate | Rarely worthwhile | Very low |
| Time-Warp | 51% + patience | Possible | Theoretical |
| Eclipse | Network control | Situation-specific | Possible |

**The key insight**: Bitcoin is protected by economics, not just cryptography. Attacks are possible but rarely profitable.

Most attacks require:
- Enormous capital expenditure
- Destroying the value of your investment
- Obvious detection
- Criminal liability

Honest mining is almost always more profitable than attacking.

## Related Topics

- [Proof-of-Work](/docs/mining/proof-of-work) - The security mechanism
- [Mining Economics](/docs/mining/economics) - Why honest mining pays
- [Difficulty Adjustment](/docs/mining/difficulty) - How network responds
- [Consensus Mechanism](/docs/fundamentals/consensus) - How Bitcoin achieves agreement

## Resources

- [Selfish Mining Paper](https://www.cs.cornell.edu/~ie53/publications/btcProcFC.pdf) - Original academic analysis
- [Bitcoin Security Model](https://nakamotoinstitute.org/library/security-model/) - Comprehensive overview
