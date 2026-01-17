# Bitcoin Price Tracking

## Overview

Integrating Bitcoin price data into applications requires API integration, caching strategies, and handling rate limits. This guide covers best practices.

## API Providers

### CoinGecko

**Advantages:**
- Free tier available
- Good rate limits
- Historical data
- Multiple currencies

**Example:**

```python
import requests

def get_price_coingecko():
    url = "https://api.coingecko.com/api/v3/simple/price"
    params = {
        "ids": "bitcoin",
        "vs_currencies": "usd,eur"
    }
    response = requests.get(url, params=params)
    return response.json()
```

### Yahoo Finance

**Advantages:**
- Free
- Real-time data
- Historical data
- Multiple currencies

**Example:**

```python
import yfinance as yf

def get_price_yahoo():
    btc = yf.Ticker("BTC-USD")
    data = btc.history(period="1d")
    return data['Close'].iloc[-1]
```

## Centralized Price Service

### Service Architecture

**Benefits:**
- Single source of truth
- Caching reduces API calls
- Fallback mechanisms
- Rate limit management

**Implementation:**

```python
class BitcoinPriceService:
    def __init__(self):
        self.cache = {}
        self.cache_duration = 60  # seconds
        self.rate_limiter = RateLimiter()
    
    def get_price(self, currency='USD'):
        # Check cache first
        cache_key = f"price_{currency}"
        if cache_key in self.cache:
            cached_price, timestamp = self.cache[cache_key]
            if time.time() - timestamp < self.cache_duration:
                return cached_price
        
        # Try CoinGecko first
        try:
            price = self._get_price_coingecko(currency)
            self.cache[cache_key] = (price, time.time())
            return price
        except Exception:
            # Fallback to Yahoo Finance
            price = self._get_price_yahoo(currency)
            self.cache[cache_key] = (price, time.time())
            return price
```

## Caching Strategies

### In-Memory Caching

**Simple Cache:**

```python
import time

cache = {}
CACHE_DURATION = 60  # seconds

def get_cached_price(currency):
    key = f"price_{currency}"
    if key in cache:
        price, timestamp = cache[key]
        if time.time() - timestamp < CACHE_DURATION:
            return price
    return None
```

### Cache Invalidation

**Time-Based:**

```python
def is_cache_valid(timestamp, duration):
    return time.time() - timestamp < duration
```

**Event-Based:**

```python
def invalidate_cache():
    cache.clear()
```

## Rate Limiting

### Implementing Rate Limits

**Simple Rate Limiter:**

```python
import time
from collections import deque

class RateLimiter:
    def __init__(self, max_calls=10, period=60):
        self.max_calls = max_calls
        self.period = period
        self.calls = deque()
    
    def can_call(self):
        now = time.time()
        # Remove old calls
        while self.calls and self.calls[0] < now - self.period:
            self.calls.popleft()
        
        if len(self.calls) < self.max_calls:
            self.calls.append(now)
            return True
        return False
```

### Respecting API Limits

**Best Practices:**
- Check rate limits before calling
- Implement exponential backoff
- Use caching to reduce calls
- Monitor API usage

## Multi-Source Fallbacks

### Fallback Chain

**Priority Order:**

1. **Primary**: CoinGecko (best rate limits)
2. **Secondary**: Yahoo Finance (backup)
3. **Tertiary**: Local cache (if available)

**Implementation:**

```python
def get_price_with_fallback(currency='USD'):
    # Try primary source
    try:
        return get_price_coingecko(currency)
    except Exception as e:
        print(f"CoinGecko failed: {e}")
    
    # Try secondary source
    try:
        return get_price_yahoo(currency)
    except Exception as e:
        print(f"Yahoo Finance failed: {e}")
    
    # Try cache
    cached = get_cached_price(currency)
    if cached:
        return cached
    
    # All failed
    raise Exception("All price sources failed")
```

## Error Handling

### API Errors

**Handle Common Errors:**

```python
def get_price_safe(currency='USD'):
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.Timeout:
        # Handle timeout
        return get_cached_price(currency)
    except requests.exceptions.HTTPError as e:
        # Handle HTTP errors
        if e.response.status_code == 429:
            # Rate limited, use cache
            return get_cached_price(currency)
        raise
    except Exception as e:
        # Handle other errors
        return get_cached_price(currency)
```

## Thread Safety

### Concurrent Access

**Thread-Safe Cache:**

```python
import threading

class ThreadSafePriceService:
    def __init__(self):
        self.cache = {}
        self.lock = threading.Lock()
    
    def get_price(self, currency='USD'):
        with self.lock:
            # Check cache
            if currency in self.cache:
                price, timestamp = self.cache[currency]
                if time.time() - timestamp < 60:
                    return price
            
            # Fetch new price
            price = self._fetch_price(currency)
            self.cache[currency] = (price, time.time())
            return price
```

## Best Practices

### For Developers

1. **Use Caching**: Reduce API calls
2. **Implement Fallbacks**: Multiple data sources
3. **Rate Limiting**: Respect API limits
4. **Error Handling**: Handle all error cases
5. **Thread Safety**: Support concurrent access

### For Performance

1. **Cache Duration**: Balance freshness vs. API calls
2. **Batch Requests**: Request multiple currencies at once
3. **Connection Pooling**: Reuse HTTP connections
4. **Async Operations**: Use async/await for I/O

## Common Issues

### Rate Limit Exceeded

**Problem**: API rate limit reached

**Solutions:**
- Implement caching
- Use multiple API sources
- Reduce request frequency
- Upgrade API tier (if available)

### Stale Data

**Problem**: Cached data too old

**Solutions:**
- Reduce cache duration
- Implement cache invalidation
- Add timestamp checks
- Force refresh option

### API Downtime

**Problem**: API service unavailable

**Solutions:**
- Implement fallback sources
- Use cached data
- Retry with exponential backoff
- Monitor API status

## Summary

Price tracking requires:

- **API Integration**: Multiple data sources
- **Caching**: Reduce API calls and improve performance
- **Rate Limiting**: Respect API limits
- **Fallbacks**: Multiple sources for reliability
- **Error Handling**: Handle all error cases
- **Thread Safety**: Support concurrent access

Understanding price tracking helps build robust applications that integrate Bitcoin price data efficiently.
