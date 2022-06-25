import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estado-compra',
  templateUrl: './estado-compra.component.html',
  styleUrls: ['./estado-compra.component.css']
})
export class EstadoCompraComponent implements OnInit {
  estado!: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.estado = params['status'];
      }
    );
  }

}
