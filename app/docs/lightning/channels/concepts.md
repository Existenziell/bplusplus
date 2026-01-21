# Lightning Payment Channels

Payment channels are the fundamental building block of the Lightning Network. They enable off-chain transactions between two parties with on-chain settlement.

## What is a Payment Channel?

A payment channel is a 2-of-2 [multisig](/docs/glossary#multisig-multi-signature) address that locks Bitcoin between two parties. The parties can update the channel balance off-chain without broadcasting to Bitcoin.

### Key Properties

- **2-of-2 Multisig**: Both parties must sign to spend
- **Off-Chain Updates**: Balance changes happen off-chain
- **On-Chain Settlement**: Final state broadcast to Bitcoin
- **Bidirectional**: Payments can flow both directions

## Channel Lifecycle

### 1. Channel Opening

**[Channel Funding](/docs/glossary#channel-funding) Transaction:**
- Creates 2-of-2 multisig output
- Locks Bitcoin from both parties
- Broadcast to Bitcoin network
- Wait for confirmation (typically 1-6 [blocks](/docs/glossary#block))

**Opening Process:**
```
1. Alice and Bob agree to open channel
2. Create funding transaction (2-of-2 multisig)
3. Exchange commitment transactions
4. Broadcast funding transaction
5. Wait for confirmation
6. Channel becomes active
```

### 2. Channel Active

**Off-Chain Updates:**
- Parties exchange signed commitment transactions
- Each update reflects new balance
- No Bitcoin transaction needed
- Instant and free

**Update Process:**
```
1. Alice wants to send 10,000 sats to Bob
2. Create new commitment transaction:
   - Old: Alice 50,000, Bob 50,000
   - New: Alice 40,000, Bob 60,000
3. Exchange signed commitments
4. Revoke old commitment
5. Balance updated (off-chain)
```

### 3. Channel Closing

**[Channel Closing](/docs/glossary#channel-closing) Options:**

1. **[Cooperative Close](/docs/glossary#cooperative-close)**: Both parties agree
   - Create closing [transaction](/docs/glossary#transaction)
   - Both parties sign
   - Broadcast to Bitcoin
   - Fast and cheap

2. **[Force Close](/docs/glossary#force-close)**: One party closes unilaterally
   - Broadcast latest [commitment transaction](/docs/glossary#commitment-transaction)
   - Wait for [time lock](/docs/glossary#time-lock)
   - More expensive (higher fees)

3. **Breach Close**: One party tries to cheat
   - Other party can punish
   - Takes cheater's funds
   - Security mechanism

## Channel States

### Opening States

1. **Pending Open**: Funding transaction created, waiting confirmation
2. **Opening**: Funding confirmed, channel becoming active
3. **Active**: Channel ready for payments

### Active States

1. **Normal**: Channel operating normally
2. **Pending HTLC**: HTLC in channel, waiting resolution
3. **Closing**: Channel being closed

### Closing States

1. **Pending Close**: Closing transaction broadcast
2. **Closed**: Channel fully closed on-chain

## Commitment Transactions

### Structure

Each commitment transaction represents the current channel state:

```
Input: Funding transaction output (2-of-2 multisig)
Outputs:
  - Alice's balance (to Alice's address)
  - Bob's balance (to Bob's address)
  - Any HTLCs (if present)
```

### Revocation

When channel updates:
1. **New commitment**: Create new commitment transaction
2. **Revoke old**: Exchange revocation secrets
3. **Security**: Old commitment becomes invalid

### Why Revocation?

Prevents cheating:
- If Alice tries to broadcast old commitment
- Bob can use revocation secret to take all funds
- Incentivizes honest behavior

## Channel Capacity

### Total Capacity

Channel capacity = sum of both parties' contributions:

```
Alice contributes: 100,000 sats
Bob contributes: 50,000 sats
Total capacity: 150,000 sats
```

### Available Balance

Each party's available balance:

```
Initial: Alice 100,000, Bob 50,000
After payment: Alice 90,000, Bob 60,000
```

### Liquidity

For routing, need balance in direction of payment:

```
Alice → Bob: Need Alice to have balance
Bob → Alice: Need Bob to have balance
```

## Channel Types

### Public Channels

- **Announced**: Advertised to network
- **Routing**: Can route payments for others
- **Discovery**: Visible in network graph
- **Use case**: Routing nodes

### Private Channels

- **Unannounced**: Not advertised
- **Direct only**: Only for direct payments
- **Privacy**: Not visible in network
- **Use case**: Private payments

## Channel Management

### Opening Channels

**Considerations:**
- **Capacity**: How much to lock
- **Peer selection**: Choose reliable peers
- **Fees**: Opening and closing fees
- **Uptime**: Peer should be online

### Closing Channels

**When to close:**
- Channel no longer needed
- Need to free capital
- Peer is unreliable
- Rebalancing channels

**How to close:**
- **Cooperative**: Fastest and cheapest
- **Force close**: If peer unresponsive
- **Wait for timelock**: After force close

### Rebalancing

**Problem**: Channel becomes one-sided

**Solution**: Rebalance channels:
- Open new channels
- Close unbalanced channels
- Use circular payments
- Use rebalancing services

## Channel Security

### Commitment Security

- **Revocation secrets**: Prevent old state broadcast
- **Timelocks**: Give time to respond to cheating
- **Watchtowers**: Monitor for cheating attempts

### Force Close Protection

- **Timelock**: Time to respond to force close
- **Penalty**: Cheater loses funds
- **Watchtower**: Third party monitors

### Best Practices

1. **Backup**: Always backup channel state
2. **Monitor**: Watch for suspicious activity
3. **Update**: Keep software updated
4. **Secure**: Protect private keys

## Channel Economics

### Costs

- **Opening**: On-chain transaction fee
- **Closing**: On-chain transaction fee
- **Capital**: Locked in channel
- **Opportunity cost**: Can't use locked funds

### Benefits

- **Instant payments**: No on-chain wait
- **Low fees**: Minimal per-payment cost
- **Privacy**: Off-chain transactions
- **Scalability**: Millions of transactions

### ROI Calculation

```
Channel opening cost: 10,000 sats
Routing fees earned: 1,000 sats/month
Break-even: 10 months
```

## Common Issues

### Channel Unbalanced

**Problem**: All funds on one side

**Solution**:
- Rebalance channels
- Open new channels
- Use rebalancing services

### Channel Stuck

**Problem**: Can't close channel

**Solution**:
- Force close if needed
- Contact peer
- Wait for timelock

### Insufficient Capacity

**Problem**: Not enough balance for payment

**Solution**:
- Open larger channel
- Receive payment first
- Use different route

## Summary

Payment channels enable:

- **Off-chain transactions**: Fast and cheap
- **Bidirectional payments**: Both directions
- **On-chain settlement**: Final state on Bitcoin
- **Security**: Commitment and revocation
- **Scalability**: Millions of transactions

Understanding channels is essential for using and routing on the Lightning Network.
