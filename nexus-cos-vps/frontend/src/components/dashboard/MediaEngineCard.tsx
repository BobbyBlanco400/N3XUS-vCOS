import React from 'react'
import { MEDIA } from '../../services/media'

export const MediaEngineCard = () => {
  const status = MEDIA.getStatus()
  return (
    <div className="card media-engine">
      <h2>Media Engine</h2>
      <p>Engine: {status.engine}</p>
      <p>CDN: {status.cdn}</p>
      <p>Session: {status.session}</p>
    </div>
  )
}
