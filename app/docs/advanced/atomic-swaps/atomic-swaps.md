# Atomic Swaps

Atomic swaps enable trustless peer-to-peer exchange of cryptocurrencies across different blockchains without requiring a trusted third party or centralized exchange.

**Atomic swaps** use hash time-locked contracts (HTLCs) to ensure that either both parties receive their funds or neither does:

```text
Atomic Swap:
- Alice wants to trade BTC for LTC
- Bob wants to trade LTC for BTC
- Either both succeed or both fail
- No trusted intermediary needed
```

---

## How Atomic Swaps Work

### Process

```text
1. Alice creates HTLC on Bitcoin chain
   - Locks BTC with hash lock
   - Time lock for refund

2. Bob creates HTLC on Litecoin chain
   - Locks LTC with same hash
   - Shorter time lock

3. Alice reveals secret (preimage)
   - Claims LTC from Bob's HTLC
   - Reveals hash to Bob

4. Bob uses secret to claim BTC
   - Claims BTC from Alice's HTLC
   - Swap complete
```

### Safety

```text
If Alice doesn't reveal:
- Bob's HTLC expires
- Bob gets LTC back
- Alice's HTLC expires
- Alice gets BTC back

If Bob doesn't create HTLC:
- Alice's HTLC expires
- Alice gets BTC back
- No loss for Alice
```

---

## Code Examples

### Creating HTLC

:::code-group
```rust
use bitcoin::{Script, ScriptBuf};
use bitcoin::opcodes::all::*;

fn create_htlc_script(
    hash: &[u8; 32],
    recipient_pubkey: &[u8; 33],
    refund_pubkey: &[u8; 33],
    locktime: u32,
) -> ScriptBuf {
    let mut script = ScriptBuf::new();
    
    // Hash lock branch
    script.push_opcode(OP_IF);
    script.push_opcode(OP_HASH256);
    script.push_slice(hash);
    script.push_opcode(OP_EQUALVERIFY);
    script.push_slice(recipient_pubkey);
    script.push_opcode(OP_CHECKSIG);
    
    // Refund branch
    script.push_opcode(OP_ELSE);
    script.push_slice(locktime.to_le_bytes());
    script.push_opcode(OP_CHECKLOCKTIMEVERIFY);
    script.push_opcode(OP_DROP);
    script.push_slice(refund_pubkey);
    script.push_opcode(OP_CHECKSIG);
    script.push_opcode(OP_ENDIF);
    
    script
}
```

```python
from bitcoin.core.script import CScript, OP_IF, OP_HASH256, OP_EQUALVERIFY
from bitcoin.core.script import OP_CHECKSIG, OP_ELSE, OP_CHECKLOCKTIMEVERIFY
from bitcoin.core.script import OP_DROP, OP_ENDIF

def create_htlc_script(hash_value, recipient_pubkey, refund_pubkey, locktime):
    """Create HTLC script for atomic swap."""
    return CScript([
        OP_IF,
        OP_HASH256,
        hash_value,
        OP_EQUALVERIFY,
        recipient_pubkey,
        OP_CHECKSIG,
        OP_ELSE,
        locktime,
        OP_CHECKLOCKTIMEVERIFY,
        OP_DROP,
        refund_pubkey,
        OP_CHECKSIG,
        OP_ENDIF,
    ])
```

```cpp
#include <bitcoin/bitcoin.hpp>

bc::script create_htlc_script(
    const bc::hash_digest& hash,
    const bc::ec_compressed& recipient_pubkey,
    const bc::ec_compressed& refund_pubkey,
    uint32_t locktime
) {
    bc::script script;
    script.push_operation(bc::opcode::if_);
    script.push_operation(bc::opcode::hash256);
    script.push_data(bc::to_chunk(hash));
    script.push_operation(bc::opcode::equalverify);
    script.push_data(bc::to_chunk(recipient_pubkey));
    script.push_operation(bc::opcode::checksig);
    script.push_operation(bc::opcode::else_);
    script.push_data(bc::to_chunk(locktime));
    script.push_operation(bc::opcode::checklocktimeverify);
    script.push_operation(bc::opcode::drop);
    script.push_data(bc::to_chunk(refund_pubkey));
    script.push_operation(bc::opcode::checksig);
    script.push_operation(bc::opcode::endif);
    return script;
}
```

```go
package main

import (
	"github.com/btcsuite/btcd/txscript"
)

func createHTLCScript(
	hash []byte,
	recipientPubkey []byte,
	refundPubkey []byte,
	locktime uint32,
) ([]byte, error) {
	builder := txscript.NewScriptBuilder()
	
	// Hash lock branch
	builder.AddOp(txscript.OP_IF)
	builder.AddOp(txscript.OP_HASH256)
	builder.AddData(hash)
	builder.AddOp(txscript.OP_EQUALVERIFY)
	builder.AddData(recipientPubkey)
	builder.AddOp(txscript.OP_CHECKSIG)
	
	// Refund branch
	builder.AddOp(txscript.OP_ELSE)
	builder.AddInt64(int64(locktime))
	builder.AddOp(txscript.OP_CHECKLOCKTIMEVERIFY)
	builder.AddOp(txscript.OP_DROP)
	builder.AddData(refundPubkey)
	builder.AddOp(txscript.OP_CHECKSIG)
	builder.AddOp(txscript.OP_ENDIF)
	
	return builder.Script()
}
```

```javascript
const bitcoin = require('bitcoinjs-lib');

function createHTLCScript(hash, recipientPubkey, refundPubkey, locktime) {
    return bitcoin.script.compile([
        bitcoin.opcodes.OP_IF,
        bitcoin.opcodes.OP_HASH256,
        hash,
        bitcoin.opcodes.OP_EQUALVERIFY,
        recipientPubkey,
        bitcoin.opcodes.OP_CHECKSIG,
        bitcoin.opcodes.OP_ELSE,
        bitcoin.script.number.encode(locktime),
        bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY,
        bitcoin.opcodes.OP_DROP,
        refundPubkey,
        bitcoin.opcodes.OP_CHECKSIG,
        bitcoin.opcodes.OP_ENDIF,
    ]);
}
```
:::

---

## Lightning Network Swaps

Atomic swaps can also work on Lightning Network:

```text
Lightning Atomic Swap:
- Swap between Lightning channels
- Instant execution
- Lower fees
- Requires channel liquidity
```

---

## Limitations

### Requirements

1. **Compatible blockchains**: Both must support HTLCs
2. **Hash function compatibility**: Same hash function
3. **Timing coordination**: Time locks must be coordinated
4. **Liquidity**: Both parties need funds available

### Challenges

- **Complexity**: Requires technical knowledge
- **Timing**: Time locks must be carefully set
- **Liquidity**: Both chains need funds
- **Adoption**: Limited user-friendly tools

---

## Related Topics

- [HTLCs](/docs/lightning/routing#what-is-an-htlc) - Hash time-locked contracts
- [Timelocks](/docs/bitcoin/timelocks) - Time-based conditions
- [Lightning Network](/docs/lightning) - Off-chain swaps

---

## Resources

- [Atomic Swaps](https://en.bitcoin.it/wiki/Atomic_swap)
