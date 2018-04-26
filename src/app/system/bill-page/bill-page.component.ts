import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.services';
import { Observable } from 'rxjs/Observable';
import { Bill } from '../shared/models/bill.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  private subscription$: Subscription;

  constructor(private billService: BillService) { }

  public ngOnInit() {
    this.subscription$ = Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
      console.log(data);
    })
  }

  public ngOnDestroy() {
    if (this.subscription$)
    this.subscription$.unsubscribe();
  }
}
