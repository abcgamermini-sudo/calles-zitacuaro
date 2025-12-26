import { useState } from 'react'
import { Calle } from '../types'
import { Download, Database, BarChart3 } from 'lucide-react'
import { exportToCSV } from '../utils/exportData'
import { EXAMPLE_CALLES } from '../data/exampleData'
import './SettingsPanel.css'

interface SettingsPanelProps {
  calles: Calle[]
  onRefresh: () => void
  isDark: boolean
}

export default function SettingsPanel({
  calles,
  onRefresh,
  isDark,
}: SettingsPanelProps) {
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    if (calles.length === 0) {
      alert('No hay calles para exportar')
      return
    }

    setExporting(true)
    const success = await exportToCSV(calles)
    setExporting(false)

    if (success) {
      alert('Datos exportados correctamente')
    } else {
      alert('Error al exportar')
    }
  }

  const coloniaStats = calles.reduce(
    (acc, calle) => {
      acc[calle.colonia] = (acc[calle.colonia] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const topColonias = Object.entries(coloniaStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <div className="settings-panel">
      <div className="settings-section">
        <h3>Datos</h3>

        <button
          className="settings-item"
          onClick={handleExport}
          disabled={exporting || calles.length === 0}
        >
          <Download size={24} />
          <div className="item-text">
            <span className="item-title">Exportar CSV</span>
            <span className="item-desc">Descargar todas las calles</span>
          </div>
        </button>
      </div>

      <div className="settings-section">
        <h3>Estadísticas</h3>

        <div className="stats-card">
          <div className="stat-row">
            <Database size={20} />
            <span>Total de calles</span>
            <strong>{calles.length}</strong>
          </div>

          {topColonias.length > 0 && (
            <>
              <div className="stat-divider" />
              <div className="stat-row" style={{ alignItems: 'flex-start' }}>
                <BarChart3 size={20} />
                <div style={{ flex: 1 }}>
                  <span>Top 5 colonias</span>
                  <div className="colonias-list">
                    {topColonias.map(([colonia, count], idx) => (
                      <div key={colonia} className="colonia-item">
                        <span className="rank">{idx + 1}.</span>
                        <span className="name">{colonia}</span>
                        <span className="count">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="settings-section">
        <h3>Info</h3>
        <div className="info-text">
          <p>Catálogo de Calles de Zitácuaro, Michoacán</p>
          <p>Versión 1.0.0</p>
        </div>
      </div>
    </div>
  )
}
