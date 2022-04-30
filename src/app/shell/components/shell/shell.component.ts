import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';

import { UntilDestroy, untilDestroyed } from '@shared';

@UntilDestroy()
@Component({
  selector: 'app-shell',
  template: `
    <div fxFlex>
      <app-header [sidenav]="sidenav"></app-header>
      <mat-sidenav-container fxFill>
        <mat-sidenav #sidenav mode="over" ngClass.gt-sm="has-border">
          <nav>
            <mat-list>
              <mat-divider></mat-divider>
              <a
                mat-list-item
                routerLink="/statistics"
                routerLinkActive="active"
                (click)="sidenav.close()"
              >
                <span>Statistics</span>
              </a>
              <mat-divider></mat-divider>
            </mat-list>
          </nav>
        </mat-sidenav>
        <mat-sidenav-content>
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements AfterViewInit {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;

  constructor(private breakpoint: BreakpointObserver) {}

  ngAfterViewInit() {
    // Automatically close side menu on screens > small breakpoint
    this.breakpoint
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        filter(({ matches }) => !matches),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.sidenav.close();
      });
  }
}
