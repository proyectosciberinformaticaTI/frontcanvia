import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clientes } from '../_model/Clientes';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private url = 'localhost:8080/clientes';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<Clientes[]>(this.url);
  }
}
