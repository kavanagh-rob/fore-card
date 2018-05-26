import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatRadioModule, MatToolbarModule,
  MatInputModule, MatProgressSpinnerModule, MatCardModule, MatListModule, MatIconModule  } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatRadioModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule,
    MatCardModule, MatListModule, MatIconModule],
  exports: [MatButtonModule, MatRadioModule , MatToolbarModule, MatInputModule, MatProgressSpinnerModule,
    MatCardModule, MatListModule, MatIconModule],
})
export class MaterialModule { }
