# Lightning Payment Channels

Payment channels are the fundamental building block of the Lightning Network. They enable off-chain transactions between two parties with on-chain settlement.

## What is a Payment Channel?

A payment channel is a 2-of-2 [multisig](/docs/glossary#multisig-multi-signature) address that locks Bitcoin between two parties. The parties can update the channel balance off-chain without broadcasting to the Bitcoin network.

### Key Properties

- **2-of-2 Multisig**: Both parties must sign to spend
- **Off-Chain Updates**: Balance changes happen instantly without blockchain transactions
- **On-Chain Settlement**: Final state broadcast to Bitcoin when closing
- **Bidirectional**: Payments can flow in both directions

## Channel Lifecycle

### 1. Channel Opening

**Funding Transaction:**
- Creates 2-of-2 multisig output
- Locks Bitcoin from one or both parties
- Broadcast to Bitcoin network
- Wait for confirmation (typically 3-6 blocks)

```text
Opening Process:
1. Alice and Bob agree to open channel
2. Create funding transaction (2-of-2 multisig)
3. Exchange initial commitment transactions
4. Broadcast funding transaction
5. Wait for confirmation
6. Channel becomes active
```

### 2. Channel Active

**Off-Chain Updates:**
- Parties exchange signed [commitment transactions](/docs/glossary#commitment-transaction)
- Each update reflects new balance distribution
- No blockchain transaction needed
- Instant and free

```text
Update Process:
1. Alice wants to send 10,000 sats to Bob
2. Create new commitment transaction:
   - Old: Alice 50,000, Bob 50,000
   - New: Alice 40,000, Bob 60,000
3. Exchange signatures on new commitments
4. Exchange revocation secrets for old state
5. Balance updated (off-chain)
```

### 3. Channel Closing

**Closing Options:**

| Type | Description | Speed | Cost |
|------|-------------|-------|------|
| Cooperative | Both parties agree | Fast | Low |
| Force Close | Unilateral broadcast | Slow (timelock) | Higher |
| Breach/Penalty | Punish cheating attempt | Varies | Attacker loses all |

## Commitment Transactions

Each commitment transaction represents the current channel state:

```text
Input: Funding transaction output (2-of-2 multisig)
Outputs:
  - Alice's balance (to_local or to_remote)
  - Bob's balance (to_local or to_remote)
  - Any pending HTLCs
```

### Asymmetric Commitments

Each party holds a different version of the commitment transaction:

- **Alice's version**: Her output has a timelock (revocable)
- **Bob's version**: His output has a timelock (revocable)

This asymmetry enables the revocation mechanism.

### Revocation Mechanism

When the channel state updates:

1. Create new commitment transactions
2. Exchange signatures
3. Exchange revocation secrets for old state
4. Old commitments become toxic (broadcasting = penalty)

## Channel Balance Queries

:::code-group
```rust
use ldk_node::Node;

/// Query channel balances using LDK
fn get_channel_balances(node: &Node) -> (u64, u64) {
    let channels = node.list_channels();
    
    let mut local_balance_msat: u64 = 0;
    let mut remote_balance_msat: u64 = 0;
    
    for channel in channels {
        local_balance_msat += channel.balance_msat;
        // Remote balance = capacity - local - pending HTLCs
        let capacity_msat = channel.channel_value_sats * 1000;
        remote_balance_msat += capacity_msat.saturating_sub(channel.balance_msat);
    }
    
    (local_balance_msat, remote_balance_msat)
}
```

```python
import subprocess
import json

def get_channel_balances() -> dict:
    """Query channel balances using lncli."""
    result = subprocess.run(
        ["lncli", "channelbalance"],
        capture_output=True,
        text=True,
        check=True
    )
    balance = json.loads(result.stdout)
    
    return {
        "local_balance_sat": int(balance.get("local_balance", {}).get("sat", 0)),
        "remote_balance_sat": int(balance.get("remote_balance", {}).get("sat", 0)),
        "pending_open_local": int(balance.get("pending_open_local_balance", {}).get("sat", 0)),
    }

# Example usage
balances = get_channel_balances()
print(f"Local: {balances['local_balance_sat']} sats")
print(f"Remote: {balances['remote_balance_sat']} sats")
```

```cpp
#include <iostream>
#include <cstdint>

struct ChannelBalance {
    uint64_t local_balance_msat;
    uint64_t remote_balance_msat;
    uint64_t capacity_msat;
    
    double local_ratio() const {
        if (capacity_msat == 0) return 0.0;
        return static_cast<double>(local_balance_msat) / capacity_msat;
    }
    
    bool is_balanced(double threshold = 0.2) const {
        double ratio = local_ratio();
        return ratio >= threshold && ratio <= (1.0 - threshold);
    }
};

void print_channel_balance(const ChannelBalance& balance) {
    std::cout << "Local:  " << balance.local_balance_msat / 1000 << " sats\n";
    std::cout << "Remote: " << balance.remote_balance_msat / 1000 << " sats\n";
    std::cout << "Ratio:  " << (balance.local_ratio() * 100) << "% local\n";
    std::cout << "Balanced: " << (balance.is_balanced() ? "Yes" : "No") << "\n";
}
```

```javascript
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

/**
 * Query channel balances using lncli
 * @returns {Promise<{localBalance: bigint, remoteBalance: bigint}>}
 */
async function getChannelBalances() {
    const { stdout } = await execPromise('lncli channelbalance --macaroonpath=/path/to/admin.macaroon');
    const balance = JSON.parse(stdout);
    
    return {
        localBalance: BigInt(balance.local_balance?.sat || 0),
        remoteBalance: BigInt(balance.remote_balance?.sat || 0),
        pendingOpen: BigInt(balance.pending_open_local_balance?.sat || 0),
    };
}

// Example usage
getChannelBalances().then(balance => {
    console.log(`Local: ${balance.localBalance} sats`);
    console.log(`Remote: ${balance.remoteBalance} sats`);
});
```
:::

## Channel Capacity and Liquidity

### Total Capacity

Channel capacity equals the funding amount:

```text
Alice funds: 100,000 sats
Bob funds: 0 sats (single-funded)
Total capacity: 100,000 sats
```

### Liquidity Direction

For routing payments, liquidity must exist in the payment direction:

| Direction | Requirement |
|-----------|-------------|
| Alice → Bob | Alice needs outbound liquidity |
| Bob → Alice | Bob needs outbound liquidity |

### Inbound vs Outbound Liquidity

- **Outbound**: Funds you can send (your channel balance)
- **Inbound**: Funds you can receive (peer's channel balance)

New nodes often struggle with inbound liquidity since opening channels only provides outbound.

## Channel Types

### Public Channels

- Announced to the network gossip
- Appear in the public channel graph
- Can route payments for others
- Required for earning routing fees

### Private (Unannounced) Channels

- Not broadcast to the network
- Only known to the two parties
- Can still be used with route hints
- Better privacy for end users

## Channel Security

### Revocation Keys

Each commitment state has an associated revocation key. If a party broadcasts an old state, the counterparty can:

1. Detect the old commitment on-chain
2. Use the revocation secret to construct a penalty transaction
3. Claim all funds in the channel

### Timelocks

Force-closed channels have timelocks (typically 144-2016 blocks) that give the counterparty time to detect and punish cheating attempts.

### Watchtowers

Third-party services that monitor the blockchain for breach attempts when your node is offline. See [Watchtowers](/docs/lightning/watchtowers) for details.

## Common Issues

### Unbalanced Channels

**Problem**: All funds on one side prevents bidirectional payments.

**Solutions**:
- Circular rebalancing (pay yourself through the network)
- Submarine swaps (on-chain ↔ off-chain)
- Open additional channels
- Use liquidity marketplaces

### Stuck Channels

**Problem**: Cannot cooperatively close (peer offline/unresponsive).

**Solution**: Force close and wait for timelock expiry.

### Insufficient Capacity

**Problem**: Payment larger than available channel balance.

**Solutions**:
- Use [Multi-Part Payments (MPP)](/docs/lightning/routing#what-is-mpp)
- Open larger channel
- Find alternative route

## Summary

Payment channels enable:

- **Instant transactions**: No block confirmation needed
- **Minimal fees**: Fraction of on-chain costs
- **Privacy**: Off-chain activity not visible on blockchain
- **Scalability**: Unlimited payments per channel
- **Security**: Cryptographic enforcement via commitment/revocation

## Related Topics

- [Routing & HTLCs](/docs/lightning/routing) - How payments route through channels
- [Watchtowers](/docs/lightning/watchtowers) - Third-party channel monitoring
- [Anchor Outputs](/docs/lightning/anchor-outputs) - Modern channel format
