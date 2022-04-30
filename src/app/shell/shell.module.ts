import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { components } from './components';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, MaterialModule, RouterModule],
  declarations: [...components]
})
export class ShellModule {}
