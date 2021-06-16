import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Clientes } from '../_model/Clientes';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  clienteCambio = new Subject<Clientes[]>();
  mensajeCambio = new Subject<string>();

  url = '/clientes';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Clientes[]>(this.url);
  }

  registrar(cliente: Clientes) {
    return this.http.post(this.url, cliente);
  }

  modificar(cliente: Clientes) {
    return this.http.put(this.url, cliente);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listarClientePorId(id: number) {
    return this.http.get<Clientes>(`${this.url}/${id}`);
  }
}
