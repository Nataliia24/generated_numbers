import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NumberGeneratorComponent } from './number-generator/number-generator.component';

const routes: Routes = [{ path: '', component: NumberGeneratorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
