# Multisig Wallets

Multi-signature (multisig) wallets require multiple signatures to spend funds. This provides enhanced security, shared custody, and flexible access control.

## What is Multisig?

A multisig wallet requires M-of-N signatures:
- **M**: Minimum number of signatures required
- **N**: Total number of possible signers
- **Example**: 2-of-3 means 2 signatures from 3 possible keys

### Common Configurations

- **2-of-2**: Two parties must both sign (partnership)
- **2-of-3**: Two of three parties must sign (backup key)
- **3-of-5**: Three of five parties must sign (corporate)
- **M-of-N**: Flexible configuration

## Multisig Script Patterns

### Legacy Multisig (P2SH)

**Script Pattern:**
```
OP_M <pubkey1> <pubkey2> ... <pubkeyN> OP_N OP_CHECKMULTISIG
```

**Example (2-of-3):**
```
OP_2 <pubkey1> <pubkey2> <pubkey3> OP_3 OP_CHECKMULTISIG
```

**Spending Script:**
```
OP_0 <sig1> <sig2>
```

**Note**: OP_0 is a bug workaround (dummy value before signatures)

### SegWit Multisig (P2WSH)

**Redeem Script:**
```
OP_2 <pubkey1> <pubkey2> <pubkey3> OP_3 OP_CHECKMULTISIG
```

**Script Hash:**
```
OP_0 <scripthash>
```

**Spending:**
- Witness: `<sig1> <sig2> <redeem_script>`
- More efficient than legacy

### Taproot Multisig (P2TR)

**Modern Approach:**
- Uses Taproot script trees
- More efficient
- Better privacy
- More complex implementation

## Creating Multisig Wallets

### Step 1: Generate Keys

Each party generates their own key:

```bash
# Generate private key
bitcoin-cli getnewaddress

# Or use external tool
# Each party keeps their private key secure
```

### Step 2: Create Multisig Address

```bash
# Create 2-of-3 multisig
bitcoin-cli createmultisig 2 \
  '["<pubkey1>", "<pubkey2>", "<pubkey3>"]'
```

Returns:
- **Address**: Multisig address to receive funds
- **Redeem Script**: Script needed to spend
- **Descriptor**: Modern descriptor format

### Step 3: Fund the Address

Send Bitcoin to the multisig address:

```bash
bitcoin-cli sendtoaddress <multisig_address> <amount>
```

## Spending from Multisig

### Step 1: Create Transaction

```bash
# Create raw transaction
bitcoin-cli createrawtransaction \
  '[{"txid":"...", "vout":0}]' \
  '{"<destination>": <amount>}'
```

### Step 2: Sign with First Key

```bash
# Sign with key 1
bitcoin-cli signrawtransactionwithkey <hex> \
  '["<privkey1>"]' \
  '[{"txid":"...", "vout":0, "scriptPubKey":"...", "redeemScript":"..."}]'
```

### Step 3: Sign with Second Key

```bash
# Sign with key 2 (using partially signed transaction)
bitcoin-cli signrawtransactionwithkey <partially_signed_hex> \
  '["<privkey2>"]' \
  '[{"txid":"...", "vout":0, "scriptPubKey":"...", "redeemScript":"..."}]'
```

### Step 4: Broadcast

```bash
# Broadcast fully signed transaction
bitcoin-cli sendrawtransaction <fully_signed_hex>
```

## Key Management

### Key Storage

**Best Practices:**
- **Distributed**: Each party stores their own key
- **Secure**: Use hardware wallets or secure storage
- **Backup**: Backup keys securely
- **Recovery**: Plan for key loss

### Key Security

**Options:**
1. **Hardware Wallets**: Most secure
2. **Paper Wallets**: Offline storage
3. **Encrypted Storage**: Encrypted files
4. **Custodial**: Third-party custody (less secure)

## Use Cases

### 1. Shared Custody

**Example**: Business partnership
- **2-of-2**: Both partners must agree
- **Use case**: Business funds
- **Benefit**: No single point of failure

### 2. Backup Security

**Example**: Personal wallet with backup
- **2-of-3**: You + Backup key + Hardware key
- **Use case**: Personal funds with backup
- **Benefit**: Can recover if one key lost

### 3. Corporate Wallets

**Example**: Company treasury
- **3-of-5**: Three executives must sign
- **Use case**: Corporate funds
- **Benefit**: Distributed control

### 4. Family Funds

**Example**: Family savings
- **2-of-4**: Two family members must agree
- **Use case**: Shared family funds
- **Benefit**: Prevents single person control

## Security Considerations

### Advantages

1. **No Single Point of Failure**: Multiple keys required
2. **Distributed Trust**: No single party controls funds
3. **Backup Options**: Can lose some keys
4. **Flexible Access**: Different M-of-N configurations

### Risks

1. **Key Loss**: If too many keys lost, funds locked
2. **Coordination**: Requires multiple parties
3. **Complexity**: More complex than single-sig
4. **Key Compromise**: If M keys compromised, funds at risk

### Best Practices

1. **Secure Key Storage**: Use hardware wallets
2. **Backup Strategy**: Plan for key loss
3. **Key Distribution**: Don't store all keys together
4. **Regular Testing**: Test spending process
5. **Documentation**: Document key locations and recovery

## Implementation Details

### Script Execution

**Multisig Script:**
```
OP_2 <pubkey1> <pubkey2> <pubkey3> OP_3 OP_CHECKMULTISIG
```

**Execution:**
1. Push M (2)
2. Push pubkeys (3)
3. Push N (3)
4. OP_CHECKMULTISIG:
   - Pops N, then N pubkeys
   - Pops M, then M signatures
   - Verifies M signatures match M of N pubkeys
   - Returns 1 if valid, 0 if invalid

### Transaction Size

**Multisig Transactions:**
- **Larger**: More signatures = larger transaction
- **2-of-3 P2SH**: ~250-300 bytes
- **2-of-3 P2WSH**: ~200-250 bytes (witness)
- **Fees**: Higher fees due to size

## Common Issues

### Insufficient Signatures

**Problem**: Not enough signatures to spend

**Solution**:
- Collect required number of signatures
- Ensure all signers are available
- Use backup keys if needed

### Key Loss

**Problem**: Too many keys lost

**Solution**:
- Use remaining keys (if M still available)
- If M keys lost, funds are locked
- Plan for key recovery

### Coordination Challenges

**Problem**: Difficult to coordinate multiple signers

**Solution**:
- Use signing services
- Batch transactions
- Plan signing sessions
- Use hardware wallets for convenience

## Summary

Multisig wallets provide:

- **Enhanced Security**: Multiple keys required
- **Shared Custody**: Distributed control
- **Backup Options**: Can lose some keys
- **Flexible Access**: Various M-of-N configurations
- **Corporate Use**: Suitable for organizations

Understanding multisig is essential for building secure Bitcoin wallets and managing funds with multiple parties.
