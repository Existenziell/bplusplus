# Coin Selection Algorithms

## Overview

[Coin selection](/docs/glossary#coin-selection) is the process of choosing which [UTXOs](/docs/glossary#utxo-unspent-transaction-output) (Unspent Transaction Outputs) to spend when creating a Bitcoin [transaction](/docs/glossary#transaction). This is a critical [wallet](/docs/glossary#wallet) function that affects [transaction fees](/docs/glossary#transaction-fee), privacy, and efficiency.

## The Challenge

Given:
- A set of available UTXOs
- A payment amount to send
- A target fee rate

Select UTXOs such that:
- Total input value > total output value
- Fee rate >= required minimum fee rate
- Transaction is valid and efficient

## Transaction Requirements

### Basic Structure

```
Transaction:
  Inputs: Selected UTXOs
  Outputs:
    - Payment output (destination + amount)
    - Change output (optional, back to wallet)
  Fee: Inputs - Outputs
```

### Fee Rate Calculation

```
Fee Rate = (Total Input Value - Total Output Value) / Virtual Transaction Size
```

**[Virtual Transaction Size (vBytes)](/docs/glossary#vbyte-virtual-byte):**
- Defined in [BIP](/docs/glossary#bip-bitcoin-improvement-proposal) 141 ([SegWit](/docs/glossary#segwit-segregated-witness))
- [Weight units](/docs/glossary#weight-units) / 4
- Accounts for [witness](/docs/glossary#witness) data differently

## UTXO Characteristics

### Different Script Types

[UTXOs](/docs/glossary#utxo-unspent-transaction-output) can have different [script](/docs/glossary#script) types, affecting [transaction](/docs/glossary#transaction) size:

1. **[P2PKH](/docs/glossary#p2pkh-pay-to-pubkey-hash) (Legacy)**: ~148 bytes per input
2. **[P2SH](/docs/glossary#p2sh-pay-to-script-hash)**: ~91 bytes per input
3. **[P2WPKH](/docs/glossary#p2wpkh-pay-to-witness-pubkey-hash) ([SegWit](/docs/glossary#segwit-segregated-witness) v0)**: ~68 bytes per input
4. **[P2TR](/docs/glossary#p2tr-pay-to-taproot) ([Taproot](/docs/glossary#taproot))**: ~58 bytes per input

### Example UTXOs

```
UTXO 1: P2WPKH, 1.5 BTC
UTXO 2: P2TR, 0.8 BTC
UTXO 3: P2PKH, 0.3 BTC
```

**Transaction Size Impact:**
- Using UTXO 1: Smaller transaction (SegWit)
- Using UTXO 3: Larger transaction (Legacy)
- Same fee rate = different absolute fees

## Coin Selection Strategies

### 1. Largest First (Greedy)

**Algorithm:**
1. Sort UTXOs by value (largest first)
2. Select UTXOs until sum >= payment + estimated fee
3. Create change output if needed

**Pros:**
- Simple to implement
- Minimizes number of inputs
- Fast execution

**Cons:**
- May overpay fees
- Poor privacy (uses largest UTXOs)
- May create dust change

### 2. Smallest First

**Algorithm:**
1. Sort UTXOs by value (smallest first)
2. Select UTXOs until sum >= payment + estimated fee
3. Create change output if needed

**Pros:**
- Consolidates small UTXOs
- Better privacy (uses smaller UTXOs)
- Cleans up wallet

**Cons:**
- More inputs = larger transaction
- Higher fees for many inputs
- Slower (more inputs to sign)

### 3. Exact Match

**Algorithm:**
1. Look for UTXO that exactly matches payment + fee
2. If found, use it
3. Otherwise, fall back to other strategy

**Pros:**
- No change output needed
- Optimal for specific cases
- Clean transaction

**Cons:**
- Rarely finds exact match
- Usually requires fallback

### 4. Branch and Bound

**Algorithm:**
1. Try all combinations of UTXOs
2. Find combination that minimizes:
   - Transaction size
   - Change amount
   - Number of inputs
3. Select optimal combination

**Pros:**
- Optimal solution
- Minimizes fees
- Best privacy

**Cons:**
- Computationally expensive
- Slow for many UTXOs
- May not be practical

### 5. Random Selection

**Algorithm:**
1. Randomly select UTXOs
2. Continue until sum >= payment + fee
3. Create change if needed

**Pros:**
- Good privacy
- Unpredictable pattern
- Simple implementation

**Cons:**
- May not be optimal
- Could select inefficient combination

## Fee Calculation

### Estimating Transaction Size

**Base Size:**
- Transaction header: 10 bytes
- Input count: 1-9 bytes (varint)
- Output count: 1-9 bytes (varint)

**Input Size:**
- Previous output: 36 bytes
- Script length: 1-9 bytes (varint)
- Script: Variable (depends on script type)
- Sequence: 4 bytes

**Output Size:**
- Value: 8 bytes
- Script length: 1-9 bytes (varint)
- Script: Variable (typically 22-34 bytes)

**Witness Size (SegWit):**
- Witness data: Variable
- Counted differently in weight calculation

### Virtual Size Calculation

```
Weight = (Base Size × 3) + Total Size
Virtual Size = Weight / 4
```

### Fee Calculation Example

```
Payment: 1.0 BTC
Fee Rate: 1 sat/vB

Selected UTXOs:
  - UTXO 1 (P2WPKH): 1.2 BTC
  - UTXO 2 (P2TR): 0.5 BTC

Transaction Size: 250 vBytes
Fee: 250 sats
Change: 1.7 - 1.0 - 0.0000025 = 0.6999975 BTC
```

## Change Output Creation

### When to Create Change

Create change output if:
- Selected UTXOs > Payment + Fee + Dust Threshold
- Change amount > dust threshold (typically 546 sats)

### Dust Threshold

Dust outputs are uneconomical to spend:
- **Standard**: 546 sats
- **Rationale**: Fee to spend would exceed value
- **Policy**: Many nodes reject dust outputs

### Change Output Optimization

**Options:**
1. **Create change**: If amount > dust threshold
2. **Donate to miner**: If amount < dust threshold
3. **Increase payment**: If change would be dust

## Implementation Considerations

### Iterative Approach

1. **Estimate fee**: Based on initial UTXO selection
2. **Select UTXOs**: Using chosen strategy
3. **Calculate actual fee**: Based on actual transaction size
4. **Adjust if needed**: If fee doesn't meet target

### Fee Rate Targets

**Common Fee Rates:**
- **Low priority**: 1-5 sat/vB
- **Medium priority**: 5-10 sat/vB
- **High priority**: 10-50 sat/vB
- **Urgent**: 50+ sat/vB

### Validation

Before finalizing transaction:
1. **Verify inputs**: Ensure UTXOs are still unspent
2. **Check balance**: Ensure sufficient funds
3. **Validate fee**: Ensure fee rate meets target
4. **Check size**: Ensure transaction is valid size

## Best Practices

### For Wallet Developers

1. **Use SegWit**: Prefer SegWit UTXOs (smaller size)
2. **Minimize inputs**: Fewer inputs = smaller transaction
3. **Optimize change**: Avoid dust change outputs
4. **Privacy**: Consider privacy implications
5. **Fee estimation**: Accurate fee estimation is critical

### For Users

1. **Consolidate UTXOs**: Periodically consolidate small UTXOs
2. **Use SegWit**: Prefer SegWit addresses
3. **Monitor fees**: Be aware of current fee rates
4. **Batch payments**: Combine multiple payments when possible

## Common Issues

### Insufficient Funds

**Problem**: Selected UTXOs don't cover payment + fee

**Solution**:
- Select more UTXOs
- Reduce payment amount
- Wait for more funds

### Fee Too Low

**Problem**: Calculated fee rate below target

**Solution**:
- Select fewer UTXOs (if possible)
- Increase fee manually
- Use higher fee rate

### Dust Change

**Problem**: Change output would be dust

**Solution**:
- Donate to miner (include in fee)
- Increase payment amount
- Select different UTXOs

## Summary

Coin selection is a critical wallet function:

- **Multiple strategies**: Different approaches for different goals
- **Fee optimization**: Balance between fees and efficiency
- **Privacy considerations**: UTXO selection affects privacy
- **Transaction sizing**: Different script types affect size
- **Change management**: Handle change outputs appropriately

Understanding coin selection helps build efficient and user-friendly Bitcoin wallets.
