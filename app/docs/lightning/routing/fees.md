# Lightning Routing Fees

Lightning routing fees are how nodes earn income for forwarding payments. Understanding fee calculation is essential for both routing nodes and payment senders.

## Fee Structure

Lightning fees consist of two components:

1. **Base Fee**: Fixed fee per HTLC (in millisatoshis)
2. **Proportional Fee**: Percentage of payment amount (in parts per million)

### Fee Formula

```
Total Fee = Base Fee + (Payment Amount × Proportional Fee / 1,000,000)
```

### Example

Given:
- Base fee: 1000 msat
- Proportional fee: 10 ppm (parts per million)
- Payment amount: 100,000 sats (100,000,000 msat)

Calculation:
```
Base Fee = 1000 msat
Proportional Fee = 100,000,000 × 10 / 1,000,000 = 1000 msat
Total Fee = 1000 + 1000 = 2000 msat (2 sats)
```

## Routing Policy

Each node advertises a **routing policy** that specifies:

- `fee_base_msat`: Base fee in millisatoshis
- `fee_proportional_millionths`: Proportional fee in parts per million
- `cltv_delta`: Required expiry delta (in blocks)

### Example Policy

```json
{
  "fee_base_msat": 1000,
  "fee_proportional_millionths": 10,
  "cltv_delta": 40
}
```

This means:
- 1000 msat base fee per HTLC
- 10 ppm proportional fee
- Requires 40 block expiry delta

## Fee Calculation Along a Route

When calculating fees for a multi-hop route, fees accumulate:

### Example Route

```
Alice → Bob → Carol → Dave
Payment: 100,000 sats

Bob's Policy:
  Base: 1000 msat
  Proportional: 10 ppm

Carol's Policy:
  Base: 2000 msat
  Proportional: 500 ppm

Dave (final hop, no fee)
```

### Calculation

**Step 1: Calculate fee to Carol (from Bob)**
```
Base: 1000 msat
Proportional: 100,000,000 × 10 / 1,000,000 = 1000 msat
Total: 2000 msat
Amount to Carol: 100,000,000 + 2000 = 100,002,000 msat
```

**Step 2: Calculate fee to Dave (from Carol)**
```
Base: 2000 msat
Proportional: 100,002,000 × 500 / 1,000,000 = 50,001 msat
Total: 52,001 msat
Amount to Dave: 100,002,000 + 52,001 = 100,054,001 msat
```

**Total Fee Paid**: 54,001 msat (54 sats)

## HTLC Amount Calculation

For each hop, the HTLC amount includes:
- Original payment amount
- All fees accumulated up to that point

### Backward Calculation

Starting from the final amount, work backwards:

```
Final Amount (to Dave): 100,054,001 msat

Carol's HTLC to Dave: 100,054,001 msat
  (includes: 100,000,000 + 2000 + 52,001)

Bob's HTLC to Carol: 100,002,000 msat
  (includes: 100,000,000 + 2000)

Alice's HTLC to Bob: 100,000,000 msat
  (original payment)
```

## Integer Division

**Important**: Lightning uses **integer division** for fee calculation (as per BOLT 7).

This means:
- Round down (floor) any fractional results
- No rounding up
- Can lead to small discrepancies

### Example

```
Payment: 1,000,000 msat
Proportional Fee: 3 ppm

Calculation: 1,000,000 × 3 / 1,000,000 = 3 msat ✓

But if payment was 999,999 msat:
999,999 × 3 / 1,000,000 = 2.999997 msat
Integer division: 2 msat (rounded down)
```

## Fee Economics

### For Routing Nodes

**Revenue Sources:**
- Base fees from each forwarded payment
- Proportional fees based on payment size

**Costs:**
- Channel liquidity (locked capital)
- Risk of failed payments
- Operational costs (node maintenance)

**Optimization:**
- Set competitive but profitable fees
- Balance liquidity across channels
- Monitor network conditions

### For Payment Senders

**Considerations:**
- Total fee across route
- Payment success probability
- Route length (more hops = more fees)

**Optimization:**
- Find routes with lower fees
- Use direct channels when possible
- Consider payment splitting (MPP)

## Fee Limits

### Maximum Fees

There's no hard limit on fees, but:
- Very high fees reduce payment success
- Market forces keep fees reasonable
- Nodes compete for routing business

### Minimum Fees

Some nodes set minimum fees to:
- Cover operational costs
- Discourage spam
- Ensure profitability

## Fee Discovery

### How Senders Find Fees

1. **Network Graph**: Query network for channel policies
2. **Route Calculation**: Calculate fees for potential routes
3. **Fee Comparison**: Compare routes by total fee
4. **Route Selection**: Choose route with acceptable fees

### Fee Updates

Nodes can update their fees:
- Change base fee
- Change proportional fee
- Update channel policies

Changes take effect immediately for new payments.

## Best Practices

### For Routing Nodes

1. **Competitive Pricing**: Set fees that attract routing
2. **Monitor Market**: Adjust fees based on network conditions
3. **Balance Channels**: Maintain liquidity for routing
4. **Transparent Policies**: Clearly advertise fee structure

### For Payment Senders

1. **Compare Routes**: Check fees across different routes
2. **Direct Channels**: Use direct channels to avoid fees
3. **Payment Size**: Larger payments pay more in proportional fees
4. **Route Optimization**: Balance fees vs. success probability

## Common Issues

### Fees Too High

**Problem**: Route has very high fees

**Solutions**:
- Try different routes
- Use direct channels
- Split payment (MPP)
- Wait for better routing conditions

### Fees Not Calculated Correctly

**Problem**: Fee calculation doesn't match expected

**Solutions**:
- Check integer division
- Verify policy values
- Account for all hops
- Include base and proportional fees

## Summary

Lightning routing fees:

- **Two components**: Base fee + proportional fee
- **Accumulate**: Fees add up along the route
- **Integer division**: Use floor division for calculations
- **Economic incentive**: Rewards nodes for routing
- **Market driven**: Competition keeps fees reasonable

Understanding fees helps both routing nodes optimize revenue and payment senders minimize costs.
