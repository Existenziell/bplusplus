# Bitcoin Transaction Creation

## Overview

Creating Bitcoin transactions programmatically involves selecting inputs, creating outputs, calculating fees, signing, and broadcasting. This guide covers the complete process.

## Transaction Structure

### Basic Components

```
Transaction:
  Version: 4 bytes
  Input Count: VarInt
  Inputs: Array of inputs
  Output Count: VarInt
  Outputs: Array of outputs
  Locktime: 4 bytes
  Witness: (if SegWit)
```

### Input Structure

```
Input:
  Previous TXID: 32 bytes
  Previous Output Index: 4 bytes
  Script Length: VarInt
  Script: Variable
  Sequence: 4 bytes
```

### Output Structure

```
Output:
  Value: 8 bytes (satoshis)
  Script Length: VarInt
  Script: Variable (typically 22-34 bytes)
```

## Step-by-Step Process

### Step 1: Select UTXOs

Choose which UTXOs to spend:

```bash
# List available UTXOs
bitcoin-cli listunspent

# Select UTXOs (coin selection algorithm)
# Total value >= payment + fee
```

### Step 2: Create Raw Transaction

```bash
# Create transaction
bitcoin-cli createrawtransaction \
  '[{"txid":"abc123...", "vout":0}]' \
  '{"<destination_address>": 0.001}'
```

**Parameters:**
- **Inputs**: Array of UTXOs to spend
- **Outputs**: Destination address and amount

### Step 3: Sign Transaction

```bash
# Sign transaction
bitcoin-cli signrawtransactionwithwallet <hex>
```

**For Multisig:**
```bash
# Sign with specific key
bitcoin-cli signrawtransactionwithkey <hex> \
  '["<private_key>"]' \
  '[{"txid":"...", "vout":0, "scriptPubKey":"...", "redeemScript":"..."}]'
```

### Step 4: Broadcast Transaction

```bash
# Broadcast to network
bitcoin-cli sendrawtransaction <signed_hex>
```

## Fee Calculation

### Estimating Transaction Size

**Base Transaction:**
- Version: 4 bytes
- Input count: 1-9 bytes
- Output count: 1-9 bytes
- Locktime: 4 bytes

**Per Input:**
- Previous output: 36 bytes
- Script length: 1-9 bytes
- Script: Variable (depends on script type)
- Sequence: 4 bytes

**Per Output:**
- Value: 8 bytes
- Script length: 1-9 bytes
- Script: Variable (typically 22-34 bytes)

### Virtual Size (SegWit)

```
Weight = (Base Size × 3) + Total Size
Virtual Size = Weight / 4
```

### Fee Calculation

```
Fee = Transaction Size (vBytes) × Fee Rate (sat/vB)
```

**Example:**
```
Transaction Size: 250 vBytes
Fee Rate: 10 sat/vB
Fee: 2,500 sats
```

## Change Outputs

### When to Create Change

Create change output if:
- Input value > Payment + Fee + Dust Threshold
- Change amount > Dust threshold (546 sats)

### Change Output Creation

```bash
# Include change output
bitcoin-cli createrawtransaction \
  '[{"txid":"...", "vout":0}]' \
  '{"<destination>": 0.001, "<change_address>": 0.0005}'
```

## Signing Process

### Single Signature

**P2PKH:**
```
Script: <signature> <public_key>
```

**P2WPKH:**
```
Witness: <signature> <public_key>
```

### Multisig Signing

**Process:**
1. Create transaction
2. Sign with first key
3. Sign with second key (using partially signed tx)
4. Continue until M signatures collected
5. Broadcast fully signed transaction

## Transaction Validation

### Before Broadcasting

1. **Check Inputs**: Verify UTXOs are still unspent
2. **Verify Balance**: Ensure sufficient funds
3. **Validate Fee**: Check fee meets minimum
4. **Check Size**: Ensure transaction is valid size
5. **Verify Signatures**: All signatures valid

### Common Validation Errors

- **Insufficient funds**: Not enough input value
- **Invalid signature**: Signature doesn't match
- **Double spend**: UTXO already spent
- **Dust output**: Output below dust threshold
- **Fee too low**: Fee below minimum

## Best Practices

### For Developers

1. **Fee Estimation**: Accurate fee estimation is critical
2. **UTXO Management**: Efficient coin selection
3. **Error Handling**: Handle all error cases
4. **Validation**: Validate before broadcasting
5. **Testing**: Test on testnet first

### For Users

1. **Verify Address**: Double-check destination address
2. **Check Fee**: Ensure reasonable fee
3. **Wait for Confirmation**: Don't assume immediate confirmation
4. **Backup**: Backup transaction if needed
5. **Monitor**: Track transaction status

## Common Issues

### Transaction Stuck

**Problem**: Transaction not confirming

**Solutions:**
- Wait for confirmation
- Use Replace-by-Fee (RBF) if enabled
- Increase fee (if possible)
- Wait for mempool to clear

### Insufficient Fee

**Problem**: Fee too low, transaction rejected

**Solutions:**
- Increase fee rate
- Use higher priority
- Wait for lower network activity

### Invalid Transaction

**Problem**: Transaction rejected by network

**Causes:**
- Invalid signature
- Double spend
- Dust output
- Invalid script

**Solution**: Fix issue and recreate transaction

## Advanced Topics

### Replace-by-Fee (RBF)

**Enable RBF:**
```bash
# Set sequence to enable RBF
# Sequence < 0xFFFFFFFF - 1
```

**Replace Transaction:**
```bash
# Create replacement with higher fee
bitcoin-cli createrawtransaction ... --replaceable
```

### Partially Signed Bitcoin Transactions (PSBT)

**Create PSBT:**
```bash
bitcoin-cli walletcreatefundedpsbt \
  '[]' \
  '[{"<address>": <amount>}]'
```

**Sign PSBT:**
```bash
bitcoin-cli walletprocesspsbt <psbt>
```

**Finalize PSBT:**
```bash
bitcoin-cli finalizepsbt <psbt>
```

## Summary

Transaction creation involves:

- **UTXO Selection**: Choose inputs to spend
- **Output Creation**: Create payment and change outputs
- **Fee Calculation**: Calculate appropriate fees
- **Signing**: Sign with private keys
- **Broadcasting**: Send to network
- **Validation**: Verify transaction is valid

Understanding transaction creation is essential for building Bitcoin wallets and applications.
