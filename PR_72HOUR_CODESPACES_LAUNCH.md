# Master Launch Update: 72‑Hour Codespaces + Founders CTA Canon

## Overview
This PR:

- Locks all "Join The Founder's Program" CTAs to a single canonical Founders/Beta URL.
- Aligns the glitch/prelaunch pages with the 72‑Hour Codespaces Launch.
- Treats operational/72HOUR_CODESPACES_LAUNCH as the only active founder launch package.

## Non‑Negotiable Rules

1. **Canonical Founders/Beta URL (ALL Founders CTAs):**
   ```
   https://beta.n3xuscos.online/?utm_source=founders_video&utm_medium=cta&utm_campaign=72h_codespaces_launch
   ```

2. **Never switch this CTA to GitHub or any fallback** just because the domain isn't reachable in Codespaces. DNS + nginx are managed outside this PR.

3. All launch copy is **"72‑Hour Codespaces Launch"** (72 hours / 3 days), not 7‑day or 73‑hour.

4. `operational/72HOUR_CODESPACES_LAUNCH/` is the canonical operational package; 7DAY_FOUNDER_BETA is legacy.

## N3XUS v‑COS Repo (Glitch / Prelaunch)

Targets (in that repo):
- `promo/N3XUS_PRELAUNCH.html`
- `/web/launch/index.html`
- `/web/launch/README.md`
- `/web/launch/VIDEO_CREATION_GUIDE.md`

### 1) Config: FOUNDERS_URL

Update the config block to:

```javascript
const CONFIG = {
  // 72-hour founder window (3 days).
  COUNTDOWN_INTERVAL: 15000,           // demo / preview
  // COUNTDOWN_INTERVAL: 86400000,    // prod: 1-day steps over 3 days (72h)

  PARTICLE_COUNT: 30,
  FOUNDERS_URL: 'https://beta.n3xuscos.online/?utm_source=founders_video&utm_medium=cta&utm_campaign=72h_codespaces_launch'
};
```

**Do not change this URL back to GitHub.**

### 2) CTA Wiring: "Join The Founder's Program"

Ensure the main Founders CTA uses `CONFIG.FOUNDERS_URL`.

Example:

```html
<button class="cta-button primary" data-cta="join-founders">
  Join The Founder's Program
</button>
```

```javascript
const joinButton = document.querySelector('[data-cta="join-founders"]');
if (joinButton) {
  joinButton.addEventListener('click', () => {
    window.open(CONFIG.FOUNDERS_URL, '_blank', 'noopener,noreferrer');
  });
}
```

If it's an `<a>` in `promo/N3XUS_PRELAUNCH.html`, set:

```html
<a href="https://beta.n3xuscos.online/?utm_source=founders_video&utm_medium=cta&utm_campaign=72h_codespaces_launch">
  Join The Founder's Program
</a>
```

**No GitHub links for this CTA.**

### 3) Countdown Copy: 72‑Hour Codespaces

Update text around the countdown:
- Use labels like: **72 HOURS TO LAUNCH** or **72-Hour Codespaces Launch**.
- Subtext: *Founders-only window. When the 72 hours end, the gate closes.*

Remove/replace any "7‑day founder beta" or "73‑hour" wording.

### 4) VIDEO_CREATION_GUIDE

In `/web/launch/VIDEO_CREATION_GUIDE.md`:
- When describing the shot where the user clicks "Join The Founder's Program", state that it navigates to:
  ```
  https://beta.n3xuscos.online/?utm_source=founders_video&utm_medium=cta&utm_campaign=72h_codespaces_launch
  ```
- Script/VO should say "72‑Hour Codespaces Launch".

## nexus-cos-main Monorepo

Canonical operational package:
- `operational/72HOUR_CODESPACES_LAUNCH/`

Key files:
- `operational/72HOUR_CODESPACES_LAUNCH/README.md`
- `operational/72HOUR_CODESPACES_LAUNCH/FOUNDER_BETA_VERIFICATION_CHECKLIST.md`
- `operational/72HOUR_CODESPACES_LAUNCH/FINAL_LAUNCH_DECLARATION.md`
- `operational/72HOUR_CODESPACES_LAUNCH/FOUNDER_ONBOARDING_SCRIPT.md`

Behavior:
- 72‑hour launch window (Hours 0–72).
- Post‑launch starts with a 3‑day rest period.

### 1) operational/README.md

Ensure it:
- Lists **"72-Hour Codespaces Launch (Founder Beta)"** with:
  - **Location:** `operational/72HOUR_CODESPACES_LAUNCH/`
  - **Quick start:**
    ```bash
    cd operational/72HOUR_CODESPACES_LAUNCH
    cat README.md
    ```
- **"Executing …" section:**
  - "Executing 72-Hour Codespaces Launch: → Start here: `operational/72HOUR_CODESPACES_LAUNCH/README.md`"

No active references to 7DAY_FOUNDER_BETA for current workflows.

### 2) 72HOUR README Pre‑Execution

In `operational/72HOUR_CODESPACES_LAUNCH/README.md`:
- Pre‑execution line must be:
  > Before deploying the 72-Hour Codespaces Launch:

Fix any "73-Hour"/"7-Day" occurrences here.

### 3) Promo HTML in this repo (if present)

If `promo/N3XUS_PRELAUNCH.html` or similar exists here and has a Founders CTA:
- Set that CTA to:
  ```
  https://beta.n3xuscos.online/?utm_source=founders_video&utm_medium=cta&utm_campaign=72h_codespaces_launch
  ```

Same rule: **do not send Founders users to GitHub.**

## Testing / Validation Checklist

- [ ] Search for "Join The Founder's Program" in both repos; every instance uses the canonical Founders/Beta URL above.
- [ ] Search for "7-Day Founder Beta" and "73-Hour" in: `operational/README.md`, `operational/72HOUR_CODESPACES_LAUNCH/README.md`, launch/promo HTML.
  Replace with "72‑Hour Codespaces Launch" / "72 hours" where applicable.
- [ ] Search for `github.com` near Founders CTAs; verify none of them route Founders to GitHub.
- [ ] Do not modify the URL even if `beta.n3xuscos.online` is not reachable from Codespaces (expected in dev).

---

## Files Changed in This PR

### promo/N3XUS_PRELAUNCH.html
- ✅ CTA uses canonical Founders/Beta URL with UTM parameters
- ✅ Countdown displays "72 HOURS TO LAUNCH"
- ✅ Page title: "N3XUS v-COS | 72-Hour Codespaces Launch"
- ✅ Button opens in new tab with `noopener,noreferrer`

### VPS_DEPLOYMENT_GUIDE.md
- ✅ Digital notarization of 13-service deployment
- ✅ Deployment timeline and verification steps

### TRAE_UPDATE_PR.md
- ✅ Documentation of deployment verification and promotional assets

---

**Commit:** 72-Hour Codespaces canonical spec  
**Branch:** feature/phase3-4-launch  
**Target:** main  
**PR:** #2
