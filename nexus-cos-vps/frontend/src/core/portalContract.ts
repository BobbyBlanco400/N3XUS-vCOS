export function enforcePortalContract() {
  // ⚖️ NEXUS LAW: PORTAL CONTRACT
  // Portals must ONLY run inside the Root Shell.
  // They cannot exist as standalone pages.
  
  if (!(window as any).__NEXUS_ROOT_SHELL__) {
    console.error("🚨 PORTAL CONTRACT VIOLATION: ROOT SHELL MISSING");
    throw new Error("PORTAL CONTRACT VIOLATION: ROOT SHELL MISSING");
  }
  
  console.log("✅ Portal Contract Verified: Running in Root Shell.");
}
