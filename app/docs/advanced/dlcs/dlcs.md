# Discreet Log Contracts (DLCs)

Discreet Log Contracts (DLCs) enable Bitcoin smart contracts that depend on external data (oracles) without revealing contract details on-chain until execution.

**DLCs** are smart contracts that:

- **Use oracles**: Depend on external data (prices, events)
- **Privacy-preserving**: Contract terms hidden until execution
- **Trustless**: No need to trust oracle (uses adaptor signatures)
- **Bitcoin-native**: Work on Bitcoin blockchain

---

## How DLCs Work

### Oracle Attestation

```text
1. Oracle signs outcome data
2. Signature reveals outcome
3. Contract parties use signature
4. Contract executes based on outcome
```

### Adaptor Signatures

DLCs use adaptor signatures:

```text
Adaptor Signature:
- Pre-commits to outcome
- Reveals outcome when used
- Enables trustless oracle integration
```

---

## Use Cases

### Prediction Markets

```text
Example:
- Contract: "Bitcoin price > $50,000 on Jan 1"
- Oracle: Provides price data
- Outcome: Funds go to correct party
```

### Derivatives

```text
Example:
- Contract: Price difference payment
- Oracle: Provides reference price
- Settlement: Automatic based on price
```

### Insurance

```text
Example:
- Contract: Weather-based insurance
- Oracle: Provides weather data
- Payout: Automatic if conditions met
```

---

## Code Examples

### Creating a DLC

:::code-group
```rust
// DLC implementation requires specialized libraries
// This is a conceptual example

struct DLCOutcome {
    value: u64,
    oracle_signature: [u8; 64],
}

fn execute_dlc(
    contract: &DLCContract,
    outcome: DLCOutcome,
) -> Result<Transaction, DLCError> {
    // Verify oracle signature
    verify_oracle_signature(&outcome)?;
    
    // Create settlement transaction
    let tx = create_settlement_tx(contract, outcome.value)?;
    
    Ok(tx)
}
```

```python
# DLC implementation requires specialized libraries
# This is a conceptual example

def execute_dlc(contract, outcome):
    """Execute DLC based on oracle outcome."""
    # Verify oracle signature
    verify_oracle_signature(outcome.oracle_signature)
    
    # Create settlement transaction
    tx = create_settlement_tx(contract, outcome.value)
    
    return tx
```

```cpp
// DLC implementation requires specialized libraries
// This is a conceptual example

struct DLCOutcome {
    uint64_t value;
    std::array<uint8_t, 64> oracle_signature;
};

bc::transaction execute_dlc(
    const DLCContract& contract,
    const DLCOutcome& outcome
) {
    // Verify oracle signature
    verify_oracle_signature(outcome.oracle_signature);
    
    // Create settlement transaction
    return create_settlement_tx(contract, outcome.value);
}
```

```go
// DLC implementation requires specialized libraries
// This is a conceptual example

type DLCOutcome struct {
    Value          uint64
    OracleSignature [64]byte
}

func executeDLC(contract *DLCContract, outcome DLCOutcome) (*wire.MsgTx, error) {
    // Verify oracle signature
    if err := verifyOracleSignature(outcome.OracleSignature); err != nil {
        return nil, err
    }
    
    // Create settlement transaction
    return createSettlementTx(contract, outcome.Value)
}
```

```javascript
// DLC implementation requires specialized libraries
// This is a conceptual example

function executeDLC(contract, outcome) {
    // Verify oracle signature
    verifyOracleSignature(outcome.oracleSignature);
    
    // Create settlement transaction
    return createSettlementTx(contract, outcome.value);
}
```
:::

---

## Oracle Providers

### Types of Oracles

1. **Single Oracle**: One data source
2. **Multi-Oracle**: Multiple sources, consensus
3. **Decentralized Oracles**: Distributed data sources

### Trust Model

```text
Oracle Trust:
- Oracle provides data
- Parties trust oracle accuracy
- Adaptor signatures prevent oracle from stealing
- Oracle can't change outcome after signing
```

---

## Limitations

### Current State

- **Early stage**: Active development
- **Limited tooling**: Few user-friendly implementations
- **Oracle dependency**: Requires trusted oracles
- **Complexity**: Technical knowledge required

### Challenges

- **Oracle reliability**: Need trustworthy data sources
- **Contract complexity**: More complex than simple payments
- **Adoption**: Limited awareness and usage

---

## Related Topics

- [Smart Contracts](/docs/wallets/smart-contracts) - Bitcoin scripting
- [Timelocks](/docs/bitcoin/timelocks) - Time-based conditions
- [Taproot](/docs/bitcoin/taproot) - Better privacy for contracts

---

## Resources

- [DLC Specification](https://github.com/discreetlogcontracts/dlcspecs)
- [DLC Developers](https://bitcoinops.org/en/topics/discreet-log-contracts/)
