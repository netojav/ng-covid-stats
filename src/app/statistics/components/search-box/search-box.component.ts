import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@shared';
import { debounceTime, startWith } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-search-box',
  template: `
    <form [formGroup]="form" fxLayout="column">
      <mat-form-field>
        <input
          matInput
          placeholder="Search by Country Name"
          formControlName="searchTerm"
        />
        <button
          *ngIf="!!searchTermField.value"
          matTooltip="Clear Search"
          mat-icon-button
          matSuffix
          (click)="onClearSearchTerm()"
        >
          <mat-icon>clear</mat-icon>
        </button>
      </mat-form-field>
    </form>
  `
})
export class SearchBoxComponent implements OnInit, OnChanges {
  @Input() searchTerm: string;

  @Output() searchChange = new EventEmitter<string>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      searchTerm: ''
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']?.currentValue) {
      this.searchTermField.setValue(this.searchTerm);
    }
  }

  get searchTermField() {
    return this.form.get('searchTerm');
  }

  ngOnInit(): void {
    this.searchTermField?.valueChanges
      .pipe(debounceTime(500), untilDestroyed(this))
      .subscribe(term => this.searchChange.emit(term));
  }

  onClearSearchTerm() {
    this.searchTermField.setValue(null);
  }
}
