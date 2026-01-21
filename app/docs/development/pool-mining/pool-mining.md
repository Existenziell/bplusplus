# Pool Mining Setup and Monitoring

Pool [mining](/docs/glossary#mining) allows you to contribute [hash rate](/docs/glossary#hash-rate) to a [mining pool](/docs/glossary#mining-pool) and receive proportional rewards. This guide covers setup, monitoring, and optimization.

## Mining Architecture

### Components

1. **Bitcoin Node**: Provides blockchain data via RPC
2. **Mining Software**: CPU/GPU/ASIC miner
3. **Mining Pool**: Coordinates mining efforts
4. **Wallet**: Receives mining rewards

### Data Flow

```
Bitcoin Node → Mining Software → Mining Pool → Rewards
```

## Mining Software Setup

### CPU Mining (cpuminer-opt)

**Installation:**

```bash
# Install dependencies
brew install automake autoconf libtool curl gmp jansson

# Clone and build
git clone https://github.com/JayDDee/cpuminer-opt.git
cd cpuminer-opt
./build.sh
```

**Configuration:**

```bash
# Start mining (replace with your pool URL and credentials)
./cpuminer -a sha256d \
  -o stratum+tcp://<pool_url>:<port> \
  -u <your_bitcoin_address>.worker \
  -p <password> \
  -t <thread_count>
```

### Configuration Parameters

- **Algorithm**: `sha256d` (Bitcoin)
- **Pool URL**: Your chosen mining pool's Stratum URL
- **Username**: Your Bitcoin address + worker name
- **Password**: Pool password (often `x` for default)
- **Threads**: Number of CPU threads to use

## Pool Configuration

### Choosing a Pool

**Considerations:**
- **Payout method**: PPS, PPLNS, SOLO
- **Fee structure**: Pool fees
- **Minimum payout**: Minimum withdrawal amount
- **Reliability**: Uptime and stability
- **Location**: Geographic proximity

### Pool Types

**Pay Per Share (PPS):**
- Fixed payment per share
- Predictable income
- Higher pool fees

**Pay Per Last N Shares (PPLNS):**
- Payment based on recent shares
- Variable income
- Lower pool fees

**Solo Mining:**
- Mine independently
- Keep full block reward
- Very low probability

## Monitoring Hash Rate

### Real-Time Monitoring

**Mining Software Output:**

```
[2024-01-15 10:30:45] accepted: 1/1 (100.00%), 85.23 kH/s
[2024-01-15 10:30:50] accepted: 2/2 (100.00%), 85.45 kH/s
```

**Key Metrics:**
- **Hash Rate**: Hashes per second (H/s, kH/s, MH/s)
- **Accepted Shares**: Shares accepted by pool
- **Rejected Shares**: Shares rejected (stale/invalid)
- **Efficiency**: Accepted / Total shares

### Hash Rate Calculation

```
Hash Rate = Total Hashes / Time
```

**Example:**
```
85,230 hashes in 1 second = 85.23 kH/s
```

## Share Submission

### What is a [Share](/docs/glossary#share)?

A share is a [proof-of-work](/docs/glossary#proof-of-work-pow) submission that:
- Meets pool [difficulty](/docs/glossary#difficulty) (lower than network difficulty)
- Proves mining work was done
- Entitles [miner](/docs/glossary#miner) to proportional reward

### Share Difficulty

**Pool Difficulty:**
- Lower than network difficulty
- Allows more frequent shares
- Enables proportional rewards

**Network Difficulty:**
- Actual Bitcoin network difficulty
- Must be met to find block
- Very high (currently ~80T)

### Share Acceptance

**Accepted Share:**
- Meets pool difficulty
- Valid proof-of-work
- Counts toward rewards

**Rejected Share:**
- Stale (block already found)
- Invalid proof-of-work
- Doesn't count toward rewards

## Reward Calculation

### Proportional Rewards

**PPLNS Example:**
```
Total pool hash rate: 100 PH/s
Your hash rate: 100 kH/s
Your contribution: 0.000001%

Block reward: 3.125 BTC + fees
Your share: 3.125 BTC × 0.000001% = 0.00003125 BTC
```

### Payout Schedule

**Factors:**
- Pool payout method
- Minimum payout threshold
- Pool fees
- Network confirmation requirements

**Typical Schedule:**
- Daily or weekly payouts
- Minimum 0.001 BTC
- After 100+ confirmations

## Performance Optimization

### CPU Mining

**Thread Optimization:**
- Use all CPU cores
- Monitor temperature
- Balance performance vs. heat

**Example:**
```
10-core CPU: Use 8-10 threads
Leave 1-2 cores for system
```

### System Load

**Monitor:**
- CPU usage: 80-100%
- Temperature: 60-80°C (varies by hardware)
- Power consumption: Varies by CPU and system
- Fan noise: May increase with load

### Thermal Management

**Best Practices:**
- Monitor temperature
- Reduce threads if overheating
- Improve ventilation
- Consider stopping if too hot

## Troubleshooting

### Low Hash Rate

**Causes:**
- Too few threads
- CPU throttling
- System load
- Mining software issues

**Solutions:**
- Increase thread count
- Check CPU temperature
- Reduce other system load
- Update mining software

### High Rejection Rate

**Causes:**
- Network latency
- Stale shares
- Pool issues
- Clock synchronization

**Solutions:**
- Check network connection
- Use closer pool server
- Sync system clock
- Contact pool support

### No Shares Accepted

**Causes:**
- Wrong pool configuration
- Invalid credentials
- Network issues
- Pool downtime

**Solutions:**
- Verify pool URL
- Check username/password
- Test network connection
- Check pool status

## Security Considerations

### Wallet Security

**Best Practices:**
- Use dedicated receiving address
- Don't use main wallet
- Monitor for payouts
- Secure private keys

### Pool Security

**Considerations:**
- Choose reputable pools
- Verify pool website
- Use secure connections (SSL/TLS)
- Monitor payouts

## Educational Value

### What You Learn

1. **Proof-of-Work**: How mining works
2. **Hash Functions**: SHA256D algorithm
3. **Network Difficulty**: How difficulty adjusts
4. **Pool Coordination**: How pools work
5. **Economic Incentives**: Mining economics

### Technical Concepts

- **Block Headers**: 80-byte mining target
- **Nonce Space**: 4.3 billion possible values
- **Merkle Trees**: Transaction organization
- **Difficulty Target**: Network-wide target
- **Block Rewards**: Miner compensation

## Expected Results

### Realistic Expectations

**CPU Mining:**
- Hash Rate: Varies by CPU (typically kH/s range)
- Network Hash Rate: ~700 EH/s
- Your Contribution: Negligible percentage
- Probability of Finding Block: Essentially zero
- Pool Rewards: Very small but consistent

**Reality Check:**
- CPU mining is educational
- Real mining requires ASICs
- Pool rewards are minimal
- Focus on learning, not profit

## Summary

Pool mining provides:

- **Educational Value**: Learn how mining works
- **Network Support**: Contribute to network security
- **Small Rewards**: Proportional pool payouts
- **Real-Time Monitoring**: Track hash rate and shares
- **Technical Understanding**: Deep dive into proof-of-work

Understanding pool mining helps explain Bitcoin's security model and economic incentives.

## Related Topics

- [What is Mining?](/docs/mining/what-is-mining) - Mining fundamentals
- [Proof-of-Work](/docs/mining/proof-of-work) - The consensus mechanism
- [Mining Pools](/docs/mining/pools) - How pools coordinate miners
- [Mining Economics](/docs/mining/economics) - Profitability and incentives
