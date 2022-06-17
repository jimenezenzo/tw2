export class Filtros {
  color: Color
  marca: Marca
  bateria: Bateria
  almacenamiento: Almacenamiento
  memoria: Memoria
  busqueda: string = ''

  constructor(color: Color, marca: Marca, bateria: Bateria, almacenamiento: Almacenamiento, memoria: Memoria) {
    this.color = color
    this.marca = marca
    this.bateria = bateria
    this.almacenamiento = almacenamiento
    this.memoria = memoria
  }
}


export const enum Color {
  TODOS = 'Todos',
  BLANCO = 'Blanco',
  NEGRO = 'Negro',
  ROJO = 'Rojo'
}

export const enum Marca {
  TODOS = 'Todos',
  SAMSUNG = 'Samsung',
  MOTOROLA = 'Motorola',
  LG = 'LG',
  XIAOMI = 'Xiaomi',
  APPLE = 'Apple'
}

export const enum Bateria {
  TODOS = 'Todos',
  '3000 mah' = '3000 mah',
  '3500 mah' = '3500 mah',
  '4000 mah' = '4000 mah',
  '4500 mah' = '4500 mah',
  '5000 mah' = '5000 mah'
}

export const enum Almacenamiento {
  TODOS = 'Todos',
  '32 GB' = '32 GB',
  '64 GB' = '64 GB',
  '128 GB' = '128 GB',
  '256 GB' = '256 GB',
  '512 GB' = '512 GB',
  '1 TB' = '1 TB'
}

export const enum Memoria {
  TODOS = 'Todos',
  '1 gb' = '1 GB',
  '2 gb' = '2 GB',
  '4 gb' = '4 GB',
  '6 gb' = '6 GB'
}


export interface FiltroStateModel {
    filtros: Filtros
}

export interface FiltroYValor {
  filtro: 'Bateria' | 'Memoria' | 'Almacenamiento' | 'Color' | 'Marca'
  valor: string
}
