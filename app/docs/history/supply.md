# Bitcoin Supply Schedule

## Overview

The total Bitcoin supply is mathematically fixed at 21 million BTC. The supply schedule follows a predictable formula that ensures no more than 21 million Bitcoin will ever be created.

## Supply Formula

The total Bitcoin supply follows a geometric series:

```
Total Supply = 210,000 × 50 × (1 + 1/2 + 1/4 + 1/8 + ...)
             = 210,000 × 50 × 2
             = 21,000,000 BTC
```

This geometric series ensures that:
- Each halving period creates 210,000 blocks
- Each period creates half the Bitcoin of the previous period
- The series converges to exactly 21 million BTC
- After 64 halvings, the subsidy becomes 0

## Key Facts

- **Total Supply**: Exactly 21,000,000 BTC
- **Halving Interval**: Every 210,000 blocks (~4 years)
- **Initial Block Reward**: 50 BTC
- **Current Block Reward**: 3.125 BTC (after 4th halving in 2024)
- **Total Halvings**: 32 halving events
- **All Coins Issued**: December 22, 2137 (estimated)
- **Block Height at Completion**: ~6,930,000

## Supply Schedule Breakdown

| Period | Blocks | Block Reward | Total BTC Created |
|--------|--------|--------------|-------------------|
| 0 | 0-209,999 | 50 BTC | 10,500,000 BTC |
| 1 | 210,000-419,999 | 25 BTC | 5,250,000 BTC |
| 2 | 420,000-629,999 | 12.5 BTC | 2,625,000 BTC |
| 3 | 630,000-839,999 | 6.25 BTC | 1,312,500 BTC |
| 4 | 840,000-1,049,999 | 3.125 BTC | 656,250 BTC |
| 5 | 1,050,000-1,259,999 | 1.5625 BTC | 328,125 BTC |
| ... | ... | ... | ... |
| 32 | 6,720,000-6,929,999 | ~0.00000001 BTC | ~0.01 BTC |
| 33+ | After 6,930,000 | 0 BTC | 0 BTC |

**Total**: 21,000,000 BTC

## After All Coins Are Issued

Once all 21 million Bitcoin have been created (around December 22, 2137):

- **No New Bitcoin**: Block rewards will be 0
- **Miner Income**: Miners will rely entirely on transaction fees
- **Network Security**: Economic incentives remain through fee collection
- **Inflation**: Bitcoin becomes deflationary (supply decreases if coins are lost)

## Related Topics

- [Halving Schedule](/docs/history/halvings) - Complete halving schedule with dates
- [Subsidy Equation](/docs/bitcoin/subsidy) - Mathematical formula and implementation
- [Overview](/docs/history) - Key historical events
