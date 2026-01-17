# Bitcoin Forks: Soft Forks and Hard Forks

## Overview

Bitcoin has undergone several protocol upgrades through both soft forks and hard forks. This document provides a comprehensive table of all major forks in Bitcoin's history.

## Understanding Forks

### Soft Fork
A **soft fork** is a backward-compatible change to the protocol. Old nodes can still validate new blocks, but new features are only available to upgraded nodes.

**Characteristics:**
- Backward compatible
- Old nodes accept new blocks
- New rules are more restrictive
- No chain split (if properly activated)

### Hard Fork
A **hard fork** is a non-backward-compatible change. Old nodes will reject blocks following new rules, creating a permanent chain split.

**Characteristics:**
- Not backward compatible
- Old nodes reject new blocks
- Creates permanent chain split
- Requires all nodes to upgrade (or split into separate chains)

## Complete Fork History Table

| Date | Block Height | Type | Name | BIP(s) | Description | Status |
|------|--------------|------|------|--------|-------------|--------|
| **2009-01-03** | 0 | - | Genesis Block | - | Bitcoin network launch | ✅ Active |
| **2010-08-15** | 74,638 | Hard Fork | Value Overflow Incident | - | Fixed integer overflow bug | ✅ Resolved |
| **2012-04-01** | 173,805 | Soft Fork | P2SH (Pay-to-Script-Hash) | [BIP 16](https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki) | Enabled complex scripts via script hashes | ✅ Active |
| **2013-03-12** | 225,430 | Soft Fork | Strict DER Encoding | [BIP 66](https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki) | Required strict DER signature encoding | ✅ Active |
| **2013-05-15** | 250,000 | Soft Fork | Strict Multisig | [BIP 65](https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki) | Required NULLDUMMY in multisig | ✅ Active |
| **2015-12-08** | 388,381 | Soft Fork | CLTV (CheckLockTimeVerify) | [BIP 65](https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki) | Enabled absolute time locks | ✅ Active |
| **2016-07-04** | 419,328 | Soft Fork | CSV (CheckSequenceVerify) | [BIP 112](https://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki), [BIP 68](https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki), [BIP 113](https://github.com/bitcoin/bips/blob/master/bip-0113.mediawiki) | Enabled relative time locks | ✅ Active |
| **2017-08-01** | 478,558 | Hard Fork | Bitcoin Cash | - | Increased block size to 8 MB | 🔀 Split Chain |
| **2017-08-24** | 481,824 | Soft Fork | Segregated Witness (SegWit) | [BIP 141](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki), [BIP 143](https://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki), [BIP 144](https://github.com/bitcoin/bips/blob/master/bip-0144.mediawiki), [BIP 148](https://github.com/bitcoin/bips/blob/master/bip-0148.mediawiki) | Separated witness data, fixed malleability | ✅ Active |
| **2018-11-15** | 556,766 | Hard Fork | Bitcoin SV | - | Bitcoin Cash fork, increased to 128 MB blocks | 🔀 Split Chain |
| **2021-11-14** | 709,632 | Soft Fork | Taproot | [BIP 341](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki), [BIP 342](https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki), [BIP 340](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki) | Schnorr signatures, improved privacy | ✅ Active |

## Detailed Fork Information

### Soft Forks

#### P2SH (Pay-to-Script-Hash) - 2012
- **Activation**: Block 173,805 (April 1, 2012)
- **BIP**: [BIP 16](https://github.com/bitcoin/bips/blob/master/bip-0016.mediawiki)
- **Purpose**: Enabled complex scripts without burdening senders
- **Impact**: Made multisig and other complex scripts practical
- **Status**: ✅ Fully activated and widely used

#### CLTV (CheckLockTimeVerify) - 2015
- **Activation**: Block 388,381 (December 8, 2015)
- **BIP**: [BIP 65](https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki)
- **Purpose**: Enabled absolute time locks
- **Impact**: Enabled escrow, inheritance, and time-based contracts
- **Status**: ✅ Fully activated

#### CSV (CheckSequenceVerify) - 2016
- **Activation**: Block 419,328 (July 4, 2016)
- **BIPs**: [BIP 112](https://github.com/bitcoin/bips/blob/master/bip-0112.mediawiki), [BIP 68](https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki), [BIP 113](https://github.com/bitcoin/bips/blob/master/bip-0113.mediawiki)
- **Purpose**: Enabled relative time locks
- **Impact**: Critical for Lightning Network payment channels
- **Status**: ✅ Fully activated

#### Segregated Witness (SegWit) - 2017
- **Activation**: Block 481,824 (August 24, 2017)
- **BIPs**: [BIP 141](https://github.com/bitcoin/bips/blob/master/bip-0141.mediawiki), [BIP 143](https://github.com/bitcoin/bips/blob/master/bip-0143.mediawiki), [BIP 144](https://github.com/bitcoin/bips/blob/master/bip-0144.mediawiki)
- **Purpose**: 
  - Fixed transaction malleability
  - Increased effective block capacity
  - Separated witness data
- **Impact**: Enabled Lightning Network, improved scalability
- **Status**: ✅ Fully activated (~80% of transactions use SegWit)

#### Taproot - 2021
- **Activation**: Block 709,632 (November 14, 2021)
- **BIPs**: 
  - [BIP 340](https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki) - Schnorr Signatures
  - [BIP 341](https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki) - Taproot
  - [BIP 342](https://github.com/bitcoin/bips/blob/master/bip-0342.mediawiki) - Tapscript
- **Purpose**: 
  - Improved privacy (all spends look the same)
  - Better efficiency (smaller transactions)
  - More flexible scripting
- **Impact**: Growing adoption, enables more complex smart contracts
- **Status**: ✅ Fully activated (~5-10% adoption)

### Hard Forks

#### Value Overflow Incident - 2010
- **Block**: 74,638 (August 15, 2010)
- **Type**: Emergency hard fork
- **Purpose**: Fixed integer overflow bug that created 184 billion BTC
- **Impact**: Prevented catastrophic inflation
- **Status**: ✅ Resolved (bug fixed, invalid blocks rejected)

#### Bitcoin Cash - 2017
- **Block**: 478,558 (August 1, 2017)
- **Type**: Contentious hard fork
- **Purpose**: Increased block size from 1 MB to 8 MB
- **Reason**: Disagreement over scaling approach
- **Impact**: Created separate blockchain (BCH)
- **Status**: 🔀 Separate chain (Bitcoin Cash)

#### Bitcoin SV - 2018
- **Block**: 556,766 (November 15, 2018)
- **Type**: Hard fork of Bitcoin Cash
- **Purpose**: Increased block size to 128 MB, restored original opcodes
- **Reason**: Disagreement within Bitcoin Cash community
- **Impact**: Created separate blockchain (BSV)
- **Status**: 🔀 Separate chain (Bitcoin SV)

## Activation Mechanisms

### Soft Fork Activation Methods

1. **BIP 9 (Version Bits)**
   - Used for: CSV, SegWit, Taproot
   - Requires: 95% of blocks signal support
   - Grace period: 2016 blocks (~2 weeks)
   - Example: Taproot activated via BIP 9

2. **IsSuperMajority (Legacy)**
   - Used for: P2SH, CLTV
   - Requires: 75% of last 1000 blocks
   - Example: P2SH activated via IsSuperMajority

3. **User-Activated Soft Fork (UASF)**
   - Used for: SegWit (BIP 148)
   - Community-driven activation
   - Example: SegWit UASF movement

### Hard Fork Activation

Hard forks typically require:
- All nodes to upgrade simultaneously
- Or acceptance of chain split
- Coordination among miners and nodes

## Fork Statistics

### Soft Fork Adoption

| Fork | Activation Date | Current Usage | Adoption Rate |
|------|----------------|--------------|---------------|
| P2SH | 2012-04-01 | Multisig, complex scripts | ~15-20% of transactions |
| CLTV | 2015-12-08 | Time locks, escrow | ~1-2% of transactions |
| CSV | 2016-07-04 | Lightning Network | Critical for LN |
| SegWit | 2017-08-24 | Most transactions | ~80% of transactions |
| Taproot | 2021-11-14 | Modern wallets | ~5-10% of transactions |

### Hard Fork Results

| Fork | Original Chain | New Chain | Current Status |
|------|----------------|-----------|----------------|
| Bitcoin Cash | Bitcoin (BTC) | Bitcoin Cash (BCH) | Both chains active |
| Bitcoin SV | Bitcoin Cash (BCH) | Bitcoin SV (BSV) | Both chains active |

## Timeline Visualization

```
2009 ──────────────────────────────────────────────────────────────
     │ Genesis Block
     │
2010 ──────────────────────────────────────────────────────────────
     │ Value Overflow Fix (Hard Fork)
     │
2012 ──────────────────────────────────────────────────────────────
     │ P2SH (Soft Fork)
     │
2013 ──────────────────────────────────────────────────────────────
     │ Strict DER, Strict Multisig (Soft Forks)
     │
2015 ──────────────────────────────────────────────────────────────
     │ CLTV (Soft Fork)
     │
2016 ──────────────────────────────────────────────────────────────
     │ CSV (Soft Fork)
     │
2017 ──────────────────────────────────────────────────────────────
     │ Bitcoin Cash (Hard Fork) ──► BCH
     │ SegWit (Soft Fork)
     │
2018 ──────────────────────────────────────────────────────────────
     │ Bitcoin SV (Hard Fork) ──► BSV
     │
2021 ──────────────────────────────────────────────────────────────
     │ Taproot (Soft Fork)
     │
2024+ ──────────────────────────────────────────────────────────────
     │ Future upgrades...
```

## Key Takeaways

1. **Soft Forks are Preferred**: All major protocol upgrades since 2012 have been soft forks
2. **Backward Compatibility**: Soft forks maintain backward compatibility
3. **Hard Forks Create Splits**: Hard forks result in permanent chain splits
4. **Activation Methods**: Different activation mechanisms (BIP 9, IsSuperMajority, UASF)
5. **Gradual Adoption**: New features take time to reach full adoption

## Future Forks

### Potential Future Soft Forks

- **Covenants**: Restrict how coins can be spent
- **OP_CTV (CheckTemplateVerify)**: Transaction templates
- **SIGHASH_ANYPREVOUT**: More flexible signature types
- **Ephemeral Anchors**: Lightning Network improvements

### Discussion Topics

- **Block size increases**: Unlikely (consensus favors SegWit/Taproot)
- **New opcodes**: Possible via soft fork
- **Script improvements**: Ongoing discussion

For more details on script types and their evolution, see [Script System](/docs/bitcoin/script).

## References

- [Bitcoin BIPs Repository](https://github.com/bitcoin/bips)
- [Bitcoin Core Release Notes](https://bitcoincore.org/en/releases/)
- [Bitcoin Wiki - Forks](https://en.bitcoin.it/wiki/Forks)
- [UASF (User-Activated Soft Fork) History](https://en.bitcoin.it/wiki/UASF)
