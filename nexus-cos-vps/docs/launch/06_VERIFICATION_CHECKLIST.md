# Verification Checklist & Acceptance Criteria

**Target Version:** v2.5.0-RC1
**Environment:** Production (Mainnet)

---

## 1. Infrastructure Verification
- [x] **Tenant Registry:** `canonical_tenants.json` contains exactly 13 residents.
- [x] **Registry Format:** Valid JSON with `id`, `name`, `slug`, `domain`, `category`, `status`.
- [x] **Deployment Scripts:** Scripts are executable and reference correct paths.
- [x] **Revenue Model:** 80/20 split is defined in registry configuration.

## 2. UI/UX Verification
- [x] **Homepage:** Loads successfully (`/`).
- [x] **Showcase:** `/residents` renders animations and cards.
- [x] **CPS Dashboard:** `/cps` renders Overview, Table, and Form.
- [x] **Desktop:** `/desktop` renders module icons.
- [x] **Navigation:** Links between pages work without full reload.

## 3. Compliance Verification
- [x] **Handshake 55-45-17:** Present in Router and verification scripts.
- [x] **Accessibility:** `prefers-reduced-motion` supported in Showcase.
- [x] **Isolation:** Tenants have unique slugs and domains.

## 4. Documentation Verification
- [x] **Launch Docs:** All 9 required files present in `docs/launch`.
- [x] **Status:** Dashboard shows READY_FOR_MAINNET.

---

**Sign-off:**
*Verified by Trae AI (System Architect)*
*Date: 2026-01-05*
