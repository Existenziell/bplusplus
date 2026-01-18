# Bitcoin Script Execution Explained

## Script Types Evolution

Bitcoin's [script](/docs/glossary#script) system has evolved over time, introducing new output types (address formats) that improve security, privacy, and efficiency. Each script type represents a different way to lock and unlock Bitcoin.

| Script Type | Full Name | Introduced | Block Height | BIP | Description |
|-------------|-----------|------------|--------------|-----|-------------|
| **P2PKH** | Pay-to-Pubkey-Hash | January 2009 | 0 (Genesis) | - | Original script type. Uses hash of public key. Addresses start with `1`. |
| **P2SH** | Pay-to-Script-Hash | April 2012 | 173,805 | [BIP 16](https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki) | Allows complex scripts to be represented by a hash. Addresses start with `3`. |
| **P2WPKH** | Pay-to-Witness-Pubkey-Hash | August 2017 | 481,824 | [BIP 141](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki) | SegWit version of P2PKH. Witness data separated from transaction. Addresses start with `bc1q`. |
| **P2WSH** | Pay-to-Witness-Script-Hash | August 2017 | 481,824 | [BIP 141](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki) | SegWit version of P2SH. For complex scripts in witness. Addresses start with `bc1q`. |
| **P2TR** | Pay-to-Taproot | November 2021 | 709,632 | [BIP 341](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki) | Taproot output type. Single signature or MAST (Merkle Abstract Syntax Tree). Addresses start with `bc1p`. |

### P2PKH (Pay-to-Pubkey-Hash)

- **Introduced**: January 3, 2009 ([Genesis Block](/docs/glossary#genesis-block))
- **Block Height**: 0
- **Address Format**: Starts with `1` (e.g., `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`) - uses [Base58](/docs/glossary#base58) encoding
- **Description**: The original Bitcoin script type. Funds are locked to a hash of the recipient's public key. The sender must provide the public key and a signature to spend.
- **Status**: Still widely used, but being gradually replaced by more efficient script types.

### P2SH (Pay-to-Script-Hash)

- **Introduced**: April 1, 2012
- **Block Height**: 173,805
- **[BIP](/docs/glossary#bip-bitcoin-improvement-proposal)**: [BIP 16](https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki)
- **Address Format**: Starts with `3` (e.g., `3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy`) - uses Base58 encoding
- **Description**: Allows complex scripts ([multisig](/docs/glossary#multisig-multi-signature), timelocks, etc.) to be represented by a single hash. The actual script is revealed only when spending. Enables multisig [wallets](/docs/glossary#wallet) and other advanced features.
- **Status**: Widely used for multisig wallets and other complex scripts.

### P2WPKH (Pay-to-Witness-Pubkey-Hash)

- **Introduced**: August 24, 2017
- **Block Height**: 481,824
- **BIP**: [BIP 141](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki) ([Segregated Witness](/docs/glossary#segwit-segregated-witness))
- **Address Format**: [Bech32](/docs/glossary#bech32), starts with `bc1q` (e.g., `bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4`)
- **Description**: SegWit version of P2PKH. [Witness](/docs/glossary#witness) data (signatures) is moved outside the [transaction](/docs/glossary#transaction), reducing transaction size and fees. Provides better scalability and fixes [transaction malleability](/docs/glossary#transaction-malleability).
- **Status**: Increasingly adopted, offers lower fees than P2PKH.

### P2WSH (Pay-to-Witness-Script-Hash)

- **Introduced**: August 24, 2017
- **Block Height**: 481,824
- **BIP**: [BIP 141](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki) (Segregated Witness)
- **Address Format**: Bech32, starts with `bc1q` (e.g., `bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3`)
- **Description**: SegWit version of P2SH. Allows complex scripts in the witness section. Used for multisig and other advanced scripts with SegWit benefits.
- **Status**: Used for SegWit-compatible multisig wallets.

### P2TR (Pay-to-Taproot)

- **Introduced**: November 14, 2021
- **Block Height**: 709,632
- **BIP**: [BIP 341](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki) ([Taproot](/docs/glossary#taproot))
- **Address Format**: Bech32m, starts with `bc1p` (e.g., `bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297`)
- **Description**: Latest script type. Can represent either a single signature or a [Merkle tree](/docs/glossary#merkle-tree) of scripts ([MAST](/docs/glossary#mast-merkle-abstract-syntax-tree)). Provides better privacy (all transactions look the same on-chain) and efficiency. Enables advanced features like [Schnorr signatures](/docs/glossary#schnorr-signature).
- **Status**: Modern standard, offering the best privacy and efficiency.

### Script Type Adoption Timeline

```
2009 ──────────────────────────────────────────────────────────────
     │ P2PKH: Original script type (Genesis Block)
     │
2012 ──────────────────────────────────────────────────────────────
     │ P2SH: Complex scripts via hash (Block 173,805)
     │
2017 ──────────────────────────────────────────────────────────────
     │ P2WPKH & P2WSH: SegWit introduces witness separation
     │ (Block 481,824)
     │
2021 ──────────────────────────────────────────────────────────────
     │ P2TR: Taproot with Schnorr signatures and MAST
     │ (Block 709,632)
```

### Key Improvements

- **P2SH**: Enabled complex scripts without revealing them until spending
- **SegWit (P2WPKH/P2WSH)**: Reduced transaction size, lower fees, fixed malleability
- **Taproot (P2TR)**: Better privacy, efficiency, and enables Schnorr signatures

---

## Understanding P2PKH Script Execution

### The P2PKH Script Pattern

The most common Bitcoin script pattern is **Pay-to-Pubkey-Hash (P2PKH)**:

**Locking Script ([scriptPubKey](/docs/glossary#scriptpubkey)):**
```
OP_DUP OP_HASH160 <pubkeyhash> OP_EQUALVERIFY OP_CHECKSIG
```

**Unlocking Script ([scriptSig](/docs/glossary#scriptsig)):**
```
<signature> <publickey>
```

### Step-by-Step Execution Flow

When someone spends a P2PKH output, the unlocking script runs **first**, then the locking script runs. They are concatenated together:

```
[<signature> <publickey>] [OP_DUP OP_HASH160 <pubkeyhash> OP_EQUALVERIFY OP_CHECKSIG]
```

Here's what happens step by step:

#### Step 1: Unlocking Script Executes
The spender provides their signature and public key:

```
Stack: []
```

**Execute:** `<signature>` (pushes signature onto stack)
```
Stack: [signature]
```

**Execute:** `<publickey>` (pushes public key onto stack)
```
Stack: [signature, publickey]
```

#### Step 2: Locking Script Executes

**Execute:** `OP_DUP`
- **What it duplicates:** The top item on the stack, which is the **public key**
- **Why:** We need to keep the original public key for signature verification later, but we also need to hash it to compare with the pubkeyhash
- **Result:**
```
Stack: [signature, publickey, publickey]
```

**Execute:** `OP_HASH160`
- Hashes the top item (the duplicated public key) with SHA-256, then RIPEMD-160
- **Result:**
```
Stack: [signature, publickey, hash160(publickey)]
```

**Execute:** `<pubkeyhash>` (OP_PUSHDATA)
- Pushes the pubkeyhash that was stored in the original output
- This is the hash of the recipient's public key
- **Result:**
```
Stack: [signature, publickey, hash160(publickey), pubkeyhash]
```

**Execute:** `OP_EQUALVERIFY`
- Compares `hash160(publickey)` with `pubkeyhash`
- If they're equal, removes both from stack and continues
- If not equal, script fails (transaction invalid)
- **Result (if equal):**
```
Stack: [signature, publickey]
```

**Execute:** `OP_CHECKSIG`
- Pops the public key (top of stack)
- Pops the signature (below public key)
- Verifies the signature is valid for this transaction using the public key
- Pushes 1 if valid, 0 if invalid
- **Result (if valid):**
```
Stack: [1]
```

### Why OP_DUP is Needed

The `OP_DUP` is crucial because:

1. **We need the public key twice:**
   - Once to hash it and compare with the stored `pubkeyhash` (proves the spender owns the key)
   - Once to verify the signature (proves the spender authorized the transaction)

2. **Without OP_DUP:**
   - If we hashed the public key first, we'd lose the original public key
   - We couldn't verify the signature because `OP_CHECKSIG` needs the actual public key, not its hash

3. **The flow:**
   ```
   publickey → OP_DUP → [publickey, publickey]
                      → Hash one copy → Compare with pubkeyhash
                      → Keep other copy → Verify signature
   ```

### Visual Summary

```
Initial Stack: []
                    ↓
Unlocking Script: <signature> <publickey>
                    ↓
Stack: [signature, publickey]
                    ↓
OP_DUP (duplicates publickey)
                    ↓
Stack: [signature, publickey, publickey]
                    ↓
OP_HASH160 (hashes top publickey)
                    ↓
Stack: [signature, publickey, hash160(publickey)]
                    ↓
OP_PUSHDATA <pubkeyhash>
                    ↓
Stack: [signature, publickey, hash160(publickey), pubkeyhash]
                    ↓
OP_EQUALVERIFY (compares hashes, removes both if equal)
                    ↓
Stack: [signature, publickey]
                    ↓
OP_CHECKSIG (verifies signature with public key)
                    ↓
Stack: [1] ✅ Transaction valid!
```

---

## Reasons to Lock Transactions

Bitcoin scripts can lock transactions for various reasons. Here are the main categories:

### 1. Time-Based Locks

#### Absolute Time Lock (OP_CHECKLOCKTIMEVERIFY / CLTV)
Locks funds until a specific block height or timestamp.

**Use Cases:**
- **Escrow:** Funds locked until a future date
- **Inheritance:** Funds accessible only after a certain time
- **Vesting:** Gradual release of funds over time
- **Dead man's switch:** Funds become accessible if owner doesn't check in

**Example:**
```
<locktime> OP_CHECKLOCKTIMEVERIFY OP_DROP <pubkey> OP_CHECKSIG
```

#### Relative Time Lock (OP_CHECKSEQUENCEVERIFY / CSV)
Locks funds for a relative time period (e.g., "can't spend until 1000 blocks after this transaction is confirmed").

**Use Cases:**
- **Payment channels:** Enforce channel closure delays
- **Replace-by-fee protection:** Prevent immediate double-spending
- **Escrow with relative timing:** Funds locked relative to transaction confirmation

**Example:**
```
<relative_locktime> OP_CHECKSEQUENCEVERIFY OP_DROP <pubkey> OP_CHECKSIG
```

### 2. Multi-Signature Locks

Requires multiple signatures to spend (e.g., 2-of-3, 3-of-5).

**Use Cases:**
- **Shared custody:** Multiple people must agree to spend
- **Corporate wallets:** Requires multiple executives to sign
- **Backup security:** One key can be stored securely offline
- **Family funds:** Requires multiple family members to agree

**Example:**
```
OP_2 <pubkey1> <pubkey2> <pubkey3> OP_3 OP_CHECKMULTISIG
```
Requires 2 valid signatures from 3 possible public keys.

### 3. Hash Preimage Locks

Requires knowledge of a secret (preimage) that hashes to a known value.

**Use Cases:**
- **Oracle-based conditions:** Oracle reveals secret when condition is met
- **Donation milestones:** Secret revealed when donation goal reached
- **Commitment schemes:** Prove knowledge of secret without revealing it
- **Atomic swaps:** Cross-chain exchanges

**Example:**
```
OP_HASH256
OP_PUSH <hash_value>
OP_EQUALVERIFY
OP_DROP
<pubkey> OP_CHECKSIG
```

### 4. Conditional Locks

Uses OP_IF/OP_ELSE to create multiple spending paths.

**Use Cases:**
- **Refund mechanisms:** One path for normal spending, another for refund
- **Escrow with conditions:** Different spending paths based on conditions
- **Time-based conditions:** Different keys for different time periods
- **Multi-party agreements:** Different parties can spend under different conditions

**Example:**
```
OP_IF
  <pubkey1> OP_CHECKSIG
OP_ELSE
  <pubkey2> OP_CHECKSIG
OP_ENDIF
```

### 5. Anyone-Can-Spend (No Lock)

Technically not a "lock" - anyone can spend by providing any data.

**Use Cases:**
- **Data storage:** Using OP_RETURN outputs
- **Burning coins:** Making funds unspendable
- **Future upgrades:** Reserved for future script types

**Example:**
```
OP_RETURN <data>
```

### 6. Complex Combined Locks

Combining multiple conditions:

**Examples:**
- **Time-locked multisig:** Requires multiple signatures AND a time lock
- **Preimage + signature:** Requires secret knowledge AND signature
- **Conditional timelock:** Different time locks for different parties

**Example:**
```
OP_IF
  <locktime> OP_CHECKLOCKTIMEVERIFY OP_DROP
  OP_2 <pubkey1> <pubkey2> <pubkey3> OP_3 OP_CHECKMULTISIG
OP_ELSE
  <pubkey4> OP_CHECKSIG
OP_ENDIF
```

### 7. Other Locking Mechanisms

#### Pay-to-Script-Hash (P2SH)
Locks funds to a script hash. The actual script is revealed when spending.

**Use Cases:**
- **Complex scripts:** Hide script complexity until spending
- **Reduced transaction size:** Script only included when spending
- **Standardization:** Enables more complex scripts in standard transactions

**Example:**
```
OP_HASH160 <scripthash> OP_EQUAL
```

#### Segregated Witness (SegWit)
Similar to P2SH but with witness data separated.

**Use Cases:**
- **Transaction malleability fix:** Prevents transaction ID changes
- **Block size efficiency:** Witness data doesn't count toward block size
- **Future upgrades:** Enables new features like Taproot

---

## Summary Table

| Lock Type | Opcode/Pattern | Use Case | Example |
|-----------|---------------|----------|---------|
| **Time Lock (Absolute)** | OP_CHECKLOCKTIMEVERIFY | Escrow, inheritance | Lock until block 6930300 |
| **Time Lock (Relative)** | OP_CHECKSEQUENCEVERIFY | Payment channels | Lock for 1000 blocks |
| **Multi-Signature** | OP_CHECKMULTISIG | Shared custody | 2-of-3 signatures required |
| **Hash Preimage** | OP_HASH256 + OP_EQUALVERIFY | Oracle conditions | Secret must be revealed |
| **Conditional** | OP_IF/OP_ELSE | Multiple paths | Different keys for different conditions |
| **P2SH** | OP_HASH160 + OP_EQUAL | Complex scripts | Script hash in output |
| **Anyone-Can-Spend** | OP_RETURN | Data storage | Burn coins, store data |

---

## Key Takeaways

1. **OP_DUP in P2PKH:** Duplicates the public key so we can both hash it (to verify ownership) and use it (to verify signature)

2. **Transaction locks serve many purposes:**
   - Security (multisig, time locks)
   - Automation (oracle-based conditions)
   - Flexibility (conditional spending paths)
   - Efficiency (P2SH, SegWit)

3. **Locks can be combined:** You can have time-locked multisig, conditional preimage locks, etc.

4. **Scripts execute when spending:** The locking script is stored with the output, but only executes when someone tries to spend it

5. **All locks are cryptographic:** They rely on mathematical properties (hashes, signatures, time) rather than trusted third parties
