export class MediaService {
  engineStatus = "IDLE"
  cdnStatus = "ONLINE"
  sessionState = "NONE"

  startSession() {
    this.sessionState = "ACTIVE"
    this.engineStatus = "STREAMING"
    return { ok: true, state: this.sessionState }
  }

  stopSession() {
    this.sessionState = "NONE"
    this.engineStatus = "IDLE"
    return { ok: true, state: this.sessionState }
  }

  getStatus() {
    return {
      engine: this.engineStatus,
      cdn: this.cdnStatus,
      session: this.sessionState
    }
  }
}
