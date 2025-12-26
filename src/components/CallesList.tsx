import { useState, useMemo } from 'react'
import { Calle } from '../types'
import { Plus, Pencil, Trash2, MapPin, Loader } from 'lucide-react'
import './CallesList.css'

interface CallesListProps {
  calles: Calle[]
  loading: boolean
  onAddNew: () => void
  onEdit: (calle: Calle) => void
  onDelete: (calle: Calle) => void
  isDark: boolean
}

export default function CallesList({
  calles,
  loading,
  onAddNew,
  onEdit,
  onDelete,
  isDark,
}: CallesListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'codigo' | 'calle' | 'colonia'>('codigo')

  const filteredCalles = useMemo(() => {
    let result = calles

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (c) =>
          c.calle.toLowerCase().includes(query) ||
          c.colonia.toLowerCase().includes(query) ||
          c.codigo.toLowerCase().includes(query) ||
          c.nodos?.toLowerCase().includes(query)
      )
    }

    return result.sort((a, b) => {
      if (sortBy === 'calle') return a.calle.localeCompare(b.calle)
      if (sortBy === 'colonia') return a.colonia.localeCompare(b.colonia)
      return a.codigo.localeCompare(b.codigo)
    })
  }, [calles, searchQuery, sortBy])

  return (
    <div className="calles-list">
      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar calle, colonia o código..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="search-clear"
            onClick={() => setSearchQuery('')}
            title="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      <div className="filter-section">
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
        >
          <option value="codigo">Ordenar por: Código</option>
          <option value="calle">Ordenar por: Calle</option>
          <option value="colonia">Ordenar por: Colonia</option>
        </select>

        <span className="result-count">
          {filteredCalles.length} {filteredCalles.length === 1 ? 'calle' : 'calles'}
        </span>
      </div>

      {loading ? (
        <div className="loading-container">
          <Loader className="spinner" size={40} />
          <p>Cargando calles...</p>
        </div>
      ) : filteredCalles.length === 0 ? (
        <div className="empty-state">
          <p>
            {searchQuery
              ? 'No se encontraron calles con ese término'
              : 'No hay calles registradas'}
          </p>
          <p className="empty-hint">Toca el botón + para agregar una</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="calles-table">
            <thead>
              <tr>
                <th>CALLE</th>
                <th>COLONIA</th>
                <th>NODOS</th>
                <th>UBICACIÓN</th>
                <th>REFERENCIAS</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {filteredCalles.map((calle) => (
                <tr key={calle.id} className="table-row">
                  <td className="cell-calle">
                    <strong>{calle.calle}</strong>
                  </td>
                  <td>{calle.colonia}</td>
                  <td className="cell-nodos">{calle.nodos || '-'}</td>
                  <td className="cell-ubicacion">
                    {calle.ubicacion ? (
                      <a
                        href={`https://www.google.com/maps/search/${encodeURIComponent(
                          calle.calle + ', ' + calle.colonia
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link-inline"
                        title="Ver en Google Maps"
                      >
                        📍 {calle.ubicacion}
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="cell-codigo">
                    <span className="codigo-badge">{calle.codigo}</span>
                  </td>
                  <td className="cell-actions">
                    <button
                      className="btn-table-edit"
                      onClick={() => onEdit(calle)}
                      title="Editar"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="btn-table-delete"
                      onClick={() => onDelete(calle)}
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button className="fab" onClick={onAddNew} title="Agregar nueva calle">
        <Plus size={32} />
      </button>
    </div>
  )
}
