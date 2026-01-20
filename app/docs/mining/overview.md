# Bitcoin Mining Overview

## What is Bitcoin Mining?

Bitcoin mining is the process by which new Bitcoin transactions are verified and added to the blockchain. Miners compete to solve cryptographic puzzles using computational power, and the first miner to solve the puzzle gets to add the next block to the blockchain and receive a reward.

## How Mining Works

### Block Creation Process

1. **Transaction Collection**: Miners collect pending transactions from the mempool
2. **Block Construction**: Miners assemble transactions into a candidate block
3. **Proof-of-Work**: Miners repeatedly hash the block header with different nonce values
4. **Difficulty Target**: The hash must be below a certain target (determined by network difficulty)
5. **Block Discovery**: When a miner finds a valid hash, they broadcast the block to the network
6. **Block Validation**: Other nodes verify the block and add it to their blockchain
7. **Reward**: The successful miner receives the block reward plus transaction fees

### Mining Hardware

- **ASIC Miners**: Application-Specific Integrated Circuits designed specifically for Bitcoin mining (most efficient)
- **GPU Mining**: Graphics Processing Units (less efficient than ASICs, rarely profitable)
- **CPU Mining**: Central Processing Units (least efficient, primarily educational)

### Mining Pools

Most miners join mining pools to:
- **Reduce Variance**: Share rewards with other miners
- **Consistent Payouts**: Receive smaller but regular payments
- **Lower Barrier**: Don't need to find a full block individually
- **Combine Hash Power**: Pool hash rate increases chances of finding blocks

## Key Concepts

- **Proof-of-Work**: Cryptographic puzzle that miners solve
- **Block Reward**: Currently 3.125 BTC per block (after 2024 halving)
- **Difficulty**: Adjusts every 2016 blocks to maintain ~10 minute block times
- **Pool Mining**: Miners combine resources to share rewards
- **Hash Rate**: Measure of mining power (network: ~700 EH/s)

## Related Topics

- [Proof-of-Work Mechanism](/docs/mining/proof-of-work) - How the mining algorithm works
- [Difficulty Adjustment](/docs/mining/difficulty) - How difficulty adjusts to maintain block times
- [Mining Economics](/docs/mining/economics) - Block rewards, fees, and profitability
