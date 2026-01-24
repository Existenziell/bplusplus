# Miniscript

**Miniscript** is a structured language for writing [Bitcoin Script](/docs/bitcoin/script) that is easier to analyze, compose, and reason about than raw Script. It maps to a well-defined subset of [Script](/docs/bitcoin/script) and provides guarantees about spending conditions, costs, and the number and type of [signatures](/docs/bitcoin/cryptography) required.

## Why Miniscript?

Raw [Bitcoin Script](/docs/bitcoin/op-codes) is flexible but hard to work with:

- **Opaque**: Deciding what a script does, what can satisfy it, and how much it costs requires careful analysis.
- **Brittle**: Small changes can produce invalid or unexpected scripts.
- **Composition**: Combining scripts (e.g., "2-of-3 OR after 90 days") is error-prone when done by hand.

Miniscript addresses this by:

- **Policy vs. script**: You express a *policy* (high-level spending conditions); Miniscript compiles it to Script.
- **Fragments**: A small set of composable *fragments* (e.g., `pk`, `thresh`, `after`) that map to Script.
- **Analyzable**: Tools can compute correctness, [satisfaction](/docs/glossary#witness) size, and [signature](/docs/bitcoin/cryptography) requirements automatically.

---

## Policy and Fragments

### Policy

A **policy** is a high-level description of who can spend and under what conditions. Examples:

```text
pk(A)                          — A’s key alone
2 of [pk(A), pk(B), pk(C)]     — 2-of-3 multisig
and(pk(A), after(100))         — A, but only after 100 blocks
or(2 of [pk(A),pk(B),pk(C)], and(pk(D), after(1000)))
  — 2-of-3 multisig, or D after 1000 blocks
```

### Core Fragments

| Fragment | Meaning | Script equivalent (conceptually) |
|----------|---------|----------------------------------|
| `pk(K)` | Key K must sign | `K OP_CHECKSIG` |
| `pk_h(K)` | Hash of K; reveal in witness | P2PKH-style |
| `thresh(n, A, B, ...)` | At least n of the sub-policies | Combined `OP_CHECKSIG` / `OP_CHECKMULTISIG`-style |
| `and(A, B)` | Both A and B | A then B in sequence |
| `or(A, B)` | A or B | `OP_IF` / `OP_ELSE` / `OP_ENDIF` |
| `after(N)` | Absolute [timelock](/docs/bitcoin/timelocks) (block height) | `N OP_CHECKLOCKTIMEVERIFY OP_DROP` |
| `older(N)` | Relative timelock (N blocks) | `N OP_CHECKSEQUENCEVERIFY OP_DROP` |
| `hash(H)` | Reveal preimage of H | `OP_HASH256 H OP_EQUAL` |
| `multi(n, K1, K2, ...)` | n-of-m multisig | `n K1 K2 ... m OP_CHECKMULTISIG` |

Miniscript supports more fragments (e.g., `and_v`, `or_c`, `andor`) for different Script encodings and [sighash](/docs/glossary#sighash) behavior. The exact set is defined in the [Miniscript specification](https://github.com/bitcoin/bips/blob/master/bip-0382.mediawiki).

---

## Correctness and Safety

Miniscript distinguishes:

- **Correctness**: Every valid satisfaction (according to the policy) is accepted by the compiled Script.
- **Safety**: No satisfaction is possible that the policy was not meant to allow; in particular, no **dust** or non-canonical spend that could lose funds.

Not every Miniscript expression is **safe**; the compiler and analyzers can report whether a given Miniscript is safe and what it requires to spend.

---

## Compilation to Script

A Miniscript policy is compiled down to [Script](/docs/bitcoin/script) (and thus to [P2WSH](/docs/glossary#p2wsh-pay-to-witness-script-hash) or [P2TR](/docs/bitcoin/taproot) [Tapscript](/docs/glossary#tapscript)). The exact output depends on:

- The target (pre-Taproot P2WSH vs [Taproot](/docs/bitcoin/taproot) Tapscript)
- Optimization options (e.g., minimize size, minimize [signature](/docs/bitcoin/cryptography) count)

Libraries such as `rust-miniscript` and `miniscript` (C++) (and the reference `miniscript` site) perform this compilation.

---

## Use Cases

- **Wallets**: Encode withdrawal policies (multisig, [timelocks](/docs/bitcoin/timelocks), recovery) and compile to Script; derive [addresses](/docs/wallets/address-types) and [PSBT](/docs/bitcoin-development/psbt) flows.
- **Vaults and covenants**: Express "can only go to addresses of type X" or "must wait N blocks"; with proposed [covenant](/docs/advanced/covenants) opcodes, Miniscript could target those too.
- **Protocols**: [Lightning](/docs/lightning), [DLCs](/docs/advanced/dlcs), and other protocols use script templates that Miniscript can represent and analyze.

---

## Taproot and Miniscript

[Taproot](/docs/bitcoin/taproot) and [Tapscript](/docs/bitcoin/script) add:

- **Schnorr** and `OP_CHECKSIGADD`
- New rules and limits (e.g., 32-byte x-only [pubkeys](/docs/bitcoin/cryptography))

Miniscript has been extended (see [BIP 382](https://github.com/bitcoin/bips/blob/master/bip-0382.mediawiki) and implementations) to support **Tapscript**, so the same policy language can target both pre-Taproot [P2WSH](/docs/glossary#p2wsh-pay-to-witness-script-hash) and Taproot script paths.

---

## Tools and Libraries

- **[miniscript.bitcoin.sipa.be](https://bitcoin.sipa.be/miniscript/)** – Playground and reference
- **rust-miniscript** – Rust; used in [BDK](https://github.com/bitcoindevkit/bdk) and other wallets
- **C++ miniscript** – In [Bitcoin Core](https://github.com/bitcoin/bitcoin) (e.g., for descriptors and output script analysis)
- **Policy-to-Miniscript**: Higher-level policy languages can target Miniscript, which then compiles to Script

---

## Related Topics

- [Bitcoin Script](/docs/bitcoin/script) - Script system
- [Script Patterns](/docs/bitcoin-development/script-patterns) - Common patterns and Miniscript
- [Smart Contracts](/docs/wallets/smart-contracts) - Contract patterns and Miniscript
- [Taproot](/docs/bitcoin/taproot) - Tapscript and Miniscript
- [Covenants](/docs/advanced/covenants) - Proposed opcodes and policy

---

## Resources

- [Miniscript (bitcoin.sipa.be)](https://bitcoin.sipa.be/miniscript/) - Playground and specification
- [BIP 382: Miniscript for Tapscript](https://github.com/bitcoin/bips/blob/master/bip-0382.mediawiki)
- [rust-miniscript](https://github.com/rust-bitcoin/rust-miniscript) - Rust implementation
