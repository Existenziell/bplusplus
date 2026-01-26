# Statechains

Statechains are a scaling solution that allows transferring bitcoin ownership off-chain through a federated service without requiring on-chain transactions for each transfer.

**Statechains** enable off-chain bitcoin transfers:

```text
Concept:
- Lock bitcoin on-chain once
- Transfer ownership off-chain
- No on-chain transaction per transfer
- Federated service manages state
```

---

## How Statechains Work

### Initial Setup

```text
1. User locks bitcoin on-chain
2. Creates statechain entry
3. Federated service holds key share
4. User holds key share
```

### Transfers

```text
1. User transfers to recipient
2. Key shares updated off-chain
3. No on-chain transaction
4. Recipient can continue transferring
```

### Unlocking

```text
1. User wants to unlock
2. Cooperates with federated service
3. Creates on-chain transaction
4. Bitcoin unlocked
```

---

## Benefits

### Advantages

- **No on-chain fees**: Per transfer
- **Fast transfers**: Instant off-chain
- **Bitcoin native**: Uses real bitcoin
- **No channel limits**: No liquidity constraints

### Limitations

- **Federated trust**: Requires trusted service
- **Key management**: Complex key sharing
- **Limited adoption**: Early stage technology

---

## Comparison

| Feature | Statechains | Lightning | Sidechains |
|---------|-------------|-----------|------------|
| **Trust** | Federated | Trustless | Varies |
| **Fees** | Low | Very low | Sidechain fees |
| **Speed** | Instant | Instant | Block time |
| **Complexity** | High | Medium | High |

---

## Related Topics

- [Sidechains](/docs/advanced/sidechains) - Alternative scaling
- [Lightning Network](/docs/lightning) - Payment channels
- [Privacy Techniques](/docs/wallets/privacy) - Privacy improvements

---

## Resources

- [Statechains Research](https://bitcoinwords.github.io/statechains-non-custodial-off-chain-bitcoin-transfer)
