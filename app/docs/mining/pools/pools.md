# Mining Pools

A **mining pool** is a collective of miners who combine their computational resources to increase their chances of finding blocks. When the pool finds a block, the reward is distributed among participants based on their contributed work.

Solo mining is like playing the lottery—you might wait years for a payout. Pool mining provides regular, predictable income at the cost of sharing rewards.

## Why Mining Pools Exist

### The Variance Problem

Consider a solo miner with 0.001% of total network hashrate:

- **Expected time to find a block**: ~1,000,000 blocks ÷ 0.00001 = 100,000,000 minutes ≈ **190 years**
- **Block reward**: 3.125 BTC (when you finally find one)
- **Reality**: You might find one tomorrow, or never

This variance is unacceptable for anyone running mining as a business.

### Pool Solution

By combining hashpower:

- **Regular payouts**: Daily or even hourly
- **Predictable income**: Based on contributed work
- **Reduced variance**: Pool finds blocks frequently
- **Small miner viability**: Even small operations can profit

## How Mining Pools Work

### Basic Flow

```
1. Miner connects to pool
2. Pool sends work (block template)
3. Miner searches for valid shares
4. Miner submits shares to pool
5. Pool validates shares and credits miner
6. When pool finds a block, distribute rewards
```

### Shares vs Blocks

**Shares** are proof that a miner is working:

- A share is a hash that meets a lower difficulty than the network target
- Easy to find (every few seconds)
- Proves miner is honestly hashing
- Pool uses shares to measure contribution

**Blocks** are what actually pays:

- A hash that meets the full network difficulty
- Rare (pool might find one every few hours)
- Contains the actual bitcoin reward

```
Network difficulty: 00000000000000000004b3f...
Pool share difficulty: 00000000004b3f...
                       ↑ Much easier target
```

### Contribution Tracking

Pools track each miner's work:

```
Miner A: 1,000,000 shares (10 TH/s)
Miner B: 500,000 shares (5 TH/s)
Miner C: 100,000 shares (1 TH/s)
─────────────────────────────────
Total:   1,600,000 shares

Block found! Reward: 3.125 BTC

Miner A: 3.125 × (1,000,000 / 1,600,000) = 1.953 BTC
Miner B: 3.125 × (500,000 / 1,600,000) = 0.977 BTC
Miner C: 3.125 × (100,000 / 1,600,000) = 0.195 BTC
```

## Payout Schemes

Different pools use different methods to distribute rewards.

### Pay Per Share (PPS)

- **How it works**: Pool pays fixed amount per share, regardless of whether blocks are found
- **Miner risk**: None—guaranteed payment for work
- **Pool risk**: High—pool absorbs variance
- **Fees**: Higher (2-4%) to compensate pool risk

```
Share submitted → Immediate credit
No waiting for blocks
Pool takes the gamble
```

### Full Pay Per Share (FPPS)

- **Like PPS, but**: Also includes estimated transaction fees
- **Benefit**: Miners get share of fees, not just block reward
- **Popular because**: Transaction fees are increasingly important

### Pay Per Last N Shares (PPLNS)

- **How it works**: When block found, reward distributed based on last N shares
- **Miner risk**: Medium—payment depends on luck and timing
- **Pool risk**: Lower—only pays when blocks found
- **Fees**: Lower (1-2%)
- **Loyalty rewarded**: Miners who stay connected get better returns

```
Block found!
Look at last 1,000,000 shares
Your 50,000 shares = 5% of reward
```

### PROP (Proportional)

- **How it works**: Reward split proportionally among all shares since last block
- **Problem**: Vulnerable to pool hopping
- **Rarely used**: PPLNS is preferred

### Score-Based

- **How it works**: Recent shares weighted more heavily
- **Benefit**: Discourages pool hopping
- **Complexity**: Harder to understand and verify

## Pool Protocols

### Stratum (v1)

The dominant mining protocol since 2012:

```
Pool → Miner: Here's the block template
Miner → Pool: Here's a valid share
Pool → Miner: Share accepted, new work
```

**Characteristics**:
- Simple and widely supported
- Pool controls block template completely
- Miner just hashes what they're told

**Downsides**:
- Miners can't choose transactions
- Pool has complete control over block content
- Potential for censorship

### Stratum V2

Modern replacement addressing Stratum v1's issues:

**Key improvements**:
- **Job negotiation**: Miners can propose their own block templates
- **Encryption**: Communication is encrypted and authenticated
- **Efficiency**: Binary protocol (not JSON), less bandwidth
- **Decentralization**: Miners regain some sovereignty

```
Traditional (Stratum v1):
Pool → Miner: "Hash this exact template"

Stratum V2 (with job negotiation):
Miner → Pool: "Here's my proposed template"
Pool → Miner: "Approved, hash it"
```

### BetterHash (Predecessor to Stratum V2)

Matt Corallo's proposal that influenced Stratum V2:

- Miners construct their own blocks
- Pool only provides coinbase and validates shares
- Never widely adopted, but ideas live on

## Centralization Concerns

Mining pools create centralization pressure:

### The Problem

```
Top pools control majority of hashrate:
┌──────────────────────────────────────────┐
│ Foundry USA     ████████████████ 31.94%  │
│ AntPool         ███████ 14.98%           │
│ F2Pool          ██████ 12.90%            │
│ ViaBTC          █████ 10.32%             │
│ SpiderPool      ███ 7.14%                │
│ MARA Pool       ██ 5.75%                 │
│ Others          ████████ 16.97%          │
└──────────────────────────────────────────┘
```

**Risks**:
- Pool operator could censor transactions
- Pool could attempt double-spend attacks
- Government could pressure large pools
- Collusion between pools

### Mitigating Factors

- **Miners can switch pools**: Instant exit if pool misbehaves
- **Pool reputation matters**: Bad behavior means losing miners
- **Stratum V2**: Gives miners more control
- **Geographic distribution**: Pools operate in different jurisdictions

### Decentralized Pools

Attempts to remove pool operators:

**P2Pool** (historical):
- Miners run pool nodes
- Separate blockchain tracks shares
- No central operator
- Died due to complexity and variance for small miners

**Braidpool** (in development):
- Modern attempt at decentralized pooling
- Uses DAG structure for share tracking
- Still experimental

## Choosing a Pool

Factors to consider:

### Payout Method
- **PPS/FPPS**: Stable income, higher fees
- **PPLNS**: Variable income, lower fees, rewards loyalty

### Fees
- Range from 0% to 4%
- Consider fee vs payout method trade-off

### Minimum Payout
- Some pools hold funds until threshold
- Lower threshold = more frequent payouts
- Higher threshold = lower transaction fee percentage

### Server Locations
- Closer servers = less latency
- Less latency = fewer stale shares
- Stale shares = lost money

### Transparency
- Can you verify payouts?
- Is hashrate displayed accurately?
- What's the pool's track record?

### Stratum V2 Support
- Gives you more control
- Better for network decentralization
- Still being adopted

## Pool Economics

### Pool Revenue

```
Block reward:           3.125 BTC
Average transaction fees: 0.25 BTC
───────────────────────────────────
Total per block:        3.375 BTC

Pool finds 10 blocks/day:
Daily revenue: 33.75 BTC
```

### Pool Costs

- **Infrastructure**: Servers, bandwidth, monitoring
- **Development**: Software maintenance
- **Operations**: Staff, support
- **Variance buffer**: Reserve for unlucky streaks (PPS pools)

### Miner Economics

```
Your hashrate: 100 TH/s
Network hashrate: 500 EH/s
Your share: 0.00002%

Daily block rewards: 450 blocks × 3.375 BTC = 1,518.75 BTC
Your share: 1,518.75 × 0.00002% = 0.000304 BTC/day

At $60,000/BTC: ~$18/day revenue
Electricity: ~$12/day (varies widely)
Profit: ~$6/day
```

## Setting Up Pool Mining

### Requirements

1. **Mining hardware**: ASICs for Bitcoin
2. **Pool account**: Register with chosen pool
3. **Mining software**: CGMiner, BFGMiner, or manufacturer software
4. **Wallet**: For receiving payouts

### Basic Configuration

```
Pool URL: stratum+tcp://pool.example.com:3333
Username: your_wallet_address.worker_name
Password: x (often ignored)
```

### Multiple Pools (Failover)

```
Primary: pool1.example.com:3333
Secondary: pool2.example.com:3333
Tertiary: pool3.example.com:3333
```

If primary fails, automatically switch to secondary.

## Summary

Mining pools solve the variance problem:

- **Combine resources**: Small miners can participate
- **Regular payouts**: Predictable income
- **Shared risk**: Pool absorbs variance (PPS) or shares it (PPLNS)

Trade-offs:
- **Fees**: Pools take 1-4%
- **Centralization**: Large pools control significant hashrate
- **Control**: Traditional pools control block construction

The future is moving toward:
- **Stratum V2**: More miner control
- **Decentralized pools**: No central operator
- **Transaction selection**: Miners choosing what to include

## Related Topics

- [Mining Economics](/docs/mining/economics) - Profitability calculations
- [Block Construction](/docs/mining/block-construction) - How blocks are built
- [Proof-of-Work](/docs/mining/proof-of-work) - The mining algorithm
- [Hardware Evolution](/docs/mining/hardware) - Mining equipment history

## Resources

- [Stratum V2](https://stratumprotocol.org/) - Next-generation mining protocol
- [Braidpool](https://github.com/braidpool/braidpool) - Decentralized pool project
- [Mining Pool Stats](https://miningpoolstats.stream/bitcoin) - Pool hashrate distribution
