import { Calle } from '../types'

export const EXAMPLE_CALLES: Omit<Calle, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    calle: 'Mora del Calzonazo esq. Jose Maria Coss',
    colonia: 'El Cerrito, Melchor Ocampo',
    nodos: 'Cd. Zitácuaro01',
    ubicacion: '19.4253, -100.3542',
    codigo: 'Cd. Zitácuaro01',
  },
  {
    calle: 'Pipila Sur, Abasolo Sur',
    colonia: 'Dámaso Cárdenas',
    nodos: 'Cd. Zitácuaro02',
    ubicacion: '19.4267, -100.3589',
    codigo: 'Cd. Zitácuaro02',
  },
  {
    calle: 'Mallí, Entre Gema y Rubí',
    colonia: 'Lázaro Cárdenas',
    nodos: 'Cd. Zitácuaro03',
    ubicacion: '19.4302, -100.3612',
    codigo: 'Cd. Zitácuaro03',
  },
  {
    calle: 'Avenida Revolución',
    colonia: 'Centro',
    nodos: 'Cd. Zitácuaro04',
    ubicacion: '19.4358, -100.3588',
    codigo: 'Cd. Zitácuaro04',
  },
  {
    calle: 'Calle Hidalgo Norte',
    colonia: 'Centro',
    nodos: 'Cd. Zitácuaro05',
    ubicacion: '19.4372, -100.3601',
    codigo: 'Cd. Zitácuaro05',
  },
  {
    calle: 'Benito Juárez esq. Morelos',
    colonia: 'Independencia',
    nodos: 'Cd. Zitácuaro06',
    ubicacion: '19.4289, -100.3654',
    codigo: 'Cd. Zitácuaro06',
  },
  {
    calle: 'Avenida Constitución',
    colonia: 'San Miguel',
    nodos: 'Cd. Zitácuaro07',
    ubicacion: '19.4401, -100.3523',
    codigo: 'Cd. Zitácuaro07',
  },
  {
    calle: 'Francisco I. Madero',
    colonia: 'La Soledad',
    nodos: 'Cd. Zitácuaro08',
    ubicacion: '19.4312, -100.3489',
    codigo: 'Cd. Zitácuaro08',
  },
  {
    calle: 'Vicente Guerrero',
    colonia: 'Santa María',
    nodos: 'Cd. Zitácuaro09',
    ubicacion: '19.4445, -100.3612',
    codigo: 'Cd. Zitácuaro09',
  },
  {
    calle: 'Allende Norte',
    colonia: 'El Progreso',
    nodos: 'Cd. Zitácuaro10',
    ubicacion: '19.4389, -100.3678',
    codigo: 'Cd. Zitácuaro10',
  },
]
