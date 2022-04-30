import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { containers } from './containers';
import { CovidStatsService } from './services/covid-stats.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { components } from './components';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    StatisticsRoutingModule
  ],
  providers: [CovidStatsService],
  declarations: [...components, ...containers]
})
export class StatisticsModule {}
