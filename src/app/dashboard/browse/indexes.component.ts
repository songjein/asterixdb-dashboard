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
import { Index } from '../../shared/models/asterixDB.model'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as indexActions from '../../shared/actions/index.actions'
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
import { State } from '../../shared/reducers/index.reducer';
import { MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

/**
 * Root component
 * Defines our application's layout
 */
@Component({
  selector: 'indexes',
  templateUrl: 'indexes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['indexes.component.scss']
})

export class IndexCollection {
  displayedColumns = "['dataverseName', 'datasetName', 'indexName', 'indexStructure', 'isPrimary', 'timestamp', 'pendingOp']"
  /*
  dataverseName: string;
  datasetName: string;
  indexName: string;
  indexStructure: string;
  searchKey: string[];
  isPrimary: boolean;
  timestamp: string;
  pendingOp: string;
  */
  dataSource: IndexDataSource | null;
  loaded$: Observable<any>;
  selection = new SelectionModel<string>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(private store: Store<any>) {
    this.loaded$ = this.store.select('index');
  }

  getIndexes() {
    this.store.dispatch(new indexActions.SelectIndexes('-'));
  }

  ngOnInit() {
    this.dataSource = new IndexDataSource(this.store);
  }
}

export class IndexDataSource extends DataSource<any> {
  private indexes$: Observable<any>

  //_filterChange = new BehaviorSubject('');
  //get filter(): string { return this._filterChange.value; }
  //set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private store: Store<any>) {
    super();
    this.indexes$ = this.store.select(s => s.index.indexes.results);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Index[]> {
      const displayDataChanges = [
        this.indexes$,
      //  this._filterChange,
      ];

    return this.indexes$;
  }

  disconnect() {}
}
