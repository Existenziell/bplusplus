# Bitcoin RPC Commands Reference

This document provides a guide for interacting with your Bitcoin [node](/docs/glossary#node) using both curl and bitcoin-cli commands via [RPC](/docs/glossary#rpc-remote-procedure-call).

## Quick Command Reference

### Essential Commands
- [1. Blockchain Information](#1-blockchain-information) - `btc getblockchaininfo`
- [2. Network Information](#2-network-information) - `btc getnetworkinfo`
- [3. Memory Pool Information](#3-memory-pool-information) - `btc getmempoolinfo`
- [4. Block Information](#4-get-block-information) - `btc getblock`, `btc getbestblockhash`
- [5. Transaction Information](#5-transaction-information) - `btc getrawtransaction`

### Wallet Commands
- [6. Wallet Information](#6-wallet-information) - `btc getwalletinfo`, `btc listwallets`
- [7. Wallet Management](#13-wallet-management-commands) - `btc loadwallet`, `btc unloadwallet`

### Advanced Monitoring
- [8. Index Information](#7-index-information) - `btc getindexinfo`
- [9. [UTXO Set](/docs/glossary#utxo-set) Information](#8-utxo-set-information) - `btc gettxoutsetinfo`
- [10. [Peer](/docs/glossary#peer) Information](#9-peer-information) - `btc getpeerinfo`
- [11. [ZMQ](/docs/glossary#zmq-zeromq) Notifications](#11-zmq-notifications) - Real-time [block](/docs/glossary#block) and [transaction](/docs/glossary#transaction) notifications

### Quick Aliases
```bash
# Set up your alias (use environment variables for security)
# Replace <path-to-bitcoin-cli> with your actual bitcoin-cli path
alias btc='<path-to-bitcoin-cli> -rpcuser=$BITCOIN_RPC_USER -rpcpassword=$BITCOIN_RPC_PASSWORD -rpcport=$BITCOIN_RPC_PORT'

# Most used commands
btc getblockchaininfo | jq '{blocks, verificationprogress}'
btc getindexinfo
btc getwalletinfo | jq '{walletname, txcount, balance}'
btc listwallets
```

### Security Setup

```bash
# Set environment variables (replace with your actual credentials)
export BITCOIN_RPC_USER="your_username"
export BITCOIN_RPC_PASSWORD="your_password"
export BITCOIN_RPC_PORT="8332"

# Configure RPC credentials securely
# Use your preferred method for secure credential storage
```

## Basic RPC Structure

```bash
# Set up alias for easier use
# Replace <path-to-bitcoin-cli> with your actual bitcoin-cli path
alias btc='<path-to-bitcoin-cli> -rpcuser=$BITCOIN_RPC_USER -rpcpassword=$BITCOIN_RPC_PASSWORD -rpcport=$BITCOIN_RPC_PORT'

# Then use simple commands
btc <method_name> [parameters]
```

## Programmatic RPC Access

For building applications, you can interact with Bitcoin Core RPC programmatically:

:::code-group
```rust
use reqwest::blocking::Client;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::collections::HashMap;

#[derive(Serialize)]
struct RpcRequest {
    jsonrpc: &'static str,
    id: &'static str,
    method: String,
    params: Vec<Value>,
}

#[derive(Deserialize)]
struct RpcResponse {
    result: Option<Value>,
    error: Option<Value>,
}

/// Centralized service for Bitcoin node RPC communication
struct BitcoinRPCService {
    rpc_url: String,
    rpc_user: String,
    rpc_password: String,
    client: Client,
}

impl BitcoinRPCService {
    fn new(rpc_url: &str, rpc_user: &str, rpc_password: &str) -> Self {
        Self {
            rpc_url: rpc_url.to_string(),
            rpc_user: rpc_user.to_string(),
            rpc_password: rpc_password.to_string(),
            client: Client::builder()
                .timeout(std::time::Duration::from_secs(5))
                .build()
                .unwrap(),
        }
    }

    fn rpc_call(&self, method: &str, params: Vec<Value>) -> Result<Value, Box<dyn std::error::Error>> {
        let request = RpcRequest {
            jsonrpc: "1.0",
            id: "client",
            method: method.to_string(),
            params,
        };

        let response: RpcResponse = self.client
            .post(&self.rpc_url)
            .basic_auth(&self.rpc_user, Some(&self.rpc_password))
            .json(&request)
            .send()?
            .json()?;

        Ok(response.result.unwrap_or(Value::Null))
    }

    // Convenience methods
    fn get_blockchain_info(&self) -> Result<Value, Box<dyn std::error::Error>> {
        self.rpc_call("getblockchaininfo", vec![])
    }

    fn get_block_count(&self) -> Result<Value, Box<dyn std::error::Error>> {
        self.rpc_call("getblockcount", vec![])
    }

    fn get_block(&self, block_hash: &str, verbosity: i32) -> Result<Value, Box<dyn std::error::Error>> {
        self.rpc_call("getblock", vec![json!(block_hash), json!(verbosity)])
    }

    fn get_mempool_info(&self) -> Result<Value, Box<dyn std::error::Error>> {
        self.rpc_call("getmempoolinfo", vec![])
    }

    fn estimate_smart_fee(&self, target_blocks: i32) -> Result<Value, Box<dyn std::error::Error>> {
        self.rpc_call("estimatesmartfee", vec![json!(target_blocks)])
    }
}

// Usage
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let rpc = BitcoinRPCService::new("http://127.0.0.1:8332", "user", "password");
    let info = rpc.get_blockchain_info()?;
    println!("Block height: {}", info["blocks"]);
    Ok(())
}
```

```python
import os
import requests
from typing import Dict, Any, Optional, List

class BitcoinRPCService:
    """Centralized service for Bitcoin node RPC communication."""

    def __init__(self, rpc_url: str, rpc_user: Optional[str] = None, 
                 rpc_password: Optional[str] = None, cookie_file: Optional[str] = None):
        self.rpc_url = rpc_url
        self.rpc_user = rpc_user
        self.rpc_password = rpc_password
        self.cookie_file = cookie_file
        self.timeout = 5

    def rpc_call(self, method: str, params: Optional[List] = None) -> Dict[str, Any]:
        """Make an RPC call to Bitcoin node."""
        if params is None:
            params = []

        payload = {
            "jsonrpc": "1.0",
            "id": "monitor",
            "method": method,
            "params": params
        }

        # Prepare authentication
        auth = None
        if self.cookie_file and os.path.exists(self.cookie_file):
            with open(self.cookie_file, 'r') as f:
                cookie = f.read().strip()
            if ':' in cookie:
                username, password = cookie.split(':', 1)
                auth = (username, password)
        elif self.rpc_user and self.rpc_password:
            auth = (self.rpc_user, self.rpc_password)

        response = requests.post(
            self.rpc_url,
            json=payload,
            auth=auth,
            timeout=self.timeout
        )
        return response.json()

    # Convenience methods
    def get_blockchain_info(self) -> Dict[str, Any]:
        return self.rpc_call("getblockchaininfo")

    def get_block_count(self) -> Dict[str, Any]:
        return self.rpc_call("getblockcount")

    def get_block(self, block_hash: str, verbosity: int = 1) -> Dict[str, Any]:
        return self.rpc_call("getblock", [block_hash, verbosity])

    def get_mempool_info(self) -> Dict[str, Any]:
        return self.rpc_call("getmempoolinfo")

    def estimate_smart_fee(self, target_blocks: int = 6) -> Dict[str, Any]:
        return self.rpc_call("estimatesmartfee", [target_blocks])

# Usage
rpc = BitcoinRPCService("http://127.0.0.1:8332", "user", "password")
info = rpc.get_blockchain_info()
print(f"Block height: {info['result']['blocks']}")
```

```cpp
#include <iostream>
#include <string>
#include <curl/curl.h>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

/**
 * Centralized service for Bitcoin node RPC communication
 */
class BitcoinRPCService {
private:
    std::string rpc_url;
    std::string rpc_user;
    std::string rpc_password;
    
    static size_t write_callback(void* contents, size_t size, size_t nmemb, std::string* userp) {
        userp->append((char*)contents, size * nmemb);
        return size * nmemb;
    }

public:
    BitcoinRPCService(const std::string& url, const std::string& user, const std::string& password)
        : rpc_url(url), rpc_user(user), rpc_password(password) {}

    json rpc_call(const std::string& method, const json& params = json::array()) {
        CURL* curl = curl_easy_init();
        std::string response_string;
        
        json payload = {
            {"jsonrpc", "1.0"},
            {"id", "client"},
            {"method", method},
            {"params", params}
        };
        
        std::string post_data = payload.dump();
        std::string auth = rpc_user + ":" + rpc_password;
        
        if (curl) {
            curl_easy_setopt(curl, CURLOPT_URL, rpc_url.c_str());
            curl_easy_setopt(curl, CURLOPT_POSTFIELDS, post_data.c_str());
            curl_easy_setopt(curl, CURLOPT_USERPWD, auth.c_str());
            curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
            curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response_string);
            curl_easy_setopt(curl, CURLOPT_TIMEOUT, 5L);
            
            struct curl_slist* headers = nullptr;
            headers = curl_slist_append(headers, "Content-Type: application/json");
            curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
            
            curl_easy_perform(curl);
            curl_slist_free_all(headers);
            curl_easy_cleanup(curl);
        }
        
        return json::parse(response_string);
    }

    // Convenience methods
    json get_blockchain_info() { return rpc_call("getblockchaininfo"); }
    json get_block_count() { return rpc_call("getblockcount"); }
    json get_block(const std::string& hash, int verbosity = 1) {
        return rpc_call("getblock", {hash, verbosity});
    }
    json get_mempool_info() { return rpc_call("getmempoolinfo"); }
    json estimate_smart_fee(int target_blocks = 6) {
        return rpc_call("estimatesmartfee", {target_blocks});
    }
};

// Usage
int main() {
    BitcoinRPCService rpc("http://127.0.0.1:8332", "user", "password");
    auto info = rpc.get_blockchain_info();
    std::cout << "Block height: " << info["result"]["blocks"] << std::endl;
    return 0;
}
```

```javascript
const axios = require('axios');

class BitcoinRPCService {
  constructor(rpcUrl, rpcUser, rpcPassword) {
    this.rpcUrl = rpcUrl;
    this.auth = { username: rpcUser, password: rpcPassword };
    this.timeout = 5000;
  }

  async rpcCall(method, params = []) {
    const payload = {
      jsonrpc: '1.0',
      id: 'client',
      method: method,
      params: params
    };

    const response = await axios.post(this.rpcUrl, payload, {
      auth: this.auth,
      timeout: this.timeout,
      headers: { 'Content-Type': 'application/json' }
    });

    return response.data;
  }

  // Convenience methods
  async getBlockchainInfo() {
    return this.rpcCall('getblockchaininfo');
  }

  async getBlockCount() {
    return this.rpcCall('getblockcount');
  }

  async getBlock(blockHash, verbosity = 1) {
    return this.rpcCall('getblock', [blockHash, verbosity]);
  }

  async getMempoolInfo() {
    return this.rpcCall('getmempoolinfo');
  }

  async estimateSmartFee(targetBlocks = 6) {
    return this.rpcCall('estimatesmartfee', [targetBlocks]);
  }
}

// Usage
const rpc = new BitcoinRPCService('http://127.0.0.1:8332', 'user', 'password');
const info = await rpc.getBlockchainInfo();
console.log(`Block height: ${info.result.blocks}`);
```
:::

## Essential Node Information Commands

### 1. Blockchain Information

```bash
btc getblockchaininfo
```

**Key fields to monitor:**
- `blocks`: Current block height
- `headers`: Number of headers downloaded
- `verificationprogress`: Sync progress (0.0 to 1.0)
- `initialblockdownload`: Whether still in IBD
- `pruned`: Whether node is pruned

### 2. Network Information

```bash
btc getnetworkinfo
```

**Key fields:**
- `connections`: Total peer connections
- `connections_in`: Incoming connections
- `connections_out`: Outgoing connections
- `version`: Bitcoin Core version
- `subversion`: Detailed version info

### 3. Memory Pool Information

```bash
btc getmempoolinfo
```

**Key fields:**
- `size`: Number of transactions in mempool
- `bytes`: Total mempool size in bytes
- `total_fee`: Total fees in mempool

## Transaction and Block Commands

### 4. Get Block Information

```bash
# Get latest block hash
btc getbestblockhash

# Get block by hash
btc getblock <block_hash>

# Get block by height
btc getblockhash <height>
```

### 5. Transaction Information

```bash
# Get transaction by ID
btc getrawtransaction <txid> true

# Get transaction from mempool
btc getmempoolentry <txid>
```

## Wallet Commands (if wallet is loaded)

### 6. Wallet Information

```bash
# List wallets
btc listwallets

# Get wallet info
btc getwalletinfo

# Get balance
btc getbalance
```

## Advanced Diagnostic Commands

### 7. Index Information

```bash
# Check if transaction index is available
btc getindexinfo
```

### 8. UTXO Set Information

```bash
# Get UTXO set statistics (can be slow)
btc gettxoutsetinfo
```

### 9. Peer Information

```bash
# Get peer information
btc getpeerinfo
```

## Troubleshooting Commands

### 10. Node Status

```bash
# Get general node information
btc getgeneralinfo

# Get memory usage information
btc getmemoryinfo

# Get RPC server information
btc getrpcinfo
```

### 11. Mining Information

```bash
# Get mining information
btc getmininginfo
```

## JSON Output Formatting

To make the output more readable, pipe through `jq`:

```bash
# Install jq if not available: brew install jq
btc getblockchaininfo | jq '{blocks, verificationprogress}'
```

## Indexing and Background Process Monitoring

### 12. Transaction Index Monitoring
```bash
# Check indexing status
btc getindexinfo

# Calculate indexing progress percentage (most useful command)
btc getindexinfo | jq '.txindex.best_block_height / 918464 * 100'

# Check if indexing is complete
btc getindexinfo | jq '.txindex.synced'

# Monitor indexing in real-time (updates every 30 seconds)
watch -n 30 'btc getindexinfo | jq ".txindex.best_block_height"'

# Quick progress check (shows percentage)
btc getindexinfo | jq '.txindex.best_block_height / 918464 * 100'
```

### 13. Wallet Management Commands
```bash
# List all loaded wallets
btc listwallets

# Get info about specific wallet
btc -rpcwallet=<walletname> getwalletinfo

# Unload a wallet (removes from memory)
btc unloadwallet <walletname>

# Load a wallet
btc loadwallet <walletname>

# Get transactions from specific wallet
btc -rpcwallet=<walletname> listtransactions "*" 100

# Get balance from specific wallet
btc -rpcwallet=<walletname> getbalance
```

### 14. Log Monitoring
```bash
# Check recent indexing progress in logs
tail -20 ~/.bitcoin/debug.log | grep -i index

# Monitor logs in real-time
tail -f ~/.bitcoin/debug.log | grep -i index

# Check for errors in logs
grep -i error ~/.bitcoin/debug.log | tail -10
```

### 15. Pruning Status
```bash
# Check if node is pruned
btc getblockchaininfo | jq '{pruned, pruneheight}'

# Get UTXO set info (can be slow)
btc gettxoutsetinfo | jq '{total_amount, transactions, height}'
```

## Useful Resources

### Block Explorers and Monitoring

- **[mempool.space](https://mempool.space)** - Real-time Bitcoin mempool and block explorer
- **[Clark Moody's Bitcoin Dashboard](https://dashboard.clarkmoody.com)** - Bitcoin metrics and analytics
- **[Bitcoin Core GitHub](https://github.com/bitcoin/bitcoin)** - Bitcoin Core source code repository

### Additional Tools

- Use block explorers to verify transactions
- Monitor network metrics and statistics
- Track mempool activity and fee rates
- Analyze blockchain data

## Troubleshooting Commands

### 16. Connection and Sync Issues
```bash
# Test RPC connection
btc getblockchaininfo | jq '.chain'

# Check network status
btc getnetworkinfo | jq '{connections, connections_in, connections_out}'

# Verify wallet is accessible
btc getwalletinfo | jq '{walletname, txcount, balance}'

# Check if node is still syncing
btc getblockchaininfo | jq '{verificationprogress, initialblockdownload}'
```

## 11. ZMQ Notifications

ZeroMQ (ZMQ) provides real-time notifications for blockchain events, enabling instant detection of new blocks and transactions without polling.

### Configuration
Add to your `bitcoin.conf`:
```ini
# ZMQ Notifications
zmqpubhashblock=tcp://127.0.0.1:28332
zmqpubhashtx=tcp://127.0.0.1:28333
zmqpubrawblock=tcp://127.0.0.1:28334
zmqpubrawtx=tcp://127.0.0.1:28335
```

### Benefits
- **Instant notifications** - No polling delays
- **Lower resource usage** - No constant RPC calls
- **Better reliability** - Catches blocks even after node restarts
- **Real-time monitoring** - Perfect for blockchain monitoring applications

### Usage with Monitor
```bash
# The monitor automatically tries ZMQ first, falls back to polling
python3 scripts/monitor_blockchain.py --continuous

# Custom ZMQ endpoint
python3 scripts/monitor_blockchain.py --continuous --zmq-endpoint tcp://127.0.0.1:28332
```

### Verification
```bash
# Check if ZMQ is enabled in Bitcoin logs
grep -i zmq ~/.bitcoin/debug.log

# Check Bitcoin help for ZMQ options
bitcoind -h | grep zmq
```
