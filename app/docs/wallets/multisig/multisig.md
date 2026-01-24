# Multisig

Multi-signature (multisig) wallets require multiple signatures to spend funds. This provides enhanced security, shared custody, and flexible access control. A multisig wallet requires M-of-N signatures:

- **M**: Minimum number of signatures required
- **N**: Total number of possible signers
- **Example**: 2-of-3 means 2 signatures from 3 possible keys

Common configurations: **2-of-2** (two parties must both sign, e.g. partnership), **2-of-3** (two of three parties must sign, e.g. backup key), **3-of-5** (three of five, e.g. corporate), or flexible **M-of-N**.

---

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

---

## Creating Multisig Wallets

### Using Bitcoin Core

```bash
# Step 1: Generate keys (each party does this)
bitcoin-cli getnewaddress

# Step 2: Create 2-of-3 multisig address
bitcoin-cli createmultisig 2 \
  '["<pubkey1>", "<pubkey2>", "<pubkey3>"]'

# Step 3: Fund the multisig address
bitcoin-cli sendtoaddress <multisig_address> <amount>
```

The `createmultisig` command returns:
- **Address**: Multisig address to receive funds
- **Redeem Script**: Script needed to spend
- **Descriptor**: Modern descriptor format

### Programmatic Multisig Creation

:::code-group
```rust
use bitcoin::{
    secp256k1::{Secp256k1, rand::rngs::OsRng},
    Address, Network, PublicKey, Script,
    blockdata::script::Builder,
    blockdata::opcodes::all::*,
};
use bitcoin::hashes::{sha256, Hash};

fn create_multisig_address(
    required: usize,
    pubkeys: &[PublicKey],
    network: Network
) -> Address {
    let secp = Secp256k1::new();
    
    // Build the redeem script: OP_M <pubkeys...> OP_N OP_CHECKMULTISIG
    let mut builder = Builder::new()
        .push_int(required as i64);
    
    for pubkey in pubkeys {
        builder = builder.push_key(pubkey);
    }
    
    let redeem_script = builder
        .push_int(pubkeys.len() as i64)
        .push_opcode(OP_CHECKMULTISIG)
        .into_script();
    
    // Create P2WSH address (SegWit multisig)
    Address::p2wsh(&redeem_script, network)
}

fn main() {
    let secp = Secp256k1::new();
    
    // Generate 3 key pairs
    let mut pubkeys = Vec::new();
    for _ in 0..3 {
        let (_, public_key) = secp.generate_keypair(&mut OsRng);
        pubkeys.push(PublicKey::new(public_key));
    }
    
    // Create 2-of-3 multisig address
    let address = create_multisig_address(2, &pubkeys, Network::Bitcoin);
    println!("Multisig Address: {}", address);
}
```

```python
import hashlib
from ecdsa import SECP256k1, SigningKey

def create_multisig_script(required: int, pubkeys: list[bytes]) -> bytes:
    """Create a multisig redeem script.
    
    Args:
        required: Number of signatures required (M)
        pubkeys: List of compressed public keys (N keys)
    
    Returns:
        Redeem script bytes
    """
    n = len(pubkeys)
    
    # Build script: OP_M <pubkeys> OP_N OP_CHECKMULTISIG
    script = bytes([0x50 + required])  # OP_M (OP_1 = 0x51, etc.)
    
    for pubkey in pubkeys:
        script += bytes([len(pubkey)]) + pubkey  # Push pubkey
    
    script += bytes([0x50 + n])  # OP_N
    script += bytes([0xae])      # OP_CHECKMULTISIG
    
    return script

def script_to_p2wsh_address(script: bytes, mainnet: bool = True) -> str:
    """Convert redeem script to P2WSH address."""
    import bech32
    
    # SHA256 of the script
    script_hash = hashlib.sha256(script).digest()
    
    # Witness version 0 + 32-byte script hash
    hrp = "bc" if mainnet else "tb"
    witness_program = [0] + list(script_hash)
    
    # Convert to 5-bit groups for bech32
    converted = bech32.convertbits(witness_program, 8, 5)
    return bech32.bech32_encode(hrp, converted)

# Generate 3 key pairs
private_keys = []
public_keys = []

for _ in range(3):
    sk = SigningKey.generate(curve=SECP256k1)
    vk = sk.get_verifying_key()
    
    # Compressed public key (33 bytes)
    x = vk.point.x()
    y = vk.point.y()
    prefix = b'\x02' if y % 2 == 0 else b'\x03'
    pubkey = prefix + x.to_bytes(32, 'big')
    
    private_keys.append(sk)
    public_keys.append(pubkey)

# Create 2-of-3 multisig
redeem_script = create_multisig_script(2, public_keys)
address = script_to_p2wsh_address(redeem_script)
print(f"Multisig Address: {address}")
```

```cpp
#include <bitcoin/bitcoin.hpp>
#include <iostream>
#include <vector>

bc::chain::script create_multisig_script(
    uint8_t required,
    const std::vector<bc::ec_compressed>& pubkeys
) {
    bc::machine::operation::list ops;
    
    // OP_M
    ops.push_back(bc::machine::operation(
        static_cast<bc::machine::opcode>(0x50 + required)));
    
    // Push each public key
    for (const auto& pubkey : pubkeys) {
        ops.push_back(bc::machine::operation(bc::to_chunk(pubkey)));
    }
    
    // OP_N
    ops.push_back(bc::machine::operation(
        static_cast<bc::machine::opcode>(0x50 + pubkeys.size())));
    
    // OP_CHECKMULTISIG
    ops.push_back(bc::machine::operation(bc::machine::opcode::checkmultisig));
    
    return bc::chain::script(ops);
}

int main() {
    std::vector<bc::ec_compressed> pubkeys;
    std::vector<bc::ec_secret> secrets;
    
    // Generate 3 key pairs
    for (int i = 0; i < 3; ++i) {
        bc::data_chunk seed(32);
        bc::pseudo_random_fill(seed);
        
        bc::ec_secret secret;
        std::copy(seed.begin(), seed.end(), secret.begin());
        secrets.push_back(secret);
        
        bc::ec_compressed pubkey;
        bc::secret_to_public(pubkey, secret);
        pubkeys.push_back(pubkey);
    }
    
    // Create 2-of-3 multisig redeem script
    auto redeem_script = create_multisig_script(2, pubkeys);
    
    // Create P2WSH address
    bc::short_hash script_hash = bc::sha256_hash(redeem_script.to_data(false));
    bc::wallet::payment_address address(script_hash, 
        bc::wallet::payment_address::mainnet_p2sh);
    
    std::cout << "Multisig Address: " << address.encoded() << std::endl;
    
    return 0;
}
```

```go
package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"sort"

	"github.com/btcsuite/btcd/btcec/v2"
	"github.com/btcsuite/btcd/btcutil"
	"github.com/btcsuite/btcd/chaincfg"
	"github.com/btcsuite/btcd/txscript"
)

func createMultisigAddress(required int, pubkeys [][]byte, network *chaincfg.Params) (string, []byte, error) {
	// Sort pubkeys (BIP67 compliance)
	sort.Slice(pubkeys, func(i, j int) bool {
		return hex.EncodeToString(pubkeys[i]) < hex.EncodeToString(pubkeys[j])
	})

	// Build the redeem script: OP_M <pubkeys> OP_N OP_CHECKMULTISIG
	builder := txscript.NewScriptBuilder()
	builder.AddInt64(int64(required))
	for _, pubkey := range pubkeys {
		builder.AddData(pubkey)
	}
	builder.AddInt64(int64(len(pubkeys)))
	builder.AddOp(txscript.OP_CHECKMULTISIG)
	redeemScript, err := builder.Script()
	if err != nil {
		return "", nil, err
	}

	// Create P2WSH address
	scriptHash := sha256.Sum256(redeemScript)
	addr, err := btcutil.NewAddressWitnessScriptHash(scriptHash[:], network)
	if err != nil {
		return "", nil, err
	}

	return addr.EncodeAddress(), redeemScript, nil
}

func main() {
	// Generate 3 key pairs (simplified - in real code you'd generate actual keys)
	pubkeys := make([][]byte, 3)
	// ... generate pubkeys ...

	// Create 2-of-3 multisig
	addr, redeemScript, err := createMultisigAddress(2, pubkeys, &chaincfg.MainNetParams)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Multisig Address: %s\n", addr)
	fmt.Printf("Redeem Script: %s\n", hex.EncodeToString(redeemScript))
}
```

```javascript
const bitcoin = require('bitcoinjs-lib');
const { ECPairFactory } = require('ecpair');
const ecc = require('tiny-secp256k1');

const ECPair = ECPairFactory(ecc);

function createMultisigAddress(required, pubkeys, network = bitcoin.networks.bitcoin) {
    // Create the P2MS (pay-to-multisig) redeem script
    const p2ms = bitcoin.payments.p2ms({
        m: required,
        pubkeys: pubkeys,
        network: network
    });
    
    // Wrap in P2WSH for SegWit multisig
    const p2wsh = bitcoin.payments.p2wsh({
        redeem: p2ms,
        network: network
    });
    
    return {
        address: p2wsh.address,
        redeemScript: p2ms.output,
        witnessScript: p2wsh.redeem.output
    };
}

// Generate 3 key pairs
const keyPairs = [];
const pubkeys = [];

for (let i = 0; i < 3; i++) {
    const keyPair = ECPair.makeRandom();
    keyPairs.push(keyPair);
    pubkeys.push(keyPair.publicKey);
}

// Sort pubkeys (BIP67 compliance)
pubkeys.sort(Buffer.compare);

// Create 2-of-3 multisig
const multisig = createMultisigAddress(2, pubkeys);
console.log('Multisig Address:', multisig.address);
console.log('Redeem Script:', multisig.redeemScript.toString('hex'));
```
:::

---

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

---

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

---

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

---

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

---

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

---

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

---

## Summary

Multisig wallets provide:

- **Enhanced Security**: Multiple keys required
- **Shared Custody**: Distributed control
- **Backup Options**: Can lose some keys
- **Flexible Access**: Various M-of-N configurations
- **Corporate Use**: Suitable for organizations

Understanding multisig is essential for building secure Bitcoin wallets and managing funds with multiple parties.

---

## Related Topics

- [What is a Wallet?](/docs/wallets) - Introduction to Bitcoin wallets
- [Transaction Creation](/docs/wallets/transactions) - How to create and sign transactions
- [PSBT](/docs/bitcoin-development/psbt) - Partially Signed Bitcoin Transactions for multisig coordination
- [Bitcoin Script](/docs/bitcoin/script) - Understanding the scripting system behind multisig
