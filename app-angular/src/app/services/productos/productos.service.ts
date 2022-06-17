import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from "../../models/producto";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private httpCliente: HttpClient) {}

  getAllProducts(){
    return this.httpCliente.get<Producto[]>('http://localhost:4000/api/productos')
  }

<<<<<<< Updated upstream
=======
  getProductosFiltrados(filtros: Filtros){
    let filtrosParaEnviar: Map<string, any> = new Map()

    for (const propFiltro in filtros) {
      if (filtros[propFiltro] !== 'Todos' && propFiltro !== 'busqueda') {
        filtrosParaEnviar.set(propFiltro.toLowerCase(), filtros[propFiltro])
      }
      if (propFiltro === 'busqueda' && filtros[propFiltro] !== '') {
        filtrosParaEnviar.set('descripcion', {
          $regex: `${filtros[propFiltro]}`, $options: 'i'
        })
      }
    }

    return this.httpCliente.post<Producto[]>(
    'http://localhost:4000/api/buscar-productos',
        Object.fromEntries(filtrosParaEnviar)
      )
  }
>>>>>>> Stashed changes
}
