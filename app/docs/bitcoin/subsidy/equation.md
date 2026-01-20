# The Bitcoin Subsidy Equation

The Bitcoin block subsidy is the amount of new Bitcoin created with each block. It follows a predictable mathematical formula that halves every 210,000 blocks, creating Bitcoin's fixed supply schedule.

## The Equation

### Mathematical Formula

```
Block Subsidy = 50 / (2^halvings)

Where:
  halvings = block_height / 210,000
```

### Implementation

In Bitcoin Core (`validation.cpp`):

```cpp
CAmount GetBlockSubsidy(int nHeight, const Consensus::Params& consensusParams)
{
    int halvings = nHeight / consensusParams.nSubsidyHalvingInterval;
    // Force block reward to zero when right shift is undefined.
    if (halvings >= 64)
        return 0;

    CAmount nSubsidy = 50 * COIN;
    // Subsidy is cut in half every 210,000 blocks which will occur approximately every 4 years.
    nSubsidy >>= halvings;
    return nSubsidy;
}
```

### Code Implementation

:::code-group
```rust
/// Calculate block subsidy based on block height.
///
/// # Arguments
///
/// * `block_height` - Current block height
///
/// # Returns
///
/// Block subsidy in BTC
fn get_block_subsidy(block_height: u64) -> f64 {
    let halvings = block_height / 210_000;
    let block_subsidy = 50.0 / (2.0_f64.powi(halvings as i32));
    block_subsidy
}
```

```python
def get_block_subsidy(block_height):
    """
    Calculate block subsidy based on block height.
    
    Args:
        block_height: Current block height
        
    Returns:
        Block subsidy in BTC
    """
    halvings = block_height // 210000
    block_subsidy = 50.0 / (2 ** halvings)
    return block_subsidy
```

```cpp
#include <cstdint>
#include <cmath>

/**
 * Calculate block subsidy based on block height.
 * 
 * @param block_height Current block height
 * @return Block subsidy in BTC
 */
double get_block_subsidy(uint64_t block_height) {
    uint64_t halvings = block_height / 210000;
    double block_subsidy = 50.0 / std::pow(2.0, static_cast<double>(halvings));
    return block_subsidy;
}
```

```javascript
/**
 * Calculate block subsidy based on block height.
 * 
 * @param {number} blockHeight - Current block height
 * @returns {number} Block subsidy in BTC
 */
function getBlockSubsidy(blockHeight) {
    const halvings = Math.floor(blockHeight / 210000);
    const blockSubsidy = 50.0 / Math.pow(2, halvings);
    return blockSubsidy;
}
```
:::

## How It Works

### Step-by-Step Calculation

1. **Calculate Halvings**: Divide block height by 210,000
   ```
   halvings = block_height / 210000
   ```

2. **Apply Exponential Decay**: Divide initial subsidy by 2^halvings
   ```
   subsidy = 50 / (2^halvings)
   ```

3. **Result**: The block subsidy in BTC

### Example Calculations

**Block 0 (Genesis Block):**
```
halvings = 0 / 210000 = 0
subsidy = 50 / (2^0) = 50 / 1 = 50 BTC
```

**Block 210,000 (First Halving):**
```
halvings = 210000 / 210000 = 1
subsidy = 50 / (2^1) = 50 / 2 = 25 BTC
```

**Block 420,000 (Second Halving):**
```
halvings = 420000 / 210000 = 2
subsidy = 50 / (2^2) = 50 / 4 = 12.5 BTC
```

**Block 630,000 (Third Halving):**
```
halvings = 630000 / 210000 = 3
subsidy = 50 / (2^3) = 50 / 8 = 6.25 BTC
```

**Block 840,000 (Fourth Halving):**
```
halvings = 840000 / 210000 = 4
subsidy = 50 / (2^4) = 50 / 16 = 3.125 BTC
```

**Block 1,050,000 (Fifth Halving):**
```
halvings = 1050000 / 210000 = 5
subsidy = 50 / (2^5) = 50 / 32 = 1.5625 BTC
```

### Total Supply Calculation

The total Bitcoin supply follows a geometric series:

```
Total Supply = 210,000 × 50 × (1 + 1/2 + 1/4 + 1/8 + ...)
             = 210,000 × 50 × 2
             = 21,000,000 BTC
```

**Key Points:**
- Each halving period creates 210,000 blocks
- Each period creates half the Bitcoin of the previous period
- The series converges to exactly 21 million BTC
- After 64 halvings, the subsidy becomes 0

## Economic Implications

### Supply Schedule

The subsidy equation creates a **predictable and decreasing supply**:

1. **Fixed Total Supply**: Exactly 21 million BTC will ever exist
2. **Exponential Decay**: Supply growth decreases exponentially
3. **Predictable**: Everyone knows the exact supply schedule
4. **No Surprises**: No sudden changes or arbitrary adjustments

### Mining Economics

**Block Reward = Block Subsidy + Transaction Fees**

- **Early Years**: Subsidy dominated (50 BTC >> fees)
- **Current Era**: Fees becoming more important (3.125 BTC + fees)
- **Future**: Fees will be primary income source (subsidy → 0)

### Inflation Rate

Bitcoin's inflation rate decreases over time:

```
Inflation Rate = (New BTC per year) / (Total BTC in circulation) × 100%

Example:
- New BTC per year: 3.125 × 6 × 24 × 365 ≈ 164,250 BTC (after 4 halvings)
- Total in circulation: ~19,700,000 BTC
- Inflation rate: ~0.83% per year
```

**Trend:**
- **Early periods**: Very high inflation (small base, high issuance)
- **Mid periods**: Moderate inflation (decreasing issuance)
- **Later periods**: Low inflation (<1% per year)
- **Future**: Eventually becomes deflationary (lower than gold)

## Key Properties

### 1. Predictability

- **Exact Formula**: No ambiguity about future supply
- **Transparent**: Anyone can calculate supply at any time
- **Unchangeable**: Requires consensus to modify (extremely unlikely)

### 2. Scarcity

- **Fixed Supply**: 21 million BTC maximum
- **Decreasing Issuance**: New supply decreases over time
- **Deflationary**: Eventually becomes deflationary (more lost than created)

### 3. Security

- **Mining Incentive**: Subsidy rewards miners for securing the network
- **Transition to Fees**: As subsidy decreases, fees become more important
- **Long-term Security**: Fee market must support network security

## Block Reward Components

### Total Block Reward

```
Total Block Reward = Block Subsidy + Transaction Fees
```

**Example:**
```
Block Subsidy: 3.125 BTC (after 4 halvings)
Transaction Fees: 0.5 BTC
Total Block Reward: 3.625 BTC
```

### Fee Percentage

As subsidy decreases, fees become a larger percentage of block rewards. The relationship follows:

- **Early halvings**: Fees are small percentage of total reward
- **Later halvings**: Fees become increasingly important
- **Future**: Fees will be primary source of miner income

## Implementation Details

### Halving Interval

- **Blocks per Halving**: 210,000 blocks
- **Time per Halving**: ~4 years (at 10 minutes per block)
- **Calculation**: 210,000 × 10 minutes = 2,100,000 minutes ≈ 4 years

### Precision

- **Initial Subsidy**: 50 BTC = 5,000,000,000 satoshis
- **After 33 Halvings**: 50 / (2^33) ≈ 0.000000006 BTC ≈ 0.6 satoshis
- **After 34 Halvings**: Effectively 0 (less than 1 satoshi)

### Edge Cases

**Block Height 0 (Genesis Block):**
- Halvings = 0
- Subsidy = 50 BTC

**Block Height Exactly at Halving:**
- Block 210,000: halvings = 1, subsidy = 25 BTC
- Block 420,000: halvings = 2, subsidy = 12.5 BTC

**Very High Block Heights:**
- After 64 halvings (block 13,440,000), subsidy = 0
- This is far in the future (~2140+)

## Visual Representation

The subsidy equation creates a **step function** that halves every 210,000 blocks:

```
Subsidy (BTC)
      │
50    │████████
25    │        ████████
12.5  │                ████████
6.25  │                        ████████
3.125 │                                ████████
1.5625│                                        ████████
      │
      └────────────────────────────────────────────────→ Blocks
       0      210k    420k    630k    840k    1050k
```

## Code Examples

### Calculate Subsidy for Any Block

:::code-group
```rust
fn calculate_subsidy(block_height: u64) -> f64 {
    let halvings = block_height / 210_000;
    if halvings >= 64 {
        return 0.0;
    }
    50.0 / 2.0_f64.powi(halvings as i32)
}

// Examples
fn main() {
    println!("{}", calculate_subsidy(0));        // 50.0
    println!("{}", calculate_subsidy(210_000));  // 25.0
    println!("{}", calculate_subsidy(840_000));  // 3.125
    println!("{}", calculate_subsidy(1_050_000)); // 1.5625
}
```

```python
def calculate_subsidy(block_height):
    """Calculate block subsidy for given height."""
    halvings = block_height // 210000
    if halvings >= 64:
        return 0
    return 50.0 / (2 ** halvings)

# Examples
print(calculate_subsidy(0))        # 50.0
print(calculate_subsidy(210000))   # 25.0
print(calculate_subsidy(840000))   # 3.125
print(calculate_subsidy(1050000))  # 1.5625
```

```cpp
#include <iostream>
#include <cstdint>
#include <cmath>

double calculate_subsidy(uint64_t block_height) {
    uint64_t halvings = block_height / 210000;
    if (halvings >= 64) {
        return 0.0;
    }
    return 50.0 / std::pow(2.0, static_cast<double>(halvings));
}

// Examples
int main() {
    std::cout << calculate_subsidy(0) << std::endl;        // 50.0
    std::cout << calculate_subsidy(210000) << std::endl;   // 25.0
    std::cout << calculate_subsidy(840000) << std::endl;   // 3.125
    std::cout << calculate_subsidy(1050000) << std::endl;  // 1.5625
    return 0;
}
```

```javascript
function calculateSubsidy(blockHeight) {
    const halvings = Math.floor(blockHeight / 210000);
    if (halvings >= 64) {
        return 0;
    }
    return 50.0 / Math.pow(2, halvings);
}

// Examples
console.log(calculateSubsidy(0));        // 50.0
console.log(calculateSubsidy(210000));   // 25.0
console.log(calculateSubsidy(840000));   // 3.125
console.log(calculateSubsidy(1050000));  // 1.5625
```
:::

### Calculate Total Supply Up to Block

:::code-group
```rust
fn total_supply_up_to_block(block_height: u64) -> f64 {
    let mut total = 0.0;
    let mut current_height: u64 = 0;
    
    while current_height <= block_height {
        let halvings = current_height / 210_000;
        if halvings >= 64 {
            break;
        }
        
        let period_start = halvings * 210_000;
        let period_end = std::cmp::min((halvings + 1) * 210_000, block_height + 1);
        let blocks_in_period = period_end - period_start;
        
        let subsidy = 50.0 / 2.0_f64.powi(halvings as i32);
        total += blocks_in_period as f64 * subsidy;
        
        current_height = period_end;
    }
    
    total
}

// Example: Total supply calculation
fn main() {
    println!("{}", total_supply_up_to_block(840_000)); // ~19,687,500 BTC
}
```

```python
def total_supply_up_to_block(block_height):
    """Calculate total Bitcoin supply up to given block height."""
    total = 0
    current_height = 0
    
    while current_height <= block_height:
        halvings = current_height // 210000
        if halvings >= 64:
            break
        
        period_start = halvings * 210000
        period_end = min((halvings + 1) * 210000, block_height + 1)
        blocks_in_period = period_end - period_start
        
        subsidy = 50.0 / (2 ** halvings)
        total += blocks_in_period * subsidy
        
        current_height = period_end
    
    return total

# Example: Total supply calculation
print(total_supply_up_to_block(840000))  # ~19,687,500 BTC
```

```cpp
#include <iostream>
#include <cstdint>
#include <cmath>
#include <algorithm>

double total_supply_up_to_block(uint64_t block_height) {
    double total = 0.0;
    uint64_t current_height = 0;
    
    while (current_height <= block_height) {
        uint64_t halvings = current_height / 210000;
        if (halvings >= 64) {
            break;
        }
        
        uint64_t period_start = halvings * 210000;
        uint64_t period_end = std::min((halvings + 1) * 210000, block_height + 1);
        uint64_t blocks_in_period = period_end - period_start;
        
        double subsidy = 50.0 / std::pow(2.0, static_cast<double>(halvings));
        total += static_cast<double>(blocks_in_period) * subsidy;
        
        current_height = period_end;
    }
    
    return total;
}

// Example: Total supply calculation
int main() {
    std::cout << total_supply_up_to_block(840000) << std::endl; // ~19,687,500 BTC
    return 0;
}
```

```javascript
function totalSupplyUpToBlock(blockHeight) {
    let total = 0;
    let currentHeight = 0;
    
    while (currentHeight <= blockHeight) {
        const halvings = Math.floor(currentHeight / 210000);
        if (halvings >= 64) {
            break;
        }
        
        const periodStart = halvings * 210000;
        const periodEnd = Math.min((halvings + 1) * 210000, blockHeight + 1);
        const blocksInPeriod = periodEnd - periodStart;
        
        const subsidy = 50.0 / Math.pow(2, halvings);
        total += blocksInPeriod * subsidy;
        
        currentHeight = periodEnd;
    }
    
    return total;
}

// Example: Total supply calculation
console.log(totalSupplyUpToBlock(840000)); // ~19,687,500 BTC
```
:::

### Find Next Halving Block

:::code-group
```rust
fn next_halving_block(current_height: u64) -> u64 {
    let current_halvings = current_height / 210_000;
    let next_halving_height = (current_halvings + 1) * 210_000;
    next_halving_height
}

// Example
fn main() {
    println!("{}", next_halving_block(850_000)); // 1050000
}
```

```python
def next_halving_block(current_height):
    """Find the next halving block height."""
    current_halvings = current_height // 210000
    next_halving_height = (current_halvings + 1) * 210000
    return next_halving_height

# Example
print(next_halving_block(850000))  # 1050000
```

```cpp
#include <iostream>
#include <cstdint>

uint64_t next_halving_block(uint64_t current_height) {
    uint64_t current_halvings = current_height / 210000;
    uint64_t next_halving_height = (current_halvings + 1) * 210000;
    return next_halving_height;
}

// Example
int main() {
    std::cout << next_halving_block(850000) << std::endl; // 1050000
    return 0;
}
```

```javascript
function nextHalvingBlock(currentHeight) {
    const currentHalvings = Math.floor(currentHeight / 210000);
    const nextHalvingHeight = (currentHalvings + 1) * 210000;
    return nextHalvingHeight;
}

// Example
console.log(nextHalvingBlock(850000)); // 1050000
```
:::

## Economic Theory

### Why This Design?

1. **Predictable Scarcity**: Creates known, decreasing supply
2. **Mining Incentive**: Rewards early adopters and miners
3. **Fee Transition**: Gradually shifts to fee-based security
4. **Deflationary**: Eventually becomes deflationary asset

### Comparison to Traditional Money

**Fiat Currency:**
- Supply controlled by central banks
- Can be increased arbitrarily
- Inflation is policy decision

**Bitcoin:**
- Supply controlled by mathematical formula
- Cannot be changed without consensus
- Inflation decreases predictably

## Security Considerations

### Mining Incentives

**Early Bitcoin:**
- High subsidy (50 BTC) attracted miners
- Security primarily from subsidy

**Current Bitcoin:**
- Moderate subsidy (3.125 BTC) + fees
- Security from both subsidy and fees

**Future Bitcoin:**
- Low/no subsidy, primarily fees
- Security must come from fee market

### Fee Market Development

As subsidy decreases, the fee market becomes critical:

1. **Transaction Demand**: More transactions = more fees
2. **Block Space Competition**: Limited space increases fees
3. **Network Security**: Fees must support mining costs

## Summary

The Bitcoin subsidy equation:

- **Formula**: `Subsidy = 50 / (2^halvings)` where `halvings = height / 210000`
- **Halving Interval**: Every 210,000 blocks (~4 years)
- **Total Supply**: Exactly 21 million BTC
- **Future**: Subsidy decreases to 0, fees become primary income
- **Economic Impact**: Creates predictable, decreasing inflation

This mathematical formula is fundamental to Bitcoin's monetary policy and ensures a fixed, predictable supply schedule that no central authority can change.

---

## Resources

- **[Bitcoin Core Source: validation.cpp](https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp)** - Subsidy calculation implementation

## References

- [Bitcoin Wiki: Controlled Supply](https://en.bitcoin.it/wiki/Controlled_supply)
