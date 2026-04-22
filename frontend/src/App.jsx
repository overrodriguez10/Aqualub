import { useState } from 'react'
import './App.css'

function App() {
  const [zones, setZones] = useState([
    { id: 1, name: 'Barrio Abajo', status: 'on', lastUpdate: 'Hace 5 min' },
    { id: 2, name: 'La Loma', status: 'off', lastUpdate: 'Hace 1 hora' },
  ])

  return (
    <div className="app-container">
      <header className="hero-section" style={{ backgroundImage: 'url("/hero-island.png")' }}>
        <div className="hero-overlay"></div>
        <div className="hero-content fade-in">
          <h1 className="logo-text">AQUALUB</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Monitoreo de Energía · Tierra Bomba</p>
        </div>
      </header>

      <main className="container" style={{ marginTop: '2rem' }}>
        <section className="fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="grid grid-cols-2">
            {zones.map((zone) => (
              <div key={zone.id} className="glass" style={{ padding: '2rem' }}>
                <div className="card-title">
                  <h2>{zone.name}</h2>
                  <span className={`status-badge ${zone.status}`}>
                    <span style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: 'currentColor',
                      boxShadow: zone.status === 'on' ? '0 0 10px var(--success)' : 'none'
                    }}></span>
                    {zone.status === 'on' ? 'Energía Activa' : 'Sin Energía'}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Último reporte: {zone.lastUpdate}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="fade-in" style={{ marginTop: '4rem', animationDelay: '0.4s', textAlign: 'center' }}>
          <div className="glass" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>¿Vuelves a estar a oscuras?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Tu reporte ayuda a toda la comunidad de Tierra Bomba a estar informada en tiempo real.
            </p>
            <button className="report-btn">Reportar Corte de Luz</button>
          </div>
        </section>
      </main>

      <footer style={{ marginTop: '6rem', textAlign: 'center', color: 'var(--text-muted)', paddingBottom: '2rem' }}>
        <p>&copy; 2024 AQUALUB. Desarrollado con ♡ para Tierra Bomba.</p>
      </footer>
    </div>
  )
}

export default App
