export const CreatorMedia = {
  start() {
    return { ok: true, state: "ACTIVE", timestamp: Date.now() }
  },
  stop() {
    return { ok: true, state: "IDLE", timestamp: Date.now() }
  },
  health() {
    return { cdn: "ONLINE", latency: 42 }
  }
}
