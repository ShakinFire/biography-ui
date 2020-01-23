import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BiographyComponent } from './biography.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from '../services/services.module';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [BiographyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ServicesModule,
    MatIconModule,
    PipesModule,
  ]
})
export class BiographyModule { }
