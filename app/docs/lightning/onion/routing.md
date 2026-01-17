# Lightning Onion Routing

## Overview

Lightning Network uses Sphinx onion routing to provide privacy and security for payments. Each hop in a route only knows the previous and next hop, not the full route or payment details.

## What is Onion Routing?

Onion routing is a technique where data is encrypted in layers, like an onion. Each hop peels off one layer, revealing only the information needed for that hop.

### Key Properties

- **Privacy**: Each hop only knows immediate neighbors
- **Integrity**: HMACs prevent tampering
- **Source Hiding**: Sender identity is hidden
- **Path Hiding**: Full route is not revealed

## Sphinx Protocol

Lightning uses the Sphinx protocol (based on Tor's design) adapted for payment routing.

### How It Works

1. **Sender creates onion**: Encrypts payment data in layers
2. **Each hop processes**: Peels off one layer, forwards to next
3. **Final hop**: Receives payment details
4. **Response path**: Preimage propagates back (unencrypted)

### Visual Representation

```
Onion Packet Structure:
┌─────────────────────────────────────┐
│ Layer 1 (for Hop 1)                │
│  ┌───────────────────────────────┐  │
│  │ Layer 2 (for Hop 2)           │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │ Layer 3 (for Hop 3)      │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │ Payment Data      │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

## Onion Packet Structure

### Components

1. **Version**: Protocol version (currently 0)
2. **Public Key**: Ephemeral public key for this hop
3. **HMAC**: Message authentication code
4. **Payload**: Encrypted routing data
5. **Routing Information**: Next hop details

### Per-Hop Data

Each layer contains:
- **Short Channel ID**: Channel to use
- **Amount to Forward**: HTLC amount
- **Outgoing CLTV**: Expiry for outgoing HTLC
- **Payment Data**: TLV fields (for final hop)

## Encryption Process

### Layer Construction

For each hop, sender:
1. **Generate ephemeral key**: Create temporary key pair
2. **ECDH**: Derive shared secret with hop's public key
3. **Encrypt payload**: Use shared secret to encrypt data
4. **Add HMAC**: Create authentication code
5. **Wrap in next layer**: Encrypt for previous hop

### Cryptographic Primitives

- **ECDH**: Elliptic Curve Diffie-Hellman (key exchange)
- **ChaCha20**: Stream cipher (encryption)
- **HMAC-SHA256**: Message authentication
- **XOR**: Exclusive OR (mixing)

## Processing at Each Hop

### Hop 1 (First Hop)

1. **Receive onion**: Get encrypted packet
2. **ECDH**: Derive shared secret with ephemeral key
3. **Decrypt**: Peel off outer layer
4. **Verify HMAC**: Check message integrity
5. **Extract data**: Get routing information
6. **Forward**: Send to next hop

### Intermediate Hops

Same process:
1. Receive onion
2. Decrypt layer
3. Verify HMAC
4. Extract routing info
5. Forward to next hop

### Final Hop

1. Receive onion
2. Decrypt final layer
3. Verify HMAC
4. Extract payment data
5. Create HTLC
6. Reveal preimage (when payment received)

## Privacy Guarantees

### What Each Hop Knows

**Intermediate Hops:**
- Previous hop (who sent to them)
- Next hop (where to forward)
- HTLC amount and expiry
- **NOT**: Sender identity
- **NOT**: Final destination
- **NOT**: Full route
- **NOT**: Total payment amount

**Final Hop:**
- Previous hop
- Payment amount
- Payment data (TLV)
- **NOT**: Sender identity
- **NOT**: Full route

### What is Hidden

- **Sender identity**: Not revealed to any hop
- **Full route**: Each hop only knows neighbors
- **Payment purpose**: Not visible to intermediate hops
- **Total amount**: Intermediate hops don't know final amount

## Security Properties

### Integrity

- **HMAC verification**: Each hop verifies message hasn't been tampered
- **Replay protection**: Prevents replay attacks
- **Tamper detection**: Any modification is detected

### Authentication

- **Public keys**: Each hop identified by public key
- **Key derivation**: Shared secrets derived from public keys
- **No impersonation**: Can't fake hop identity

### Forward Secrecy

- **Ephemeral keys**: Each payment uses new keys
- **No correlation**: Can't link payments
- **Temporary secrets**: Keys only valid for one payment

## Onion Packet Size

### Fixed Size

- **1300 bytes**: Standard onion packet size
- **Fixed regardless of route length**: Same size for 2 hops or 20 hops
- **Padding**: Unused space filled with random data

### Why Fixed Size?

- **Traffic analysis resistance**: Can't determine route length
- **Uniform appearance**: All packets look the same
- **Privacy**: Route length is hidden

## Implementation Details

### Session Key

Sender generates random session key for each payment:
- **32 bytes**: Random value
- **Used for**: Deriving shared secrets
- **Ephemeral**: Only used for this payment

### Associated Data

Additional data included in encryption:
- **32 bytes**: Payment-related data
- **Included in**: HMAC calculation
- **Purpose**: Additional authentication

### Payload Construction

For each hop:
1. Create payload with routing info
2. Encrypt with shared secret
3. Add HMAC
4. Wrap in previous layer

## Common Issues

### HMAC Verification Failure

**Problem**: HMAC doesn't match

**Causes**:
- Tampering
- Encryption error
- Key derivation error

**Solution**: Reject packet, payment fails

### Decryption Failure

**Problem**: Can't decrypt layer

**Causes**:
- Wrong key
- Corrupted packet
- Version mismatch

**Solution**: Reject packet, payment fails

## Best Practices

### For Implementers

1. **Follow spec**: Implement BOLT 4 exactly
2. **Test vectors**: Use provided test vectors
3. **Cryptographic primitives**: Use secure implementations
4. **Error handling**: Handle failures gracefully

### For Users

1. **Trust routing**: Onion routing handles privacy
2. **Route selection**: Choose diverse routes
3. **Payment size**: Vary payment sizes
4. **Timing**: Vary payment timing

## Summary

Onion routing provides:

- **Privacy**: Each hop only knows neighbors
- **Security**: HMACs prevent tampering
- **Source hiding**: Sender identity protected
- **Path hiding**: Full route not revealed
- **Fixed size**: Route length hidden

Understanding onion routing helps explain how Lightning provides privacy while enabling efficient payment routing.
