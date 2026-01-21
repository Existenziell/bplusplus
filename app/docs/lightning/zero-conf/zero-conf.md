# Zero-Conf Channels

Zero-conf channels (also called turbo channels) allow Lightning channels to be used immediately after the funding transaction is broadcast, without waiting for blockchain confirmations.

## The Confirmation Problem

Standard Lightning channel opening requires:

1. Broadcast funding transaction
2. Wait for 3-6 confirmations (30-60 minutes)
3. Channel becomes usable

**Impact**: Users must wait before they can send or receive payments through the new channel.

## How Zero-Conf Works

Zero-conf channels allow immediate use by accepting unconfirmed funding:

```text
Standard Channel:
Fund tx broadcast → Wait 3-6 blocks → Channel active

Zero-Conf Channel:
Fund tx broadcast → Channel active immediately
                  → Funds usable right away
                  → Confirmation happens in background
```

### Trust Requirement

Zero-conf requires trusting the channel funder:

- **Single-funded**: The funder could double-spend before confirmation
- **Dual-funded**: More complex trust considerations
- **Receiving side trust**: Recipient trusts funder won't double-spend

## Use Cases

### Lightning Service Providers (LSPs)

Most common use case:

```text
User → LSP: "I want inbound liquidity"
LSP → User: Opens zero-conf channel
User: Can receive payments immediately
LSP: Trusts their own funding tx won't double-spend
```

The LSP trusts themselves (they created the funding tx).

### Merchant Onboarding

Fast onboarding for new merchants:

```text
1. Merchant requests channel
2. LSP opens zero-conf channel to merchant
3. Merchant can accept payments in seconds
4. No 1-hour wait for first customer
```

### Mobile Wallets

Instant setup for mobile users:

```text
1. User installs wallet
2. Wallet provider opens channel
3. User can receive immediately
4. Seamless first-time experience
```

## Trust Model

### Who Trusts Whom?

| Scenario | Trust Required |
|----------|----------------|
| LSP opens to user | LSP trusts itself |
| User opens to LSP | LSP trusts user (risky) |
| Peer-to-peer | Mutual trust needed |

### Risk Assessment

The receiver of zero-conf funds takes the risk:

```text
Attack Vector:
1. Alice opens zero-conf channel to Bob
2. Bob accepts, provides service/goods
3. Alice double-spends funding tx
4. Channel never existed, Bob loses out
```

**Mitigation**: Only accept zero-conf from trusted parties (typically LSPs opening TO users).

## Implementation

### LND Configuration

```bash
# lnd.conf - Enable zero-conf channels
[protocol]
protocol.option-scid-alias=true
protocol.zero-conf=true

# Per-peer trust (open with --zero_conf flag)
lncli openchannel --node_key=<pubkey> --local_amt=100000 --zero_conf
```

### Accepting Zero-Conf

```bash
# Configure which peers you trust for zero-conf
# In lnd.conf or via RPC

# Accept zero-conf from specific peer
lncli updatechanpolicy --zero_conf_accepted=true --chan_point=<chan_point>
```

### SCID Alias

Zero-conf channels use SCID (Short Channel ID) aliases because they don't have a confirmed funding transaction to derive a real SCID:

```text
Real SCID: block_height:tx_index:output_index
           (requires confirmation)

Alias SCID: Randomly generated
            (works before confirmation)
```

## Feature Negotiation

Zero-conf requires both peers to support:

| Feature Bit | Name | Purpose |
|-------------|------|---------|
| 44/45 | option_scid_alias | Alias-based channel IDs |
| 50/51 | option_zeroconf | Zero-conf support |

### Channel Type

When opening a channel, request zero-conf:

```text
Channel Type Bits:
- 12: static_remotekey
- 22: anchors_zero_fee_htlc_tx
- 50: option_zeroconf (zero-conf request)
- 44: option_scid_alias (required for zero-conf)
```

## Limitations

### No Forwarding

Zero-conf channels cannot forward payments until confirmed:

```text
Before Confirmation:
- Can send through channel: Yes
- Can receive to channel: Yes
- Can route THROUGH channel: No
```

This prevents routing nodes from being exploited.

### Confirmation Still Matters

Zero-conf doesn't eliminate confirmation need:

- Funding tx must eventually confirm
- If it doesn't confirm, channel fails
- RBF attacks can invalidate channel

### Maximum HTLC Limits

Until confirmed, prudent to limit HTLC sizes:

```text
Unconfirmed: Limit HTLCs to small amounts
Confirmed: Full channel capacity available
```

## Security Considerations

### Double-Spend Attack

Most significant risk:

```text
1. Attacker opens zero-conf channel
2. Victim accepts and provides value
3. Attacker broadcasts competing tx (double-spend)
4. Funding tx never confirms
5. Channel never existed
```

**Defenses**:
- Only accept from trusted parties
- Limit value at risk before confirmation
- Monitor mempool for conflicts

### RBF Concerns

Replace-By-Fee can replace the funding tx:

```text
1. Attacker opens channel with low-fee funding tx
2. Victim accepts zero-conf
3. Attacker RBFs with different outputs
4. Channel funding invalidated
```

**Mitigation**: Ensure funding tx is not RBF-signaling (nSequence).

## Best Practices

### For LSPs

1. **Only open TO users**: Don't accept zero-conf from untrusted peers
2. **Monitor funding txs**: Watch for conflicts in mempool
3. **Limit exposure**: Cap zero-conf channel sizes
4. **Fast confirmation**: Use appropriate fees for quick confirmation

### For Users

1. **Trust your LSP**: Only use reputable providers
2. **Small channels first**: Don't open huge zero-conf channels
3. **Verify confirmation**: Monitor that channel eventually confirms

### For Developers

```text
Implementation Checklist:
□ Support option_scid_alias
□ Support option_zeroconf  
□ Implement alias-based routing
□ Disable forwarding until confirmed
□ Monitor funding tx status
□ Handle confirmation failures gracefully
```

## Flow Diagram

```text
Zero-Conf Channel Open:

User                    LSP
  │                      │
  │───Request channel───>│
  │                      │
  │<──Accept (zero-conf)─│
  │                      │
  │<──Funding tx created─│
  │                      │
  │<──Channel active!────│  (no wait)
  │                      │
  │   Use channel...     │
  │                      │
  │   (Meanwhile...)     │
  │                      │
  │<──Funding confirmed──│  (background)
  │                      │
  │   Full functionality │
```

## Comparison

| Aspect | Standard | Zero-Conf |
|--------|----------|-----------|
| Time to use | 30-60 min | Seconds |
| Trust needed | None | Yes (funder) |
| Can forward | Yes | After confirm |
| Double-spend risk | None | Yes |
| Best for | Peer-to-peer | LSP services |

## Summary

Zero-conf channels provide:

- **Instant usability**: No waiting for confirmations
- **Better UX**: Seamless onboarding experience
- **LSP friendly**: Perfect for liquidity providers
- **Trust trade-off**: Speed in exchange for trust assumption

## When to Use Zero-Conf

**Good fit**:
- LSP opening channel to user
- Merchant onboarding via trusted provider
- Mobile wallet initial setup

**Poor fit**:
- Peer-to-peer with strangers
- Large channel amounts
- When you're the one providing value upfront

## Related Topics

- [Channels](/docs/lightning/channels) - Channel lifecycle
- [Anchor Outputs](/docs/lightning/anchor-outputs) - Modern channel format

## Resources

- [BOLT 2: Zero-Conf](https://github.com/lightning/bolts/blob/master/02-peer-protocol.md#the-channel_type-feature)
- [LND Zero-Conf Guide](https://docs.lightning.engineering/lightning-network-tools/lnd/zero-conf-channels)
