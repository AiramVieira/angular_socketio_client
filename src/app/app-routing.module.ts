import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppCustomPreloader } from './providers/app.custom-preloader';
import { IndexViewComponent } from './views/index/index.component';
import { LoginViewComponent } from './views/login/login.component';

const ROUTES: Routes = [
  {
    path: 'login', component: LoginViewComponent
  },
  // {
  //   /* *******************************************************************************************************
  //    * ROUTING EMPRESAS
  //    * ******************************************************************************************************/
  //   path: 'index', component: IndexViewComponent, children: [
  //     { path: '', loadChildren: "../app/pages/home/tabs/Empresas/Empresa.module#EmpresaModule" }
  //   ]
  // },
  {
    path: '', component: IndexViewComponent
  },
  {
    path: '**', redirectTo: '/'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      ROUTES, {
        preloadingStrategy: AppCustomPreloader
      }
    )
  ],
  exports: [RouterModule],
  providers: [AppCustomPreloader]
})
export class AppRoutingModule {
  AplicationRoutes = RouterModule.forRoot(
    ROUTES, { enableTracing: true }
  );
}
