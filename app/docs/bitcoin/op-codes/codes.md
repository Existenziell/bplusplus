# Bitcoin OP Codes

## Overview

Bitcoin Script uses a stack-based programming language with various opcodes (operation codes) that perform different functions. This document provides a comprehensive list of Bitcoin OP codes with explanations and code examples.

## OP Code Categories

Bitcoin OP codes can be categorized into several groups:
- **Stack Operations**: Manipulate the stack
- **Arithmetic Operations**: Mathematical operations
- **Cryptographic Operations**: Hash functions and signature verification
- **Bitwise Operations**: Logical operations on bits
- **Control Flow**: Conditional execution
- **String Operations**: String manipulation
- **Splice Operations**: Data manipulation
- **Reserved/Disabled**: Opcodes that are disabled or reserved

## Stack Operations

### OP_DUP
**Code**: `0x76`  
**Function**: Duplicates the top stack item  
**Example**:
```
Stack before: [value]
OP_DUP
Stack after: [value, value]
```

### OP_DROP
**Code**: `0x75`  
**Function**: Removes the top stack item  
**Example**:
```
Stack before: [value1, value2]
OP_DROP
Stack after: [value1]
```

### OP_SWAP
**Code**: `0x7c`  
**Function**: Swaps the top two stack items  
**Example**:
```
Stack before: [value1, value2]
OP_SWAP
Stack after: [value2, value1]
```

### OP_OVER
**Code**: `0x78`  
**Function**: Copies the second-to-top stack item to the top  
**Example**:
```
Stack before: [value1, value2]
OP_OVER
Stack after: [value1, value2, value1]
```

### OP_ROT
**Code**: `0x79`  
**Function**: Rotates the top three stack items  
**Example**:
```
Stack before: [value1, value2, value3]
OP_ROT
Stack after: [value2, value3, value1]
```

### OP_2DROP
**Code**: `0x6d`  
**Function**: Removes the top two stack items  
**Example**:
```
Stack before: [value1, value2, value3]
OP_2DROP
Stack after: [value1]
```

### OP_2DUP
**Code**: `0x6e`  
**Function**: Duplicates the top two stack items  
**Example**:
```
Stack before: [value1, value2]
OP_2DUP
Stack after: [value1, value2, value1, value2]
```

## Arithmetic Operations

### OP_ADD
**Code**: `0x93`  
**Function**: Adds the top two stack items  
**Example**:
```
Stack before: [5, 3]
OP_ADD
Stack after: [8]
```

### OP_SUB
**Code**: `0x94`  
**Function**: Subtracts the top stack item from the second-to-top  
**Example**:
```
Stack before: [5, 3]
OP_SUB
Stack after: [2]
```

### OP_MUL
**Code**: `0x95`  
**Function**: Multiplies the top two stack items  
**Example**:
```
Stack before: [5, 3]
OP_MUL
Stack after: [15]
```

### OP_DIV
**Code**: `0x96`  
**Function**: Divides the second-to-top by the top stack item  
**Example**:
```
Stack before: [15, 3]
OP_DIV
Stack after: [5]
```

### OP_MOD
**Code**: `0x97`  
**Function**: Computes modulo (remainder) of division  
**Example**:
```
Stack before: [7, 3]
OP_MOD
Stack after: [1]
```

### OP_LSHIFT
**Code**: `0x98`  
**Function**: Left bitwise shift  
**Example**:
```
Stack before: [4, 2]  (4 << 2)
OP_LSHIFT
Stack after: [16]
```

### OP_RSHIFT
**Code**: `0x99`  
**Function**: Right bitwise shift  
**Example**:
```
Stack before: [16, 2]  (16 >> 2)
OP_RSHIFT
Stack after: [4]
```

## Comparison Operations

### OP_EQUAL
**Code**: `0x87`  
**Function**: Returns 1 if inputs are equal, 0 otherwise  
**Example**:
```
Stack before: [value1, value2]
OP_EQUAL
Stack after: [1]  (if equal) or [0] (if not equal)
```

### OP_EQUALVERIFY
**Code**: `0x88`  
**Function**: Same as OP_EQUAL but runs OP_VERIFY afterward  
**Example**:
```
Stack before: [value1, value2]
OP_EQUALVERIFY
Stack after: []  (if equal, script continues; if not, script fails)
```

### OP_1ADD
**Code**: `0x8b`  
**Function**: Adds 1 to the top stack item  
**Example**:
```
Stack before: [5]
OP_1ADD
Stack after: [6]
```

### OP_1SUB
**Code**: `0x8c`  
**Function**: Subtracts 1 from the top stack item  
**Example**:
```
Stack before: [5]
OP_1SUB
Stack after: [4]
```

### OP_NEGATE
**Code**: `0x8f`  
**Function**: Negates the top stack item  
**Example**:
```
Stack before: [5]
OP_NEGATE
Stack after: [-5]
```

### OP_ABS
**Code**: `0x90`  
**Function**: Absolute value of the top stack item  
**Example**:
```
Stack before: [-5]
OP_ABS
Stack after: [5]
```

### OP_NOT
**Code**: `0x91`  
**Function**: Returns 1 if input is 0, 0 otherwise  
**Example**:
```
Stack before: [0]
OP_NOT
Stack after: [1]

Stack before: [5]
OP_NOT
Stack after: [0]
```

### OP_0NOTEQUAL
**Code**: `0x92`  
**Function**: Returns 1 if input is not 0, 0 otherwise  
**Example**:
```
Stack before: [5]
OP_0NOTEQUAL
Stack after: [1]

Stack before: [0]
OP_0NOTEQUAL
Stack after: [0]
```

## Cryptographic Operations

### OP_RIPEMD160
**Code**: `0xa6`  
**Function**: Computes RIPEMD-160 hash  
**Example**:
```
Stack before: [data]
OP_RIPEMD160
Stack after: [hash160_result]
```

### OP_SHA1
**Code**: `0xa7`  
**Function**: Computes SHA-1 hash  
**Example**:
```
Stack before: [data]
OP_SHA1
Stack after: [sha1_result]
```

### OP_SHA256
**Code**: `0xa8`  
**Function**: Computes SHA-256 hash  
**Example**:
```
Stack before: [data]
OP_SHA256
Stack after: [sha256_result]
```

### OP_HASH160
**Code**: `0xa9`  
**Function**: Computes SHA-256 then RIPEMD-160 (used in P2PKH)  
**Example**:
```
Stack before: [public_key]
OP_HASH160
Stack after: [hash160(sha256(public_key))]
```

### OP_HASH256
**Code**: `0xaa`  
**Function**: Computes double SHA-256 (used in block hashing)  
**Example**:
```
Stack before: [data]
OP_HASH256
Stack after: [sha256(sha256(data))]
```

### OP_CHECKSIG
**Code**: `0xac`  
**Function**: Verifies a signature against a public key  
**Example**:
```
Stack before: [signature, public_key]
OP_CHECKSIG
Stack after: [1]  (if valid) or [0] (if invalid)
```

### OP_CHECKSIGVERIFY
**Code**: `0xad`  
**Function**: Same as OP_CHECKSIG but runs OP_VERIFY afterward  
**Example**:
```
Stack before: [signature, public_key]
OP_CHECKSIGVERIFY
Stack after: []  (if valid, script continues; if invalid, script fails)
```

### OP_CHECKMULTISIG
**Code**: `0xae`  
**Function**: Verifies multiple signatures against multiple public keys  
**Example**:
```
Stack before: [sig1, sig2, pubkey1, pubkey2, pubkey3, 2, 3]
OP_CHECKMULTISIG
Stack after: [1]  (if 2 of 3 signatures are valid)
```

### OP_CHECKMULTISIGVERIFY
**Code**: `0xaf`  
**Function**: Same as OP_CHECKMULTISIG but runs OP_VERIFY afterward  

## Bitwise Operations

### OP_AND
**Code**: `0x84`  
**Function**: Bitwise AND operation  
**Example**:
```
Stack before: [0b1010, 0b1100]  (10, 12)
OP_AND
Stack after: [0b1000]  (8)
```

### OP_OR
**Code**: `0x85`  
**Function**: Bitwise OR operation  
**Example**:
```
Stack before: [0b1010, 0b1100]  (10, 12)
OP_OR
Stack after: [0b1110]  (14)
```

### OP_XOR
**Code**: `0x86`  
**Function**: Bitwise XOR operation  
**Example**:
```
Stack before: [0b1010, 0b1100]  (10, 12)
OP_XOR
Stack after: [0b0110]  (6)
```

## Control Flow

### OP_IF
**Code**: `0x63`  
**Function**: If the top stack item is not 0, statements are executed  
**Example**:
```
OP_IF
  <statements>
OP_ENDIF
```

### OP_NOTIF
**Code**: `0x64`  
**Function**: If the top stack item is 0, statements are executed  
**Example**:
```
OP_NOTIF
  <statements>
OP_ENDIF
```

### OP_ELSE
**Code**: `0x67`  
**Function**: Marks the beginning of an else block  
**Example**:
```
OP_IF
  <statements>
OP_ELSE
  <statements>
OP_ENDIF
```

### OP_ENDIF
**Code**: `0x68`  
**Function**: Ends an if/else block  

### OP_VERIFY
**Code**: `0x69`  
**Function**: Marks transaction as invalid if top stack value is not true  
**Example**:
```
Stack before: [1]
OP_VERIFY
Stack after: []  (script continues)

Stack before: [0]
OP_VERIFY
Stack after: []  (script fails, transaction invalid)
```

### OP_RETURN
**Code**: `0x6a`  
**Function**: Immediately marks transaction as invalid (used for data storage)  
**Example**:
```
OP_RETURN <data>
# Transaction is invalid, but data is stored on blockchain
```

## Time Lock Operations

### OP_CHECKLOCKTIMEVERIFY (CLTV)
**Code**: `0xb1`  
**Function**: Verifies that transaction is locked until a specific time/block  
**Example**:
```
<locktime> OP_CHECKLOCKTIMEVERIFY OP_DROP <pubkey> OP_CHECKSIG
```

### OP_CHECKSEQUENCEVERIFY (CSV)
**Code**: `0xb2`  
**Function**: Verifies relative time lock (used in Lightning Network)  
**Example**:
```
<relative_locktime> OP_CHECKSEQUENCEVERIFY OP_DROP <pubkey> OP_CHECKSIG
```

## Push Operations

### OP_PUSHDATA1 through OP_PUSHDATA75
**Codes**: `0x01` - `0x4b`  
**Function**: Push data onto the stack  
**Example**:
```
OP_PUSHDATA1 <length> <data>
```

### OP_0 / OP_FALSE
**Code**: `0x00`  
**Function**: Pushes empty array (interpreted as false)  

### OP_1 through OP_16
**Codes**: `0x51` - `0x60`  
**Function**: Push numbers 1-16 onto the stack  
**Example**:
```
OP_1  # Pushes 1
OP_5  # Pushes 5
OP_16 # Pushes 16
```

### OP_1NEGATE
**Code**: `0x4f`  
**Function**: Pushes -1 onto the stack  

## Reserved/Disabled Opcodes

Many opcodes are reserved or disabled for security reasons:
- **OP_CAT** (0x7e): Disabled - could be used to create large scripts
- **OP_SUBSTR** (0x7f): Disabled
- **OP_LEFT** (0x80): Disabled
- **OP_RIGHT** (0x81): Disabled
- **OP_INVERT** (0x83): Disabled
- **OP_2MUL** (0x8d): Disabled
- **OP_2DIV** (0x8e): Disabled

## Common Script Patterns

### P2PKH (Pay-to-Pubkey-Hash)
```
Locking Script:
OP_DUP OP_HASH160 <pubkeyhash> OP_EQUALVERIFY OP_CHECKSIG

Unlocking Script:
<signature> <publickey>
```

### P2SH (Pay-to-Script-Hash)
```
Locking Script:
OP_HASH160 <scripthash> OP_EQUAL

Unlocking Script:
<redeem_script> <signatures...>
```

### Multisig (2-of-3)
```
Locking Script:
OP_2 <pubkey1> <pubkey2> <pubkey3> OP_3 OP_CHECKMULTISIG

Unlocking Script:
OP_0 <signature1> <signature2>
```

### Time Lock
```
Locking Script:
<locktime> OP_CHECKLOCKTIMEVERIFY OP_DROP <pubkey> OP_CHECKSIG

Unlocking Script:
<signature>
```

## OP Code Reference Table

| OP Code | Hex | Name | Function | Status |
|---------|-----|------|----------|--------|
| 0x00 | OP_0 | Push empty array | Pushes false | ✅ Active |
| 0x51-0x60 | OP_1-OP_16 | Push 1-16 | Pushes number | ✅ Active |
| 0x63 | OP_IF | If statement | Conditional execution | ✅ Active |
| 0x64 | OP_NOTIF | If not statement | Conditional execution | ✅ Active |
| 0x67 | OP_ELSE | Else block | Conditional execution | ✅ Active |
| 0x68 | OP_ENDIF | End if block | Ends conditional | ✅ Active |
| 0x69 | OP_VERIFY | Verify | Checks top stack item | ✅ Active |
| 0x6a | OP_RETURN | Return | Marks invalid, stores data | ✅ Active |
| 0x75 | OP_DROP | Drop | Removes top stack item | ✅ Active |
| 0x76 | OP_DUP | Duplicate | Duplicates top stack item | ✅ Active |
| 0x77 | OP_NIP | Nip | Removes second stack item | ✅ Active |
| 0x78 | OP_OVER | Over | Copies second-to-top | ✅ Active |
| 0x79 | OP_ROT | Rotate | Rotates top 3 items | ✅ Active |
| 0x7a | OP_SWAP | Swap | Swaps top 2 items | ✅ Active |
| 0x7c | OP_SWAP | Swap | Swaps top 2 items | ✅ Active |
| 0x87 | OP_EQUAL | Equal | Checks equality | ✅ Active |
| 0x88 | OP_EQUALVERIFY | Equal verify | Equal + verify | ✅ Active |
| 0x93 | OP_ADD | Add | Addition | ✅ Active |
| 0x94 | OP_SUB | Subtract | Subtraction | ✅ Active |
| 0x95 | OP_MUL | Multiply | Multiplication | ✅ Active |
| 0x96 | OP_DIV | Divide | Division | ✅ Active |
| 0x97 | OP_MOD | Modulo | Remainder | ✅ Active |
| 0xa6 | OP_RIPEMD160 | RIPEMD-160 | Hash function | ✅ Active |
| 0xa7 | OP_SHA1 | SHA-1 | Hash function | ✅ Active |
| 0xa8 | OP_SHA256 | SHA-256 | Hash function | ✅ Active |
| 0xa9 | OP_HASH160 | Hash160 | SHA256 + RIPEMD160 | ✅ Active |
| 0xaa | OP_HASH256 | Hash256 | Double SHA-256 | ✅ Active |
| 0xac | OP_CHECKSIG | Check signature | Verifies signature | ✅ Active |
| 0xad | OP_CHECKSIGVERIFY | Check sig verify | Checksig + verify | ✅ Active |
| 0xae | OP_CHECKMULTISIG | Check multisig | Verifies multiple sigs | ✅ Active |
| 0xaf | OP_CHECKMULTISIGVERIFY | Check multisig verify | Multisig + verify | ✅ Active |
| 0xb1 | OP_CHECKLOCKTIMEVERIFY | CLTV | Absolute time lock | ✅ Active |
| 0xb2 | OP_CHECKSEQUENCEVERIFY | CSV | Relative time lock | ✅ Active |

## Related Topics

- [Script System](/docs/bitcoin/script) - How Bitcoin Script works
- [OP_RETURN Debate](/docs/controversies/op-return) - Controversy about OP_RETURN usage
