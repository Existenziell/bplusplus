# Mining Pools

A **[mining pool](/docs/glossary#mining-pool)** is a collective of [miners](/docs/glossary#mining) who combine their computational resources to increase their chances of finding [blocks](/docs/glossary#block). When the pool finds a block, the reward is distributed among participants based on their contributed work.

Solo mining is like playing the lottery: you might wait years for a payout. Pool mining provides regular, predictable income at the cost of sharing rewards.

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

- A share is a [hash](/docs/glossary#hash) that meets a lower [difficulty](/docs/glossary#difficulty) than the network target
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

### Share Difficulty and Validation

Pools set a share difficulty that's much lower than the network difficulty. Here's how share validation works:

:::code-group
```rust
use sha2::{Sha256, Digest};

/// Share difficulty and validation for mining pools.

/// Converts a difficulty value to a 256-bit target.
/// Target = MAX_TARGET / difficulty
fn difficulty_to_target(difficulty: f64) -> [u8; 32] {
    // Bitcoin's max target (difficulty 1)
    // 0x00000000FFFF0000000000000000000000000000000000000000000000000000
    let max_target: [u8; 32] = [
        0x00, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
    ];
    
    // For simplicity, we'll use a scaled approach
    // Real implementation would use big integer division
    let scale = (1.0 / difficulty * 65535.0) as u16;
    let mut target = [0u8; 32];
    target[4] = (scale >> 8) as u8;
    target[5] = scale as u8;
    target
}

/// Validates if a hash meets the share difficulty.
fn validate_share(hash: &[u8; 32], share_difficulty: f64) -> bool {
    let target = difficulty_to_target(share_difficulty);
    
    // Compare hash to target (hash must be less than target)
    for i in 0..32 {
        if hash[i] < target[i] {
            return true;
        } else if hash[i] > target[i] {
            return false;
        }
    }
    true
}

/// Calculates the expected shares per block for a given share difficulty.
fn expected_shares_per_block(share_difficulty: f64, network_difficulty: f64) -> f64 {
    network_difficulty / share_difficulty
}

/// Calculates miner payout based on shares submitted.
struct PoolPayout {
    block_reward: f64,      // BTC
    pool_fee_percent: f64,  // e.g., 2.0 for 2%
}

impl PoolPayout {
    /// Calculate proportional payout for a miner.
    fn calculate_payout(&self, miner_shares: u64, total_shares: u64) -> f64 {
        let net_reward = self.block_reward * (1.0 - self.pool_fee_percent / 100.0);
        let share_ratio = miner_shares as f64 / total_shares as f64;
        net_reward * share_ratio
    }
    
    /// Calculate PPS (Pay Per Share) value.
    fn pps_value(&self, share_difficulty: f64, network_difficulty: f64) -> f64 {
        let net_reward = self.block_reward * (1.0 - self.pool_fee_percent / 100.0);
        let expected_shares = expected_shares_per_block(share_difficulty, network_difficulty);
        net_reward / expected_shares
    }
}

fn main() {
    let share_difficulty = 65536.0;  // Pool share difficulty
    let network_difficulty = 70_000_000_000_000.0;  // ~70 trillion
    
    println!("Share difficulty: {}", share_difficulty);
    println!("Network difficulty: {:.0}", network_difficulty);
    println!("Expected shares per block: {:.0}", 
             expected_shares_per_block(share_difficulty, network_difficulty));
    
    let payout = PoolPayout {
        block_reward: 3.125,
        pool_fee_percent: 2.0,
    };
    
    // Example: miner contributed 50,000 out of 1,000,000 shares
    let miner_payout = payout.calculate_payout(50_000, 1_000_000);
    println!("\nMiner payout (50k/1M shares): {:.8} BTC", miner_payout);
    
    let pps_per_share = payout.pps_value(share_difficulty, network_difficulty);
    println!("PPS value per share: {:.12} BTC", pps_per_share);
}
```

```python
import hashlib
import struct

def difficulty_to_target(difficulty: float) -> bytes:
    """
    Converts a difficulty value to a 256-bit target.
    Target = MAX_TARGET / difficulty
    
    Args:
        difficulty: The difficulty value
    
    Returns:
        32-byte target
    """
    # Bitcoin's max target (difficulty 1)
    max_target = 0x00000000FFFF0000000000000000000000000000000000000000000000000000
    
    target_int = int(max_target / difficulty)
    return target_int.to_bytes(32, 'big')

def validate_share(hash_bytes: bytes, share_difficulty: float) -> bool:
    """
    Validates if a hash meets the share difficulty.
    
    Args:
        hash_bytes: 32-byte hash result
        share_difficulty: Pool share difficulty
    
    Returns:
        True if hash meets the share target
    """
    target = difficulty_to_target(share_difficulty)
    
    # Hash must be less than target
    return hash_bytes < target

def expected_shares_per_block(share_difficulty: float, network_difficulty: float) -> float:
    """
    Calculates the expected shares per block for a given share difficulty.
    
    Args:
        share_difficulty: Pool share difficulty
        network_difficulty: Network difficulty
    
    Returns:
        Expected number of shares to find one block
    """
    return network_difficulty / share_difficulty

class PoolPayout:
    """Calculates pool payouts for different schemes."""
    
    def __init__(self, block_reward: float, pool_fee_percent: float):
        """
        Args:
            block_reward: Block reward in BTC
            pool_fee_percent: Pool fee percentage (e.g., 2.0 for 2%)
        """
        self.block_reward = block_reward
        self.pool_fee_percent = pool_fee_percent
    
    def proportional_payout(self, miner_shares: int, total_shares: int) -> float:
        """
        Calculate proportional payout for a miner.
        
        Args:
            miner_shares: Shares submitted by miner
            total_shares: Total shares in the round
        
        Returns:
            Payout in BTC
        """
        net_reward = self.block_reward * (1 - self.pool_fee_percent / 100)
        share_ratio = miner_shares / total_shares
        return net_reward * share_ratio
    
    def pps_value(self, share_difficulty: float, network_difficulty: float) -> float:
        """
        Calculate PPS (Pay Per Share) value per share.
        
        Args:
            share_difficulty: Pool share difficulty
            network_difficulty: Network difficulty
        
        Returns:
            BTC value per share
        """
        net_reward = self.block_reward * (1 - self.pool_fee_percent / 100)
        expected_shares = expected_shares_per_block(share_difficulty, network_difficulty)
        return net_reward / expected_shares
    
    def pplns_payout(self, miner_shares: int, window_shares: list[tuple[str, int]], 
                     n: int) -> float:
        """
        Calculate PPLNS payout (Pay Per Last N Shares).
        
        Args:
            miner_shares: Miner's shares in the window
            window_shares: List of (miner_id, shares) in the window
            n: Window size (last N shares)
        
        Returns:
            Payout in BTC
        """
        total_in_window = sum(shares for _, shares in window_shares)
        net_reward = self.block_reward * (1 - self.pool_fee_percent / 100)
        return net_reward * (miner_shares / total_in_window)

# Example usage
share_difficulty = 65536
network_difficulty = 70_000_000_000_000  # ~70 trillion

print(f"Share difficulty: {share_difficulty}")
print(f"Network difficulty: {network_difficulty:,.0f}")
print(f"Expected shares per block: {expected_shares_per_block(share_difficulty, network_difficulty):,.0f}")

payout = PoolPayout(block_reward=3.125, pool_fee_percent=2.0)

# Example: miner contributed 50,000 out of 1,000,000 shares
miner_payout = payout.proportional_payout(50_000, 1_000_000)
print(f"\nMiner payout (50k/1M shares): {miner_payout:.8f} BTC")

pps_per_share = payout.pps_value(share_difficulty, network_difficulty)
print(f"PPS value per share: {pps_per_share:.12f} BTC")
```

```cpp
#include <iostream>
#include <iomanip>
#include <cmath>
#include <vector>
#include <string>

/**
 * Calculates the expected shares per block for a given share difficulty.
 */
double expectedSharesPerBlock(double shareDifficulty, double networkDifficulty) {
    return networkDifficulty / shareDifficulty;
}

/**
 * Pool payout calculator for different schemes.
 */
class PoolPayout {
private:
    double blockReward;
    double poolFeePercent;

public:
    PoolPayout(double blockReward, double poolFeePercent)
        : blockReward(blockReward), poolFeePercent(poolFeePercent) {}

    /** Net reward after pool fee */
    double netReward() const {
        return blockReward * (1.0 - poolFeePercent / 100.0);
    }

    /** Calculate proportional payout for a miner */
    double proportionalPayout(uint64_t minerShares, uint64_t totalShares) const {
        double shareRatio = static_cast<double>(minerShares) / totalShares;
        return netReward() * shareRatio;
    }

    /** Calculate PPS (Pay Per Share) value per share */
    double ppsValue(double shareDifficulty, double networkDifficulty) const {
        double expectedShares = expectedSharesPerBlock(shareDifficulty, networkDifficulty);
        return netReward() / expectedShares;
    }

    /** Calculate FPPS (Full Pay Per Share) including transaction fees */
    double fppsValue(double shareDifficulty, double networkDifficulty, 
                     double avgTxFees) const {
        double totalReward = blockReward + avgTxFees;
        double netTotal = totalReward * (1.0 - poolFeePercent / 100.0);
        double expectedShares = expectedSharesPerBlock(shareDifficulty, networkDifficulty);
        return netTotal / expectedShares;
    }
};

/**
 * Validates if a hash meets the share difficulty target.
 * Compares hash bytes to calculated target.
 */
bool validateShare(const unsigned char* hash, double shareDifficulty) {
    // Simplified: check leading zero bytes
    // Real implementation would compare full 256-bit values
    int requiredZeroBytes = static_cast<int>(std::log2(shareDifficulty) / 8);
    
    for (int i = 0; i < requiredZeroBytes && i < 32; ++i) {
        if (hash[i] != 0) {
            return false;
        }
    }
    return true;
}

int main() {
    double shareDifficulty = 65536.0;
    double networkDifficulty = 70000000000000.0;  // ~70 trillion
    
    std::cout << "Share difficulty: " << shareDifficulty << std::endl;
    std::cout << "Network difficulty: " << std::fixed << std::setprecision(0) 
              << networkDifficulty << std::endl;
    std::cout << "Expected shares per block: " 
              << expectedSharesPerBlock(shareDifficulty, networkDifficulty) << std::endl;
    
    PoolPayout payout(3.125, 2.0);  // 3.125 BTC reward, 2% fee
    
    // Example: miner contributed 50,000 out of 1,000,000 shares
    double minerPayout = payout.proportionalPayout(50000, 1000000);
    std::cout << std::setprecision(8);
    std::cout << "\nMiner payout (50k/1M shares): " << minerPayout << " BTC" << std::endl;
    
    double ppsPerShare = payout.ppsValue(shareDifficulty, networkDifficulty);
    std::cout << std::setprecision(12);
    std::cout << "PPS value per share: " << ppsPerShare << " BTC" << std::endl;
    
    // FPPS with average 0.25 BTC transaction fees
    double fppsPerShare = payout.fppsValue(shareDifficulty, networkDifficulty, 0.25);
    std::cout << "FPPS value per share: " << fppsPerShare << " BTC" << std::endl;
    
    return 0;
}
```

```javascript
/**
 * Converts a difficulty value to a 256-bit target.
 * @param {number} difficulty - The difficulty value
 * @returns {BigInt} - Target as BigInt
 */
function difficultyToTarget(difficulty) {
    // Bitcoin's max target (difficulty 1)
    const maxTarget = BigInt('0x00000000FFFF0000000000000000000000000000000000000000000000000000');
    return maxTarget / BigInt(Math.floor(difficulty));
}

/**
 * Validates if a hash meets the share difficulty.
 * @param {Buffer} hashBytes - 32-byte hash result
 * @param {number} shareDifficulty - Pool share difficulty
 * @returns {boolean} - True if hash meets the share target
 */
function validateShare(hashBytes, shareDifficulty) {
    const hashInt = BigInt('0x' + hashBytes.toString('hex'));
    const target = difficultyToTarget(shareDifficulty);
    return hashInt < target;
}

/**
 * Calculates the expected shares per block for a given share difficulty.
 * @param {number} shareDifficulty - Pool share difficulty
 * @param {number} networkDifficulty - Network difficulty
 * @returns {number} - Expected shares per block
 */
function expectedSharesPerBlock(shareDifficulty, networkDifficulty) {
    return networkDifficulty / shareDifficulty;
}

/**
 * Pool payout calculator for different schemes.
 */
class PoolPayout {
    /**
     * @param {number} blockReward - Block reward in BTC
     * @param {number} poolFeePercent - Pool fee percentage
     */
    constructor(blockReward, poolFeePercent) {
        this.blockReward = blockReward;
        this.poolFeePercent = poolFeePercent;
    }

    /** Net reward after pool fee */
    netReward() {
        return this.blockReward * (1 - this.poolFeePercent / 100);
    }

    /**
     * Calculate proportional payout for a miner.
     * @param {number} minerShares - Shares submitted by miner
     * @param {number} totalShares - Total shares in the round
     * @returns {number} - Payout in BTC
     */
    proportionalPayout(minerShares, totalShares) {
        const shareRatio = minerShares / totalShares;
        return this.netReward() * shareRatio;
    }

    /**
     * Calculate PPS (Pay Per Share) value per share.
     * @param {number} shareDifficulty - Pool share difficulty
     * @param {number} networkDifficulty - Network difficulty
     * @returns {number} - BTC value per share
     */
    ppsValue(shareDifficulty, networkDifficulty) {
        const expected = expectedSharesPerBlock(shareDifficulty, networkDifficulty);
        return this.netReward() / expected;
    }

    /**
     * Calculate FPPS including transaction fees.
     * @param {number} shareDifficulty - Pool share difficulty
     * @param {number} networkDifficulty - Network difficulty
     * @param {number} avgTxFees - Average transaction fees per block
     * @returns {number} - BTC value per share
     */
    fppsValue(shareDifficulty, networkDifficulty, avgTxFees) {
        const totalReward = this.blockReward + avgTxFees;
        const netTotal = totalReward * (1 - this.poolFeePercent / 100);
        const expected = expectedSharesPerBlock(shareDifficulty, networkDifficulty);
        return netTotal / expected;
    }

    /**
     * Calculate PPLNS payout.
     * @param {number} minerShares - Miner's shares in window
     * @param {number} windowTotal - Total shares in window
     * @returns {number} - Payout in BTC
     */
    pplnsPayout(minerShares, windowTotal) {
        return this.netReward() * (minerShares / windowTotal);
    }
}

// Example usage
const shareDifficulty = 65536;
const networkDifficulty = 70_000_000_000_000;  // ~70 trillion

console.log(`Share difficulty: ${shareDifficulty}`);
console.log(`Network difficulty: ${networkDifficulty.toLocaleString()}`);
console.log(`Expected shares per block: ${expectedSharesPerBlock(shareDifficulty, networkDifficulty).toLocaleString()}`);

const payout = new PoolPayout(3.125, 2.0);  // 3.125 BTC reward, 2% fee

// Example: miner contributed 50,000 out of 1,000,000 shares
const minerPayout = payout.proportionalPayout(50_000, 1_000_000);
console.log(`\nMiner payout (50k/1M shares): ${minerPayout.toFixed(8)} BTC`);

const ppsPerShare = payout.ppsValue(shareDifficulty, networkDifficulty);
console.log(`PPS value per share: ${ppsPerShare.toFixed(12)} BTC`);

// FPPS with average 0.25 BTC transaction fees
const fppsPerShare = payout.fppsValue(shareDifficulty, networkDifficulty, 0.25);
console.log(`FPPS value per share: ${fppsPerShare.toFixed(12)} BTC`);
```
:::

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
- **Miner risk**: None; guaranteed payment for work
- **Pool risk**: High; pool absorbs variance
- **Fees**: Higher (2-4%) to compensate pool risk

```
Share submitted → Immediate credit
No waiting for blocks
Pool takes the gamble
```

### Full Pay Per Share (FPPS)

- **Like PPS, but**: Also includes estimated [transaction fees](/docs/glossary#transaction-fee)
- **Benefit**: Miners get share of fees, not just block reward
- **Popular because**: Transaction fees are increasingly important

### Pay Per Last N Shares (PPLNS)

- **How it works**: When block found, reward distributed based on last N shares
- **Miner risk**: Medium; payment depends on luck and timing
- **Pool risk**: Lower; only pays when blocks found
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

### [Stratum](/docs/glossary#stratum) (v1)

The dominant mining protocol since 2012:

```
Pool → Miner: Here's the block template
Miner → Pool: Here's a valid share
Pool → Miner: Share accepted, new work
```

**Characteristics**:
- Simple and widely supported
- Pool controls [block template](/docs/glossary#block-template) completely
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
- **[Decentralization](/docs/fundamentals/decentralization)**: Miners regain some sovereignty

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
- Pool could attempt [double-spend](/docs/glossary#double-spend) attacks
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
- Miners run pool [nodes](/docs/glossary#node)
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

1. **Mining hardware**: [ASICs](/docs/glossary#asic-application-specific-integrated-circuit) for Bitcoin
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
