import { NgModule } from '@angular/core';
import { ConvertTimeFormatPipe } from './convert-time-format.pipe';

@NgModule({
  declarations: [
    ConvertTimeFormatPipe,
  ],
  exports: [
    ConvertTimeFormatPipe,
  ],
})

export class PipesModule { }
