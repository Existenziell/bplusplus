# Trust Model

Bitcoin's trust model differs fundamentally from traditional finance. Instead of trusting intermediaries (banks, payment processors, governments), Bitcoin uses cryptographic proof and economic incentives to create a **trustless** system: minimal trust, not zero trust.

## Traditional vs Bitcoin Trust

| Aspect | Traditional System | Bitcoin |
|--------|-------------------|---------|
| **Who to trust** | Banks, payment processors, governments | The protocol and cryptography |
| **Single points of failure** | Bank/processor/government failure | None (distributed network) |
| **Censorship** | Accounts can be frozen, transactions blocked | Resistant (no central authority) |
| **Reversibility** | Chargebacks, reversals possible | Final after confirmation |
| **Privacy** | Intermediaries see all transactions | Pseudonymous, no identity required |

## What "Trustless" Really Means

You trust **mathematics and code** rather than **people and institutions**:

- **Cryptographic proof:** Digital signatures prove ownership; hash functions secure the blockchain
- **Economic incentives:** Miners profit from honest behavior; attacks are prohibitively expensive
- **Open verification:** Anyone can run a node and independently verify every transaction

## Trust Assumptions

### What You Must Trust

- **Protocol correctness:** Bitcoin works as designed
- **Cryptography:** SHA-256, ECDSA remain secure
- **Network honesty:** Majority of hash rate follows the rules
- **Your own security:** You protect your private keys

### What You Don't Need to Trust

Banks, payment processors, governments, other users, miners (economically incentivized), or developers (code is open-source and auditable).

## Trust Minimization Techniques

**Run a full node:** Verify all transactions yourself instead of trusting others.

**Use open-source software:** Code is publicly auditable with no hidden functionality.

**Self-custody:** Control your own private keys; no third-party can freeze or seize your funds.

## Trust vs Convenience Spectrum

| Approach | Trust Level | Trade-off |
|----------|-------------|-----------|
| **Full node + self-custody** | Minimal | Maximum security; requires technical knowledge and resources |
| **Light wallet** | Medium | Mobile-friendly, fast setup; trusts full nodes for verification |
| **Custodial wallet/exchange** | High | Easy to use, password recovery; you trust the custodian completely |

Bitcoin's philosophy: prefer trust minimization, accept inconvenience for security, verify rather than trust.
