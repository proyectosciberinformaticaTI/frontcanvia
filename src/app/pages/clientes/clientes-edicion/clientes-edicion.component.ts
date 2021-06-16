import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Clientes } from 'src/app/_model/Clientes';
import { ClientesService } from 'src/app/_service/clientes.service';

@Component({
  selector: 'app-clientes-edicion',
  templateUrl: './clientes-edicion.component.html',
  styleUrls: ['./clientes-edicion.component.scss'],
})
export class ClientesEdicionComponent implements OnInit {
  id: number;
  form: FormGroup;
  edicion: boolean = false;
  cliente: Clientes;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClientesService
  ) {
    this.form = new FormGroup({
      id_tb_cliente: new FormControl(0),

      nombre: new FormControl(''),
      apellido: new FormControl(''),
      correo: new FormControl(''),
    });
    console.log('Consulta por formulario  ' + this.form);
    console.log('Consulta por final   ' + this.form);
  }

  ngOnInit(): void {
    this.cliente = new Clientes();

    console.log('Consulta por id primero sssssss  ' + this.cliente);
    this.route.params.subscribe((params: Params) => {
      console.log('Consulta por id primero   ' + this.id);
      console.log('Consulta por id segundo   ' + params['id_tb_cliente']);
      this.id = params['id'];
      console.log('Consulta por id tercero   ' + this.id);
      console.log('Consulta por id cuarto   ' + params['id_tb_cliente']);
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.clienteService.listarClientePorId(this.id).subscribe((data) => {
        console.log('actualizacion ' + data);
        this.form = new FormGroup({
          id_tb_cliente: new FormControl(data.id_tb_cliente),
          nombre: new FormControl(data.nombre),
          apellido: new FormControl(data.apellido),
          correo: new FormControl(data.correo),
        });
      });
    }
  }

  operar() {
    this.cliente.id_tb_cliente = this.form.value['id_tb_cliente'];
    this.cliente.nombre = this.form.value['nombre'];
    this.cliente.apellido = this.form.value['apellido'];
    this.cliente.correo = this.form.value['correo'];
    console.log('Se modifico ' + this.edicion);
    if (this.edicion) {
      this.clienteService.modificar(this.cliente).subscribe((data) => {
        this.clienteService.listar().subscribe((clientes) => {
          this.clienteService.clienteCambio.next(clientes);
          this.clienteService.mensajeCambio.next('Se modificó');
        });
      });
    } else {
      this.clienteService.registrar(this.cliente).subscribe((data) => {
        this.clienteService.listar().subscribe((clientes) => {
          this.clienteService.clienteCambio.next(clientes);
          this.clienteService.mensajeCambio.next('Se registró');
        });
      });
    }

    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }
}
