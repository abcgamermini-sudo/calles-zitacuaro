import { useState, useEffect } from 'react'
import { Calle } from '../types'
import { X, MapPin, Link, Type, CheckCircle } from 'lucide-react'
import { extractCoordinatesFromUrl } from '../utils/coordinates'
import './CalleForm.css'

interface CalleFormProps {
  calle: Calle | null
  suggestedCodigo: string
  onSave: (data: Omit<Calle, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  onCancel: () => void
  isDark: boolean
}

type UbicacionMode = 'url' | 'manual'

export default function CalleForm({
  calle,
  suggestedCodigo,
  onSave,
  onCancel,
  isDark,
}: CalleFormProps) {
  const [calleText, setCalleText] = useState('')
  const [colonia, setColonia] = useState('')
  const [nodos, setNodos] = useState('')
  const [ubicacion, setUbicacion] = useState('')
  const [codigo, setCodigo] = useState('')
  const [mapsUrl, setMapsUrl] = useState('')
  const [ubicacionMode, setUbicacionMode] = useState<UbicacionMode>('url')
  const [extractedCoords, setExtractedCoords] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (calle) {
      setCalleText(calle.calle)
      setColonia(calle.colonia)
      setNodos(calle.nodos || '')
      setUbicacion(calle.ubicacion || '')
      setCodigo(calle.codigo)
    } else {
      setCodigo(suggestedCodigo)
      setCalleText('')
      setColonia('')
      setNodos('')
      setUbicacion('')
    }
    setMapsUrl('')
    setExtractedCoords('')
    setErrors({})
  }, [calle, suggestedCodigo])

  const handleExtractCoordinates = () => {
    const coords = extractCoordinatesFromUrl(mapsUrl)
    if (coords) {
      setExtractedCoords(coords)
      setUbicacion(coords)
      setErrors({ ...errors, ubicacion: '' })
    } else {
      setErrors({
        ...errors,
        ubicacion: 'No se pudieron extraer coordenadas de esta URL',
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!calleText.trim() || calleText.length < 3) {
      newErrors.calle = 'La calle debe tener al menos 3 caracteres'
    }

    if (!colonia.trim()) {
      newErrors.colonia = 'La colonia es obligatoria'
    }

    if (!codigo.trim()) {
      newErrors.codigo = 'El código es obligatorio'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return

    setSaving(true)
    try {
      await onSave({
        calle: calleText.trim(),
        colonia: colonia.trim(),
        nodos: nodos.trim() || null,
        ubicacion: ubicacion.trim() || null,
        codigo: codigo.trim(),
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="form-modal">
      <div className="form-overlay" onClick={onCancel} />
      <div className="form-container">
        <div className="form-header">
          <h2>{calle ? 'Editar Calle' : 'Nueva Calle'}</h2>
          <button className="form-close" onClick={onCancel}>
            <X size={24} />
          </button>
        </div>

        <div className="form-content">
          <div className="form-group">
            <label>Calle *</label>
            <textarea
              placeholder="Ej: Mora del Calzonazo esq. Jose Maria Coss"
              value={calleText}
              onChange={(e) => setCalleText(e.target.value)}
              rows={3}
              className={errors.calle ? 'error' : ''}
            />
            {errors.calle && <span className="error-text">{errors.calle}</span>}
          </div>

          <div className="form-group">
            <label>Colonia *</label>
            <input
              type="text"
              placeholder="Ej: El Cerrito, Melchor Ocampo"
              value={colonia}
              onChange={(e) => setColonia(e.target.value)}
              className={errors.colonia ? 'error' : ''}
            />
            {errors.colonia && <span className="error-text">{errors.colonia}</span>}
          </div>

          <div className="form-group">
            <label>Nodos</label>
            <input
              type="text"
              placeholder="Ej: Cd. Zitácuaro01"
              value={nodos}
              onChange={(e) => setNodos(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Ubicación</label>

            <div className="mode-tabs">
              <button
                className={`mode-tab ${ubicacionMode === 'url' ? 'active' : ''}`}
                onClick={() => setUbicacionMode('url')}
              >
                <Link size={18} />
                URL Google Maps
              </button>
              <button
                className={`mode-tab ${ubicacionMode === 'manual' ? 'active' : ''}`}
                onClick={() => setUbicacionMode('manual')}
              >
                <Type size={18} />
                Manual
              </button>
            </div>

            {ubicacionMode === 'url' ? (
              <div>
                <input
                  type="text"
                  placeholder="Pega aquí la URL de Google Maps"
                  value={mapsUrl}
                  onChange={(e) => setMapsUrl(e.target.value)}
                />
                <button
                  className="extract-btn"
                  onClick={handleExtractCoordinates}
                >
                  <MapPin size={20} />
                  Extraer Coordenadas
                </button>
                {extractedCoords && (
                  <div className="coords-preview">
                    <CheckCircle size={16} />
                    <span>Coordenadas: {extractedCoords}</span>
                  </div>
                )}
              </div>
            ) : (
              <input
                type="text"
                placeholder="19.4253, -100.3542"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className={errors.ubicacion ? 'error' : ''}
              />
            )}
            {errors.ubicacion && <span className="error-text">{errors.ubicacion}</span>}
          </div>

          <div className="form-group">
            <label>Código *</label>
            <input
              type="text"
              placeholder="Cd. Zitácuaro01"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className={errors.codigo ? 'error' : ''}
            />
            {errors.codigo && <span className="error-text">{errors.codigo}</span>}
          </div>
        </div>

        <div className="form-footer">
          <button className="btn btn-cancel" onClick={onCancel} disabled={saving}>
            Cancelar
          </button>
          <button
            className="btn btn-save"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  )
}
