import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'
import CallesList from './components/CallesList'
import CalleForm from './components/CalleForm'
import SettingsPanel from './components/SettingsPanel'
import DeleteModal from './components/DeleteModal'
import { Calle } from './types'
import { Sun, Moon } from 'lucide-react'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme-mode')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const [calles, setCalles] = useState<Calle[]>([])
  const [loading, setLoading] = useState(true)
  const [currentTab, setCurrentTab] = useState<'calles' | 'settings'>('calles')
  const [formVisible, setFormVisible] = useState(false)
  const [selectedCalle, setSelectedCalle] = useState<Calle | null>(null)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  useEffect(() => {
    document.body.className = isDark ? 'dark-mode' : 'light-mode'
    localStorage.setItem('theme-mode', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    fetchCalles()
  }, [])

  const fetchCalles = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('calles')
        .select('*')
        .order('codigo', { ascending: true })

      if (error) throw error
      setCalles(data || [])
    } catch (error) {
      console.error('Error fetching calles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddNew = () => {
    setSelectedCalle(null)
    setFormVisible(true)
  }

  const handleEdit = (calle: Calle) => {
    setSelectedCalle(calle)
    setFormVisible(true)
  }

  const handleSave = async (data: Omit<Calle, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (selectedCalle) {
        const { error } = await supabase
          .from('calles')
          .update(data)
          .eq('id', selectedCalle.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('calles')
          .insert([data])

        if (error) throw error
      }

      await fetchCalles()
      setFormVisible(false)
      setSelectedCalle(null)
    } catch (error) {
      console.error('Error saving calle:', error)
      alert('Error al guardar')
    }
  }

  const handleDelete = (calle: Calle) => {
    setSelectedCalle(calle)
    setDeleteModalVisible(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedCalle) return

    try {
      const { error } = await supabase
        .from('calles')
        .delete()
        .eq('id', selectedCalle.id)

      if (error) throw error

      await fetchCalles()
      setDeleteModalVisible(false)
      setSelectedCalle(null)
    } catch (error) {
      console.error('Error deleting calle:', error)
      alert('Error al eliminar')
    }
  }

  const getNextCodigo = () => {
    if (calles.length === 0) return 'Cd. Zitácuaro01'

    const numbers = calles
      .map(c => {
        const match = c.codigo.match(/(\d+)$/)
        return match ? parseInt(match[1]) : 0
      })
      .filter(n => n > 0)

    const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0
    return `Cd. Zitácuaro${String(maxNumber + 1).padStart(2, '0')}`
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>📍 Calles Zitácuaro</h1>
          <button
            className="theme-toggle"
            onClick={() => setIsDark(!isDark)}
            title={isDark ? 'Modo claro' : 'Modo oscuro'}
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        <div className="tabs">
          <button
            className={`tab ${currentTab === 'calles' ? 'active' : ''}`}
            onClick={() => setCurrentTab('calles')}
          >
            Calles ({calles.length})
          </button>
          <button
            className={`tab ${currentTab === 'settings' ? 'active' : ''}`}
            onClick={() => setCurrentTab('settings')}
          >
            Ajustes
          </button>
        </div>
      </header>

      <main className="app-main">
        {currentTab === 'calles' ? (
          <CallesList
            calles={calles}
            loading={loading}
            onAddNew={handleAddNew}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDark={isDark}
          />
        ) : (
          <SettingsPanel
            calles={calles}
            onRefresh={fetchCalles}
            isDark={isDark}
          />
        )}
      </main>

      {formVisible && (
        <CalleForm
          calle={selectedCalle}
          suggestedCodigo={getNextCodigo()}
          onSave={handleSave}
          onCancel={() => {
            setFormVisible(false)
            setSelectedCalle(null)
          }}
          isDark={isDark}
        />
      )}

      {deleteModalVisible && selectedCalle && (
        <DeleteModal
          calleName={selectedCalle.calle}
          onConfirm={handleDeleteConfirm}
          onCancel={() => {
            setDeleteModalVisible(false)
            setSelectedCalle(null)
          }}
          isDark={isDark}
        />
      )}
    </div>
  )
}

export default App
