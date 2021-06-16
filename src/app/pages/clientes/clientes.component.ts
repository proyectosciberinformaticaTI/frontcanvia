import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Clientes } from 'src/app/_model/Clientes';
import { ClientesService } from 'src/app/_service/clientes.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  dataSource: MatTableDataSource<Clientes>;
  displayedColumns = [
    'id_tb_cliente',
    'nombre',
    'apellido',
    'correo',
    'Acciones',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private clienteService: ClientesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.clienteService.clienteCambio.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.clienteService.mensajeCambio.subscribe((data) => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.clienteService.listar().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  eliminar(idCliente: number) {
    console.log('Entro eliminooooooooo' + idCliente);
    if (idCliente > 0) {
      this.clienteService.eliminar(idCliente).subscribe((data) => {
        console.log('Se eliminoooooooooo ' + data);
        this.clienteService.listar().subscribe((data) => {
          this.clienteService.clienteCambio.next(data);
          this.clienteService.mensajeCambio.next('Se eliminó');
        });
      });
      window.location.reload();
    }
  }
}
