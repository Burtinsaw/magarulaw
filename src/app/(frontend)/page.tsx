import React from 'react'
import './styles.css'

export default async function HomePage() {
  return (
    <div className="home">
      <div className="content">
        <h1>Magarulaw</h1>
        <p>Avar cultural platform</p>
        <div className="links">
          <a className="admin" href="/admin" rel="noopener noreferrer" target="_blank">
            Go to admin panel
          </a>
        </div>
      </div>
    </div>
  )
}
