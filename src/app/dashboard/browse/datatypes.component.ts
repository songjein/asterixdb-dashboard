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
import { Datatype } from '../../shared/models/asterixDB.model'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as datatypeActions from '../../shared/actions/datatype.actions'
import { ElementRef, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from "rxjs/Rx";
import { State } from '../../shared/reducers/datatype.reducer';
import { MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'datatypes',
  templateUrl: 'datatypes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['datatypes.component.scss']
})

export class DatatypeCollection {
  displayedColumns = "['datatypeName', 'dataverseName', 'timeStamp']"
  /*
  datatypeName: string;
  dataverseName: string;
  derived: DatatypeDerived;
  timeStamp: string;
  */
  dataSource: DatatypeDataSource | null;
  loaded$: Observable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  selection = new SelectionModel<string>(true, []);
  
  constructor(private store: Store<any>) {
    this.loaded$ = this.store.select('datatype');
  }

  getDatatypes() {
    this.store.dispatch(new datatypeActions.SelectDatatypes('-'));
  }

  ngOnInit() {
    this.dataSource = new DatatypeDataSource(this.store);
  }
}

export class DatatypeDataSource extends DataSource<any> {
  private datatypes$: Observable<any>

  //_filterChange = new BehaviorSubject('');
  //get filter(): string { return this._filterChange.value; }
  //set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private store: Store<any>) {
    super();
    this.datatypes$ = this.store.select(s => s.datatype.datatypes.results);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Datatype[]> {
      const displayDataChanges = [
        this.datatypes$,
      //  this._filterChange,
      ];

    return this.datatypes$;
  }

  disconnect() {}
}
