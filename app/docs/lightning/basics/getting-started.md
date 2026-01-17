# Lightning Network: Getting Started

## Overview

The Lightning Network is a second-layer payment protocol built on top of Bitcoin. It enables instant, low-cost payments by opening payment channels between nodes.

## What is the Lightning Network?

### Key Concepts

- **Payment Channels**: Two-way payment channels between nodes
- **Off-Chain Transactions**: Most transactions happen off the blockchain
- **Instant Payments**: Payments settle immediately
- **Low Fees**: Minimal fees compared to on-chain transactions
- **Scalability**: Can handle millions of transactions per second

### How It Works

1. **Open Channel**: Two parties lock Bitcoin in a 2-of-2 multisig address
2. **Update Balance**: Parties exchange signed transactions updating channel balance
3. **Close Channel**: Final state is broadcast to Bitcoin blockchain
4. **Route Payments**: Payments can route through multiple channels

## Node Setup

### Prerequisites

- **Bitcoin Node**: Fully synced Bitcoin Core node
- **Lightning Node**: LND, CLN, or other Lightning implementation
- **Network**: Signet (testnet) or mainnet

### Bitcoin Node Configuration

Add to your `bitcoin.conf`:

```ini
# ZMQ Notifications (required for Lightning)
zmqpubhashblock=tcp://127.0.0.1:28332
zmqpubhashtx=tcp://127.0.0.1:28333

# Other Lightning-friendly settings
txindex=1
```

**Important**: Bitcoin Core must be built **with ZMQ enabled** for Lightning to work.

### Lightning Node Configuration (LND)

Create `lnd.conf`:

```ini
[Application Options]
debuglevel=info
maxpendingchannels=10

[Bitcoin]
bitcoin.active=1
bitcoin.signet=1
bitcoin.node=bitcoind

[Bitcoind]
bitcoind.rpchost=localhost
bitcoind.rpcuser=your_rpc_user
bitcoind.rpcpass=your_rpc_password
bitcoind.zmqpubrawblock=tcp://127.0.0.1:28332
bitcoind.zmqpubrawtx=tcp://127.0.0.1:28333
```

Start LND:

```bash
lnd --configfile=/path/to/lnd.conf
```

## Funding Your Lightning Node

### Step 1: Create Wallet

If using Bitcoin Core with a wallet:

```bash
# Create wallet
bitcoin-cli -signet createwallet wallet_000

# Import descriptor (if you have one)
bitcoin-cli -signet -rpcwallet=wallet_000 importdescriptors \
  '[{"desc":"tr(tprv8...)", "timestamp":0, "active":true}]'
```

### Step 2: Get Lightning Address

Get a deposit address from your Lightning node:

```bash
# Using lncli (LND CLI)
lncli newaddress p2wkh
```

### Step 3: Fund the Address

Send Bitcoin to the Lightning node address:

```bash
# Send from Bitcoin Core wallet
bitcoin-cli -signet -rpcwallet=wallet_000 sendtoaddress \
  address="tb1p..." amount=0.01 fee_rate=1
```

Wait for confirmation (typically 1-6 blocks).

## Opening Channels

### Connect to a Peer

```bash
# Connect to a Lightning node
lncli connect <pubkey>@<host>:<port>
```

Example:
```bash
lncli connect 02dbe21ebbd6253b2b0ba1f30cba7331e6e6d48aa289f15bf6d2f267b6c6480fa1@signet.bosschallenge.xyz:9735
```

### Open Channel

```bash
# Open a channel with 50,000 satoshis
lncli openchannel --node_key=<pubkey> --local_amt=50000000
```

**Channel Opening Process:**
1. Create funding transaction (2-of-2 multisig)
2. Wait for confirmation (typically 1-6 blocks)
3. Channel becomes active
4. Can start making payments

### Check Channel Status

```bash
# List channels
lncli listchannels

# Get channel info
lncli getchaninfo <channel_id>
```

## Creating and Paying Invoices

### Create Invoice

```bash
# Create invoice for 1000 satoshis
lncli addinvoice --amt=1000 --memo="Payment for services"
```

This returns a payment request (BOLT11 invoice) starting with `lntbs` (signet) or `lnbc` (mainnet).

### Pay Invoice

```bash
# Pay an invoice
lncli payinvoice <invoice_string>
```

**Payment Process:**
1. Node finds route to destination
2. Creates HTLCs along the route
3. Payment propagates through network
4. Preimage is revealed
5. HTLCs are settled

### Check Payment Status

```bash
# List payments
lncli listpayments

# Get payment details
lncli trackpayment <payment_hash>
```

## Basic Operations

### Get Node Info

```bash
# Get your node's information
lncli getinfo
```

Shows:
- Node public key
- Number of channels
- Network (signet/mainnet)
- Version information

### List Peers

```bash
# List connected peers
lncli listpeers
```

### Channel Balance

```bash
# Get channel balance
lncli channelbalance
```

Shows:
- Local balance (your funds in channels)
- Remote balance (peer's funds)
- Pending open channels

### Network Info

```bash
# Get network graph information
lncli describegraph
```

## Common Tasks

### Task 1: Pay an Invoice

1. Receive invoice from another node
2. Use `lncli payinvoice <invoice>` to pay
3. Payment routes through network automatically
4. Extract preimage for verification

### Task 2: Lookup Channel Policy

```bash
# Get channel information
lncli getchaninfo <channel_id>

# Parse JSON to find base_fee_msat
lncli getchaninfo <channel_id> | jq '.base_fee_msat'
```

### Task 3: Custom Route Payment

```bash
# Pay via specific route
lncli sendpayment \
  --dest=<destination_pubkey> \
  --amt=<amount_satoshis> \
  --final_cltv_delta=144 \
  --route=<route_json>
```

## Troubleshooting

### Channel Not Opening

- **Check Bitcoin node**: Ensure it's synced and ZMQ is enabled
- **Check funding**: Ensure you have enough balance
- **Check connectivity**: Ensure peer is reachable
- **Check logs**: Review LND logs for errors

### Payment Failing

- **Insufficient balance**: Check channel balance
- **No route**: Network may not have path to destination
- **Channel unbalance**: Channel may be one-sided
- **Fee too high**: Routing fees may exceed payment amount

### Node Not Starting

- **Check Bitcoin connection**: Ensure Bitcoin node is running
- **Check ZMQ**: Verify ZMQ is configured correctly
- **Check permissions**: Ensure LND can access Bitcoin RPC
- **Check logs**: Review error messages

## Best Practices

### Security

- **Backup wallet**: Always backup your Lightning wallet seed
- **Secure RPC**: Use strong RPC credentials
- **Firewall**: Restrict access to Lightning ports
- **Updates**: Keep Lightning node software updated

### Channel Management

- **Balance channels**: Keep channels balanced for routing
- **Monitor capacity**: Watch channel capacity
- **Close unused channels**: Free up capital
- **Diversify peers**: Connect to multiple well-connected nodes

### Network Participation

- **Announce channels**: Help with network routing
- **Reasonable fees**: Set competitive routing fees
- **Maintain uptime**: Keep node online for routing
- **Monitor network**: Stay aware of network health

## Next Steps

- Learn about [HTLCs and Routing](/docs/lightning/routing)
- Understand [Channel Lifecycle](/docs/lightning/channels)
- Explore [Onion Routing](/docs/lightning/onion)

## Resources

- [BOLT Specifications](https://github.com/lightning/bolts)
- [LND Documentation](https://docs.lightning.engineering/)
- [Lightning Network Explorer](https://1ml.com/)
