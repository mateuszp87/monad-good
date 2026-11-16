# Monad Testnet reward demo

## Implemented, but not predeployed

`rewards.html` connects MetaMask and provides explicit testnet contract deployment, course approval, golfer claim, receipt checking and points reads. `contracts/DemoPaceRewards.sol` is compiled into `dist/reward-contract.json` using pinned solc 0.8.30 with optimizer 200 and EVM Paris. The wallet client and constructor both require chain ID 10143. The included artifact is checked against source in CI.

No contract address has been deployed or configured by the assistant. No actual Monad transaction has been signed, no reward issued, and no real course credit funded. Local EVM tests execute the actual compiled bytecode; they are not evidence of a completed Monad deployment.

## Fastest presentation: one test wallet

1. Open `/rewards.html` in a MetaMask-enabled browser. Use a separate test wallet with testnet MON for gas. Get tokens from the official faucet if needed; do not use mainnet funds or paste a private key anywhere.
2. Connect MetaMask and approve the switch/addition to Monad Testnet.
3. Under Course setup, select Deploy testnet demo contract and confirm the wallet transaction. Wait for a successful receipt and contract address.
4. Use the generated round reference. Set the golfer address to the connected wallet. The deployer is also the course owner in this one-wallet demonstration.
5. Review the round and choose On pace after traffic adjustment. Select Approve this demo round and confirm in MetaMask. Not eligible / Needs review disables approval.
6. Select Claim 100 demo points and confirm in MetaMask. The UI reports success only after a successful receipt, then reads the points and claim state from the chain.
7. Open the transaction explorer link. Show the 100 points and that this round cannot be claimed twice.

This one-wallet setup demonstrates transactions, not independent course verification. For a realistic two-wallet presentation, the deployer approves the golfer's address, then the golfer connects their own wallet and uses the same contract address and round reference to claim.

## What the contract enforces

- Only the deployment owner can approve a wallet/round pair.
- An unapproved golfer cannot claim.
- Claims are bound to the caller and round; a wallet cannot claim twice for the same round.
- Points are non-transferable counter records. They are not MON, an ERC-20, NFT, cash, a discount or a $5 credit.
- No deposits or MON payouts are part of this contract.

The course owner is trusted to decide eligibility honestly. The browser's on-pace decision is a course workflow aid, not an oracle or fraud-proof GPS verifier. A round reference is not proof of a completed round. Pending/reverted transactions are never reported as successful rewards.

## Before a real pilot

Build verified round records, staff identity and authorization, wait-adjusted eligibility, audit logs, abuse controls and independent contract review. Define funding and redemption separately for any actual course credit. Keep GPS and personal data off-chain. Publish a shared contract address only after a confirmed deployment and verification; the browser currently saves the address locally for that presentation.

## Rebuild and test

```sh
npm ci
npm run build:rewards
npm test
npm run check
```

`tests/rewards-contract.test.mjs` uses a local disposable Ganache EVM with test accounts and chain ID 10143 to exercise real bytecode. No private keys or network credentials are committed. Browser bundling does not load Ganache or solc; they are development-only dependencies.

Network configuration checked against https://docs.monad.xyz/developer-essentials/testnet on 2026-11-16. Public RPC availability and rate limits can vary; use the wallet's configured testnet provider. Source verification on a public explorer and physical MetaMask click-through remain outstanding.
