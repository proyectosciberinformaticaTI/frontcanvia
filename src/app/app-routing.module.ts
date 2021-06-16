import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesEdicionComponent } from './pages/clientes/clientes-edicion/clientes-edicion.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

const routes: Routes = [
  {
    path: 'cliente',
    component: ClientesComponent,
    children: [
      { path: 'nuevo', component: ClientesEdicionComponent },
      { path: 'edicion/:id', component: ClientesEdicionComponent },
    ],
  },
  { path: '*', component: ClientesComponent },
  { path: 'edicion/:id', component: ClientesEdicionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
