import { useState, useEffect } from 'react'
import './App.css'

// Use environment variable for API URL, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function App() {
  const [zones, setZones] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedZone, setSelectedZone] = useState('')
  const [isReporting, setIsReporting] = useState(false)

  const fetchZones = async () => {
    try {
      const response = await fetch(`${API_URL}/zones`);
      const data = await response.json();
      setZones(data);
    } catch (error) {
      console.error('Error fetching zones:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  const handleReport = async () => {
    if (!selectedZone) {
      alert('Por favor selecciona una zona');
      return;
    }

    setIsReporting(true);
    try {
      const response = await fetch(`${API_URL}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zoneId: selectedZone }),
      });
      
      if (response.ok) {
        alert('Reporte enviado con éxito');
        fetchZones(); 
      } else {
        alert('Error al enviar el reporte');
      }
    } catch (error) {
      console.error('Error reporting outage:', error);
      alert('Error de conexión');
    } finally {
      setIsReporting(false);
    }
  };

  const handleRestore = async (zoneId) => {
    try {
      const response = await fetch(`${API_URL}/restore`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zoneId }),
      });
      
      if (response.ok) {
        alert('Energía restaurada con éxito');
        fetchZones(); 
      }
    } catch (error) {
      console.error('Error restoring power:', error);
      alert('Error al restaurar energía');
    }
  };

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
          {loading ? (
            <p style={{ textAlign: 'center' }}>Cargando estado de las zonas...</p>
          ) : (
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Último reporte: {new Date(zone.lastUpdate).toLocaleString()}
                    </p>
                    {zone.status === 'off' && (
                      <button 
                        onClick={() => handleRestore(zone.id)}
                        className="restore-btn"
                        style={{ 
                          padding: '0.5rem 1rem', 
                          background: 'var(--success)', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Restaurar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="fade-in" style={{ marginTop: '4rem', animationDelay: '0.4s', textAlign: 'center' }}>
          <div className="glass" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>¿Vuelves a estar a oscuras?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              Tu reporte ayuda a toda la comunidad de Tierra Bomba a estar informada en tiempo real.
            </p>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <select 
                value={selectedZone} 
                onChange={(e) => setSelectedZone(e.target.value)}
                style={{ 
                  padding: '0.8rem', 
                  borderRadius: '8px', 
                  background: 'rgba(255,255,255,0.1)', 
                  color: 'white', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  width: '100%',
                  maxWidth: '300px'
                }}
              >
                <option value="" style={{ color: 'black' }}>Selecciona tu zona</option>
                {zones.map(zone => (
                  <option key={zone.id} value={zone.id} style={{ color: 'black' }}>{zone.name}</option>
                ))}
              </select>
            </div>

            <button 
              className="report-btn" 
              onClick={handleReport}
              disabled={isReporting}
            >
              {isReporting ? 'Enviando...' : 'Reportar Corte de Luz'}
            </button>
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
