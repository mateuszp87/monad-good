# Monad Blitz Oregon submission checklist

Reviewed 2026-11-16 against the organizer's [Submission Process](https://monad-foundation.notion.site/Submission-Process-9476367594f28210893e81c909f413bc) and [official template README](https://github.com/monad-developers/monad-blitz-oregon). The Notion text was read through its public page content after web extraction failed. Its embedded portal screenshots were not accessible, so exact current form fields and event status are not verified.

## Organizer's stated process

| Item | Evidence / current status |
|---|---|
| Fork `monad-developers/monad-blitz-oregon` from main | **Deferred by the owner: keep only monad-good for now.** GitHub reports `mateuszp87/monad-good` is a standalone repo, not a fork. Copying template files does not establish fork provenance. |
| Give the fork a project name and one-line description | Draft below; official submission fork not created yet |
| Put project code and documentation in the fork | Current source prepared for review in monad-good; copy the same reviewed source into an official fork only if the owner later requests an official fork |
| Open the event in the Blitz portal when submissions are open | **Not completed.** Event selection, current window and authenticated account not verified |
| Fill project details; GitHub URL must be the fork URL | **Not completed.** Do not substitute the standalone repo and mark this satisfied |
| Provide demo URL (or repeat GitHub URL if none exists) | Demo URL exists below; outside-account access still needs verification |
| Submit using the portal's Submit Project action | **Not submitted.** A GitHub push or PR is not a portal submission |
| Make any edits before voting starts | Deadline/window not verified; confirm in the portal |

The linked process does not by itself establish all event eligibility, judging rules, technical-chain requirements, mandatory video rules or current portal fields. Those remain to be checked against the actual event. No contract deployment or completed rewards pipeline is claimed.

## Ready-to-use draft

**Project name:** Fairway Flow

**One-liner:** Phone-first golf traffic guidance that helps golfers understand pace and courses identify bottlenecks.

**Demo URL:** https://fairway-flow-monad.ripethyme64.chatgpt.site/

**Staff demo URL:** https://fairway-flow-monad.ripethyme64.chatgpt.site/operations.html

**Project source:** https://github.com/mateuszp87/monad-good

**Official submission fork URL:** Deferred by the owner — no official fork created; the organizer requirement remains unmet.

**Description:** Fairway Flow visualizes anonymous tee-time groups across four golf courses. Golfers can inspect groups, compare their round with hole targets, look ahead at course traffic and investigate a scripted hole-5 delay. Staff get a separate map, attention filters and local observations. The demo distinguishes over-target play from waiting behind traffic. Optional GPS stays on the device; all other group positions are simulated. Monad Testnet wallet connection and balance reads are implemented. Shared tracking, background push, verified rewards and a claim contract remain future work.

**Monad integration:** EIP-1193/EIP-6963 wallet discovery, account connection, Monad Testnet setup (10143) and balance reads. No transaction, deployment, token mint or real course credit is performed.

**Team details:** Confirm the actual teammates, names/handles and contact information in the portal. Do not infer or publish private account details from connector access.

**Video / screenshots:** No judge video has been recorded for this submission. Follow DEMO_SCRIPT.md if the event requests one; verify exact portal requirements first.

## Access and final review

- [x] Repository read/write access confirmed using the connected GitHub account.
- [x] Current source, product requirements, architecture and demo instructions prepared.
- [x] Automated timing, UI-handler, course/media and mocked provider checks available.
- [ ] Review and merge the source-sync PR when desired; no automatic merge is authorized by this checklist.
- [ ] Official fork requirement deferred at the owner's request; do not mark this complete.
- [ ] Verify public judge access to the demo; current Sites access policy is custom, not confirmed public.
- [ ] Perform real-phone visual/interaction testing and wallet verification.
- [ ] Confirm team, current event rules, required media and submission window.
- [ ] Submit through the authenticated portal and retain confirmation.
