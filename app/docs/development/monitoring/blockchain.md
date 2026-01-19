# Blockchain Monitoring

Real-time blockchain monitoring allows you to detect new blocks instantly, track mining pools, analyze transactions, and monitor network activity.

## ZMQ Notifications

### What is ZMQ?

ZeroMQ (ZMQ) provides real-time notifications for blockchain events without polling. It's much more efficient than repeatedly calling RPC commands.

### Benefits

- **Instant notifications**: No polling delays
- **Lower resource usage**: No constant RPC calls
- **Better reliability**: Catches blocks even after node restarts
- **Real-time monitoring**: Perfect for applications

### Configuration

Add to your `bitcoin.conf`:

```ini
# ZMQ Notifications
zmqpubhashblock=tcp://127.0.0.1:28332
zmqpubhashtx=tcp://127.0.0.1:28333
zmqpubrawblock=tcp://127.0.0.1:28334
zmqpubrawtx=tcp://127.0.0.1:28335
```

**Important**: Bitcoin Core must be built **with ZMQ enabled**.

### Verification

```bash
# Check if ZMQ is enabled in Bitcoin logs
grep -i zmq ~/.bitcoin/debug.log

# Check Bitcoin help for ZMQ options
bitcoind -h | grep zmq
```

## Block Detection

### Real-Time Block Monitoring

**Using ZMQ (Recommended):**

```python
import zmq

context = zmq.Context()
socket = context.socket(zmq.SUB)
socket.connect("tcp://127.0.0.1:28332")
socket.setsockopt_string(zmq.SUBSCRIBE, "hashblock")

while True:
    message = socket.recv()
    block_hash = message[1:].hex()
    print(f"New block: {block_hash}")
```

**Using Polling (Fallback):**

```python
import time
from bitcoinrpc import BitcoinRPC

rpc = BitcoinRPC(...)
last_block = rpc.getblockcount()

while True:
    current_block = rpc.getblockcount()
    if current_block > last_block:
        print(f"New block: {current_block}")
        last_block = current_block
    time.sleep(10)  # Poll every 10 seconds
```

### Block Information

**Get Block Details:**

```python
# Get block by hash
block = rpc.getblock(block_hash)

# Get block by height
block_hash = rpc.getblockhash(height)
block = rpc.getblock(block_hash)
```

**Key Information:**
- Block height
- Block hash
- Previous block hash
- Merkle root
- Timestamp
- Transaction count
- Block size

## Mining Pool Identification

### Coinbase Transaction Analysis

Mining pools often embed their name or identifier in the coinbase transaction.

**Extract Pool Information:**

```python
def identify_pool(block):
    coinbase_tx = block['tx'][0]
    coinbase_hex = rpc.getrawtransaction(coinbase_tx)
    
    # Parse coinbase script
    # Look for pool identifiers
    # Common patterns:
    # - Pool names in ASCII
    # - Pool URLs
    # - Pool signatures
    
    return pool_name
```

## OP_RETURN Analysis

### Extracting OP_RETURN Data

**Find OP_RETURN Outputs:**

```python
def extract_op_return(tx):
    op_returns = []
    for output in tx['vout']:
        asm = output['scriptPubKey']['asm']
        if asm.startswith('OP_RETURN'):
            # Extract data
            data = asm.split(' ')[1]
            op_returns.append(data)
    return op_returns
```

### Use Cases

- **Timestamping**: Document timestamps
- **Asset Protocols**: Counterparty, Omni Layer
- **Messages**: Encoded messages
- **Metadata**: Transaction metadata

## Transaction Monitoring

### Mempool Monitoring

**Watch Mempool:**

```python
# Using ZMQ
socket = context.socket(zmq.SUB)
socket.connect("tcp://127.0.0.1:28333")
socket.setsockopt_string(zmq.SUBSCRIBE, "hashtx")

while True:
    message = socket.recv()
    tx_hash = message[1:].hex()
    print(f"New transaction: {tx_hash}")
```

### Transaction Analysis

**Analyze Transaction:**

```python
tx = rpc.getrawtransaction(tx_hash, True)

# Key information:
# - Inputs and outputs
# - Fees
# - Script types
# - OP_RETURN data
# - Transaction size
```

## Statistics and Logging

### Block Statistics

**Track Block Metrics:**

```python
def log_block_stats(block):
    stats = {
        'height': block['height'],
        'hash': block['hash'],
        'tx_count': len(block['tx']),
        'size': block['size'],
        'pool': identify_pool(block),
        'timestamp': block['time']
    }
    
    # Log to CSV or database
    log_to_csv(stats)
```

### CSV Logging

**Log to CSV:**

```python
import csv

def log_to_csv(stats):
    with open('blocks.csv', 'a') as f:
        writer = csv.DictWriter(f, fieldnames=stats.keys())
        writer.writerow(stats)
```

## Error Handling

### ZMQ Connection Failures

**Handle ZMQ Errors:**

```python
try:
    socket = context.socket(zmq.SUB)
    socket.connect("tcp://127.0.0.1:28332")
except zmq.ZMQError as e:
    print(f"ZMQ connection failed: {e}")
    # Fall back to polling
    use_polling_fallback()
```

### RPC Failures

**Handle RPC Errors:**

```python
try:
    block = rpc.getblock(block_hash)
except Exception as e:
    print(f"RPC error: {e}")
    # Retry or log error
```

## Best Practices

### For Monitoring Applications

1. **Use ZMQ First**: Try ZMQ, fall back to polling
2. **Error Handling**: Handle all error cases
3. **Logging**: Log important events
4. **Rate Limiting**: Don't overwhelm RPC
5. **Caching**: Cache frequently accessed data

### For Performance

1. **Async Operations**: Use async/await for I/O
2. **Batch Operations**: Batch RPC calls when possible
3. **Connection Pooling**: Reuse connections
4. **Efficient Parsing**: Parse only needed data
