import { Calle } from '../types'

export async function exportToCSV(calles: Calle[]): Promise<boolean> {
  try {
    const header = 'Código,Calle,Colonia,Nodos,Ubicación\n'
    const rows = calles.map(
      (calle) =>
        `"${calle.codigo}","${calle.calle}","${calle.colonia}","${calle.nodos || ''}","${calle.ubicacion || ''}"`
    )
    const csv = header + rows.join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', `calles_zitacuaro_${new Date().getTime()}.csv`)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    return true
  } catch (error) {
    console.error('Error exporting CSV:', error)
    return false
  }
}
