import { AlertTriangle } from 'lucide-react'
import './DeleteModal.css'

interface DeleteModalProps {
  calleName: string
  onConfirm: () => void
  onCancel: () => void
  isDark: boolean
}

export default function DeleteModal({
  calleName,
  onConfirm,
  onCancel,
  isDark,
}: DeleteModalProps) {
  return (
    <div className="delete-modal">
      <div className="delete-overlay" onClick={onCancel} />
      <div className="delete-container">
        <div className="delete-icon">
          <AlertTriangle size={48} />
        </div>

        <h2>¿Eliminar calle?</h2>
        <p>¿Estás seguro que deseas eliminar "{calleName}"? Esta acción no se puede deshacer.</p>

        <div className="delete-buttons">
          <button className="btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-delete" onClick={onConfirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
