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
import { Component, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { Dataset } from '../../shared/models/asterixDB.model'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as datasetActions from '../../shared/actions/dataset.actions'
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Subscription } from "rxjs/Rx";
import { State } from '../../shared/reducers/dataset.reducer';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

/**
 * Root component
 * Defines our application's layout
 */
@Component({
  selector: 'datasets',
  templateUrl: 'datasets.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['datasets.component.scss']
})

export class DatasetCollection {
  displayedColumns = "['CompactionPolicy', 'DatasetId', 'DatasetName', 'DatasetType', 'DatatypeDataverseName', 'DatatypeName', 'DataverseName', 'GroupName', 'PendingOp', 'Timestamp']"

/*
  compactionPolicy: string;
  compactionPolicyProperties: CompactionPolicyProperties[]; *
  datasetId: string;
  datasetName: string;
  datasetType:string;
  datatypeDataverseName: string;
  datatypeName: string;
  dataverseName: string;
  groupName:string;
  hints: string[]; *
  internalDetails: InternalDetails; *
  pendingOp: string;
  timestamp: string; */

  dataSource: DatasetDataSource | null;
  loaded$: Observable<any>
  selection = new SelectionModel<string>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(private store: Store<any>) {
    this.loaded$ = this.store.select('dataset');
    this.store.select("dataset").subscribe((data: any) => {
      //this.zone.run(() => {
      //  console.log(data.datasets)
      //    console.log(data.loaded)
      //      console.log(data.loading)
      //this.totalScore = data.useData.totalScore;
  //  });
      });

    //  this.store.select(s => s.dataset.datasets).subscribe((data: any) => {
        //this.zone.run(() => {
    //      console.log("DATASETS")
    //      console.log(data)

        //this.totalScore = data.useData.totalScore;
    //  });
      //  });
  }

  getDatasets() {
    this.store.dispatch(new datasetActions.SelectDatasets('-'));
  }

  ngOnInit() {
    this.dataSource = new DatasetDataSource(this.store);
    //Observable.fromEvent(this.filter.nativeElement, 'keyup')
    //    .debounceTime(150)
    //    .distinctUntilChanged()
    //    .subscribe(() => {
    //      console.log('filtering')
    //      if (!this.dataSource) { return; }
          //this.dataSource.filter = this.filter.nativeElement.value;
    //    });
  }
}

export class DatasetDataSource extends DataSource<any> {
  private datasets$: Observable<any>

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  constructor(private store: Store<any>) {
    super();
    this.datasets$ = this.store.select(s => s.dataset.datasets.results);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Dataset[]> {
      const displayDataChanges = [
        this.datasets$,
        this._filterChange,
      ];

    return this.datasets$;

    //return Observable.merge(...displayDataChanges).map(() => {
  //    return this.datasets$.filter((item: Dataset) => {
    //    let searchStr = (datasetName.name).toLowerCase(); // + item.color).toLowerCase();
    //    return searchStr.indexOf(this.filter.toLowerCase()) != -1;
    //  });
    //});
  }

  disconnect() {}
}
