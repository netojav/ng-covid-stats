import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { Shell } from '@app/shell/shell.service';
import { CountryStatsDetailsComponent } from './containers/country-stats-details/country-stats-details.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/statistics', pathMatch: 'full' },
    {
      path: 'statistics',
      component: HomeComponent,
      data: { title: 'Covid-19 - Countries Stats' }
    },
    {
      path: 'statistics/country/:country',
      component: CountryStatsDetailsComponent,
      data: { title: 'Covid-19 - Country Stats Details' }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StatisticsRoutingModule {}
