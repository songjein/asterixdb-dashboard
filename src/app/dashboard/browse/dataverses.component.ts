/*
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Dataverse } from '../../shared/models/asterixDB.model'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as dataverseActions from '../../shared/actions/dataverse.actions'
import { ElementRef, ViewChild} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from "rxjs/Rx";
import * as fromRoot from '../../shared/reducers/dataverse.reducer';
import { State } from '../../shared/reducers/dataverse.reducer';
import { MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'dataverses',
  templateUrl: 'dataverses.component.html',
  styleUrls: ['dataverses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DataverseCollection {
  displayedColumns = ['DataverseName', 'Dataformat', 'Timestamp', 'PendingOp'];
  dataSource: ExampleDataSource | null;
  loaded$: Observable<any>;
  selection = new SelectionModel<string>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(private store: Store<any>) {
    this.loaded$ = this.store.select('dataverse');
  }

  getDataverse() {
    this.store.dispatch(new dataverseActions.SelectDataverses('-'));
  }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.store);
    //Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //    .debounceTime(150)
    //    .distinctUntilChanged()
    //    .subscribe(() => {
          //if (!this.dataSource) { return; }
          //this.dataSource.filter = this.filter.nativeElement.value;
    //    });
  }
}

  /**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
 export class ExampleDataSource extends DataSource<any> {
    dataverseok$: Observable<any>

    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }

    constructor(private store: Store<any>) {
      super();
      this.dataverseok$ = this.store.select(s => s.dataverse.dataverses.results);
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Dataverse[]> {
        const displayDataChanges = [
          this.dataverseok$,
          this._filterChange,
        ];

      return this.dataverseok$;

      //new Observable<Dataverse[]>(); // this.dataverseok$; // .map((dataverse) => { return dataverse.results; });

      //return Observable.merge(...displayDataChanges).map(() => {
      //  return this._exampleDatabase.data.slice().filter((item: UserData) => {
      //    let searchStr = (item.name + item.color).toLowerCase();
      //    return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      //  });
      //});
    }

    disconnect() {}
  }
