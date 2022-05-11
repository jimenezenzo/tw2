import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartOpen = false;
  isOpen = false;
  cantidadCarrito: number = 0;

  constructor(private store: Store) {
    this.store.select(state => state.carrito.productos).subscribe(p => {
      this.cantidadCarrito = p.length
    })
  }

  ngOnInit(): void {
  }

}
