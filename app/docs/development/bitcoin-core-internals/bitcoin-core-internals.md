# Bitcoin Core Internals

Bitcoin Core is the reference implementation of Bitcoin. Understanding its internal architecture helps developers contribute to Bitcoin Core, build compatible software, and debug issues.

## Architecture Overview

### Core Components

```text
Bitcoin Core:
├── Consensus Engine
│   ├── Validation
│   ├── Block processing
│   └── Chain state
├── Network Layer
│   ├── P2P protocol
│   ├── Peer management
│   └── Message handling
├── Wallet System
│   ├── Key management
│   ├── Transaction creation
│   └── UTXO tracking
└── RPC Interface
    ├── JSON-RPC API
    ├── Command handling
    └── Response formatting
```

---

## Key Subsystems

### 1. Consensus Engine

Validates transactions and blocks:

```text
Responsibilities:
- Verify transaction validity
- Check block validity
- Maintain chain state
- Enforce consensus rules
```

### 2. UTXO Set

Tracks unspent transaction outputs:

```text
Structure:
- Database: LevelDB
- Index: Transaction outputs
- Updates: On each block
- Size: ~5-10GB
```

### 3. Mempool

Manages unconfirmed transactions:

```text
Features:
- Transaction storage
- Fee-based prioritization
- Eviction policies
- Size limits
```

### 4. Block Storage

Stores blockchain data:

```text
Formats:
- blk*.dat: Raw block data
- rev*.dat: Undo data
- Chainstate: UTXO set
```

---

## Database Systems

### LevelDB

Used for:

- **Chainstate**: UTXO set
- **Block index**: Block metadata
- **Wallet**: Transaction history

### Flat Files

Used for:

- **Blocks**: Raw block data (blk*.dat)
- **Undo**: Block undo data (rev*.dat)

---

## Code Structure

### Key Directories

```text
src/
├── consensus/     - Consensus validation
├── net/          - Network layer
├── wallet/       - Wallet functionality
├── rpc/          - RPC interface
├── script/       - Script execution
└── validation/   - Block/transaction validation
```

---

## Related Topics

- [Node Types](/docs/development/node-types) - Different node configurations
- [RPC Commands](/docs/bitcoin/rpc) - API interface
- [P2P Network Protocol](/docs/bitcoin/p2p-protocol) - Network communication

---

## Resources

- [Bitcoin Core GitHub](https://github.com/bitcoin/bitcoin)
- [Developer Documentation](https://github.com/bitcoin/bitcoin/tree/master/doc)
