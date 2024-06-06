import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormTourComponent } from './form-tour/form-tour.component';

const routes: Routes = [{ path: 'form-tour', component: FormTourComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
