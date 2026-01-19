# Hash Time Locked Contracts (HTLCs)

[HTLCs](/docs/glossary#htlc-hash-time-locked-contract) are the mechanism that enables payments to route through the [Lightning Network](/docs/glossary#lightning-network). They ensure that payments can only be claimed with the correct [preimage](/docs/glossary#preimage), and expire after a certain time.

## What is an HTLC?

An HTLC is a conditional payment that requires:
1. **Hash Preimage**: Knowledge of a secret (the preimage) that hashes to a known value
2. **[Time Lock](/docs/glossary#time-lock)**: Expires after a certain [block](/docs/glossary#block) height

### Basic Structure

```
HTLC Conditions:
- If preimage is revealed: Payment goes to recipient
- If time lock expires: Payment returns to sender
```

## How HTLCs Work in Lightning

### Payment Flow

1. **Sender creates HTLC**: Locks funds with hash and expiry
2. **Route through network**: HTLC propagates through each hop
3. **Recipient reveals preimage**: When payment is received
4. **Preimage propagates back**: Each hop claims their HTLC
5. **HTLCs settle**: All HTLCs in the route are resolved

### Example Route

```
Alice → Bob → Carol → Dave

Alice creates HTLC to Bob:
  - Amount: 1000 sats + fees
  - Hash: H(payment_preimage)
  - Expiry: Block 850000 + 40

Bob creates HTLC to Carol:
  - Amount: 1000 sats + fees
  - Hash: H(payment_preimage) (same hash)
  - Expiry: Block 850000 + 35 (earlier expiry)

Carol creates HTLC to Dave:
  - Amount: 1000 sats
  - Hash: H(payment_preimage) (same hash)
  - Expiry: Block 850000 + 20 (earliest expiry)
```

### Why Different Expiries?

Each hop requires an **expiry delta** ([CLTV](/docs/glossary#cltv-checklocktimeverify) delta) to ensure:
- If a hop fails, there's time to resolve
- Each hop has enough time to claim their HTLC
- Preimage can propagate back through the route

**Rule**: Each hop's expiry must be earlier than the previous hop's expiry.

## HTLC Properties

### Security Properties

1. **Atomicity**: Either all HTLCs succeed or all fail
2. **Timelock**: HTLCs expire if not claimed in time
3. **Hash Lock**: Only correct preimage can claim payment
4. **Non-repudiation**: Once preimage is revealed, payment is final

### Economic Properties

1. **Fee Collection**: Each hop collects routing fees
2. **Liquidity Requirements**: Hops need sufficient channel balance
3. **Risk Management**: Hops risk funds if route fails

## HTLC States

### In Channel

An HTLC in a channel can be in these states:

1. **Offered**: HTLC offered to peer, waiting for acceptance
2. **Accepted**: Peer accepted HTLC, waiting for preimage
3. **Settled**: Preimage revealed, HTLC claimed
4. **Failed**: HTLC expired or failed, funds returned

### Lifecycle

```
Offered → Accepted → Settled
    ↓
  Failed (if expired or route fails)
```

## HTLC Failure Modes

### 1. Timeout

If HTLC expires before preimage is revealed:
- HTLC is removed from channel
- Funds return to original sender
- Payment fails

### 2. Route Failure

If any hop in the route fails:
- All HTLCs in route fail
- Funds return to sender
- Payment fails

### 3. Insufficient Liquidity

If a hop doesn't have enough balance:
- HTLC cannot be created
- Route fails
- Payment fails

## Implementation Details

### HTLC in Commitment Transaction

HTLCs are included in channel commitment transactions:

```bitcoin
# HTLC Output Script
OP_SHA256 <hash> OP_EQUAL
OP_IF
  # If preimage matches hash, pay to recipient
  <recipient_pubkey> OP_CHECKSIG
OP_ELSE
  # Otherwise, wait for timelock
  <expiry_height> OP_CHECKLOCKTIMEVERIFY OP_DROP
  <sender_pubkey> OP_CHECKSIG
OP_ENDIF
```

### HTLC Timeout Transaction

If HTLC expires, sender can claim funds:

```bitcoin
# Timeout Transaction
Input: HTLC output
Script: <expiry_height> OP_CHECKLOCKTIMEVERIFY OP_DROP <sender_sig>
```

### HTLC Success Transaction

If preimage is revealed, recipient can claim funds:

```bitcoin
# Success Transaction
Input: HTLC output
Script: <preimage> <hash> OP_SHA256 OP_EQUALVERIFY <recipient_sig>
```

## Best Practices

### For Senders

- **Set appropriate expiry**: Give enough time for route
- **Monitor payment**: Track payment status
- **Retry on failure**: Try different routes if payment fails

### For Routing Nodes

- **Set reasonable fees**: Competitive but profitable
- **Maintain liquidity**: Keep channels balanced
- **Monitor HTLCs**: Watch for expiring HTLCs
- **Set expiry deltas**: Ensure enough time for resolution

## Common Issues

### HTLC Expiring Too Soon

**Problem**: HTLC expires before payment completes

**Solution**: 
- Increase CLTV delta
- Use faster routes
- Check network conditions

### HTLC Stuck

**Problem**: HTLC in channel but not resolving

**Solution**:
- Wait for expiry
- Force close channel (if necessary)
- Contact peer

## Summary

HTLCs are the fundamental building block of Lightning payments:

- **Enable routing**: Payments can route through multiple hops
- **Provide security**: Hash locks and time locks ensure safety
- **Enable atomicity**: All-or-nothing payment execution
- **Support fees**: Each hop can collect routing fees

Understanding HTLCs is essential for understanding how Lightning payments work.
