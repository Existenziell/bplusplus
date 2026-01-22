# Transaction Fees

Transaction fees are payments made to miners for including transactions in blocks. Understanding how fees work is essential for ensuring your transactions confirm in a timely manner.

## Why Fees Exist

Fees serve multiple purposes:

1. **Incentivize miners**: Reward miners for processing transactions
2. **Prevent spam**: Make it expensive to flood the network
3. **Prioritize transactions**: Higher fees = faster confirmation
4. **Economic security**: Fees will replace block rewards over time

---

## Fee Calculation

### Fee Rate

Fees are calculated based on **fee rate** (satoshis per virtual byte):

```text
Fee = Transaction Size (vbytes) × Fee Rate (sat/vB)

Example:
- Transaction size: 250 vbytes
- Fee rate: 10 sat/vB
- Total fee: 2,500 satoshis (0.000025 BTC)
```

### Virtual Size (vbytes)

Since SegWit, transactions use **virtual size** instead of raw bytes:

```text
Virtual Size = Weight / 4

Where:
Weight = (Base Size × 4) + Total Size

Base Size: Transaction without witness data
Total Size: Transaction with witness data
```

---

## Fee Estimation

### Methods

Wallets estimate fees using several approaches:

1. **Mempool analysis**: Look at pending transactions
2. **Fee estimation APIs**: Services like mempool.space
3. **Bitcoin Core RPC**: `estimatesmartfee` command
4. **Historical data**: Analyze past fee patterns

### Fee Targets

Common confirmation targets:

| Target | Description | Typical Fee Rate |
|--------|-------------|-----------------|
| **Next block** | Highest priority | 50-200+ sat/vB |
| **3 blocks** | ~30 minutes | 20-50 sat/vB |
| **6 blocks** | ~1 hour | 10-20 sat/vB |
| **Economy** | No rush | 1-10 sat/vB |

---

## Code Examples

### Estimating Fees

:::code-group
```rust
use serde_json::json;
use reqwest;

async fn estimate_fee_rate() -> Result<u64, Box<dyn std::error::Error>> {
    let response = reqwest::get(
        "https://mempool.space/api/v1/fees/recommended"
    ).await?;
    
    let fees: serde_json::Value = response.json().await?;
    let fee_rate = fees["fastestFee"].as_u64().unwrap();
    
    Ok(fee_rate)
}
```

```python
import requests

def estimate_fee_rate():
    """Estimate fee rate from mempool.space API."""
    response = requests.get(
        "https://mempool.space/api/v1/fees/recommended"
    )
    fees = response.json()
    return fees["fastestFee"]  # sat/vB
```

```cpp
#include <curl/curl.h>
#include <json/json.h>

size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* data) {
    data->append((char*)contents, size * nmemb);
    return size * nmemb;
}

int estimate_fee_rate() {
    CURL* curl = curl_easy_init();
    std::string response_data;
    
    curl_easy_setopt(curl, CURLOPT_URL, 
        "https://mempool.space/api/v1/fees/recommended");
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response_data);
    curl_easy_perform(curl);
    
    Json::Value root;
    Json::Reader reader;
    reader.parse(response_data, root);
    
    return root["fastestFee"].asInt();
}
```

```go
package main

import (
	"encoding/json"
	"io"
	"net/http"
)

type FeeRecommendation struct {
	FastestFee  int `json:"fastestFee"`
	HalfHourFee int `json:"halfHourFee"`
	HourFee     int `json:"hourFee"`
}

func estimateFeeRate() (int, error) {
	resp, err := http.Get("https://mempool.space/api/v1/fees/recommended")
	if err != nil {
		return 0, err
	}
	defer resp.Body.Close()
	
	body, _ := io.ReadAll(resp.Body)
	var fees FeeRecommendation
	json.Unmarshal(body, &fees)
	
	return fees.FastestFee, nil
}
```

```javascript
async function estimateFeeRate() {
    const response = await fetch(
        'https://mempool.space/api/v1/fees/recommended'
    );
    const fees = await response.json();
    return fees.fastestFee; // sat/vB
}
```
:::

### Calculating Transaction Fee

:::code-group
```rust
fn calculate_fee(tx_size_vbytes: usize, fee_rate_sat_per_vb: u64) -> u64 {
    (tx_size_vbytes as u64) * fee_rate_sat_per_vb
}

fn calculate_fee_for_outputs(
    input_count: usize,
    output_count: usize,
    fee_rate: u64,
) -> u64 {
    // Estimate transaction size
    let base_size = 10; // Overhead
    let input_size = 148; // P2PKH input
    let output_size = 34; // P2PKH output
    
    let estimated_size = base_size + 
        (input_count * input_size) + 
        (output_count * output_size);
    
    calculate_fee(estimated_size, fee_rate)
}
```

```python
def calculate_fee(tx_size_vbytes, fee_rate_sat_per_vb):
    """Calculate fee for transaction."""
    return tx_size_vbytes * fee_rate_sat_per_vb

def calculate_fee_for_outputs(input_count, output_count, fee_rate):
    """Estimate fee based on input/output counts."""
    base_size = 10  # Overhead
    input_size = 148  # P2PKH input
    output_size = 34  # P2PKH output
    
    estimated_size = (base_size + 
                      (input_count * input_size) + 
                      (output_count * output_size))
    
    return calculate_fee(estimated_size, fee_rate)
```

```cpp
uint64_t calculate_fee(size_t tx_size_vbytes, uint64_t fee_rate_sat_per_vb) {
    return tx_size_vbytes * fee_rate_sat_per_vb;
}

uint64_t calculate_fee_for_outputs(
    size_t input_count,
    size_t output_count,
    uint64_t fee_rate
) {
    size_t base_size = 10;  // Overhead
    size_t input_size = 148;  // P2PKH input
    size_t output_size = 34;  // P2PKH output
    
    size_t estimated_size = base_size + 
        (input_count * input_size) + 
        (output_count * output_size);
    
    return calculate_fee(estimated_size, fee_rate);
}
```

```go
func calculateFee(txSizeVBytes int, feeRateSatPerVB int64) int64 {
    return int64(txSizeVBytes) * feeRateSatPerVB
}

func calculateFeeForOutputs(
    inputCount, outputCount int,
    feeRate int64,
) int64 {
    baseSize := 10  // Overhead
    inputSize := 148  // P2PKH input
    outputSize := 34  // P2PKH output
    
    estimatedSize := baseSize + 
        (inputCount * inputSize) + 
        (outputCount * outputSize)
    
    return calculateFee(estimatedSize, feeRate)
}
```

```javascript
function calculateFee(txSizeVBytes, feeRateSatPerVB) {
    return txSizeVBytes * feeRateSatPerVB;
}

function calculateFeeForOutputs(inputCount, outputCount, feeRate) {
    const baseSize = 10;  // Overhead
    const inputSize = 148;  // P2PKH input
    const outputSize = 34;  // P2PKH output
    
    const estimatedSize = baseSize + 
        (inputCount * inputSize) + 
        (outputCount * outputSize);
    
    return calculateFee(estimatedSize, feeRate);
}
```
:::

---

## Fee Bumping

### Replace-by-Fee (RBF)

RBF allows replacing an unconfirmed transaction with a higher-fee version:

```text
Original Transaction:
- Fee: 5 sat/vB
- Status: Unconfirmed

Replacement Transaction:
- Same inputs/outputs
- Higher fee: 20 sat/vB
- Replaces original
```

### Child Pays for Parent (CPFP)

CPFP uses a child transaction to pay for a stuck parent:

```text
Parent Transaction:
- Fee: 2 sat/vB (too low)
- Status: Stuck

Child Transaction:
- Spends parent's output
- High fee: 50 sat/vB
- Covers both transactions
- Both get confirmed
```

---

## Fee Market Dynamics

### Supply and Demand

```text
High Demand (many transactions):
- Mempool fills up
- Fees increase
- Users compete for block space

Low Demand (few transactions):
- Mempool empties
- Fees decrease
- Even low fees confirm quickly
```

### Historical Patterns

Fees fluctuate based on:

- **Network activity**: More users = higher fees
- **Block space competition**: Limited space = bidding war
- **Market events**: Price movements affect activity
- **Time of day**: Regional usage patterns

---

## Best Practices

### For Users

1. **Use fee estimation**: Don't guess fees
2. **Choose appropriate priority**: Don't overpay for non-urgent transactions
3. **Use SegWit/Taproot**: Lower fees for same functionality
4. **Monitor mempool**: Check current conditions before sending

### For Developers

1. **Implement fee estimation**: Use APIs or RPC
2. **Support RBF**: Allow fee bumping
3. **Handle fee errors**: Gracefully handle insufficient fees
4. **Test fee logic**: Verify calculations are correct

---

## Related Topics

- [Mempool](/docs/mining/mempool) - Where transactions wait
- [Block Construction](/docs/mining/block-construction) - How miners select transactions
- [SegWit](/docs/bitcoin/segwit) - Lower fees through weight units
- [Transaction Lifecycle](/docs/bitcoin/transaction-lifecycle) - Transaction states

---

## Resources

- [mempool.space](https://mempool.space) - Fee estimation and mempool visualization
- [Bitcoin Core RPC: estimatesmartfee](https://developer.bitcoin.org/reference/rpc/estimatesmartfee.html)
