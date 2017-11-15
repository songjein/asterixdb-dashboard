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
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Dataverse } from '../../shared/models/asterixDB.model'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as dataverseActions from '../../shared/actions/dataverse.actions'
import * as datasetActions from '../../shared/actions/dataset.actions'
import * as datatypesActions from '../../shared/actions/datatype.actions'
import * as indexesActions from '../../shared/actions/index.actions'
import * as metadataActions from '../../shared/actions/metadata.actions'
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
import * as fromRoot from '../../shared/reducers/dataverse.reducer';
import { State } from '../../shared/reducers/dataverse.reducer';
/**
 * query component
 * has editor (codemirror) for writing some query
 */
@Component({
	moduleId: module.id,
	selector: 'awc-metadata',
	templateUrl:'metadata.component.html',
	styleUrls: ['metadata.component.scss']
})

export class MetadataComponent implements OnInit {
	nodes = []
	itemsCounter = 0;
	private datatypes$: Observable<any>;
	datatypes = [];

	constructor(private store: Store<any>, private changeDetector: ChangeDetectorRef) {}

	ngOnInit(): void {

		// Watching for Datatypes
		this.datatypes$ = this.store.select(s => s.datatype.datatypes.results);
		this.datatypes$.subscribe((data: any[]) => {
			this.datatypes = data;
		});

		// Watching for the metadata tree
		this.store.select(s => s.metadata.tree).subscribe((data: any[]) => {
			this.nodes = [];
			this.itemsCounter = 0;
			let dataversesRoot = { id: 0, name:"", children:[] };
			dataversesRoot.id = 0;
			dataversesRoot.name = "DATAVERSES"
			for (let i = 0; i < data.length; i++) {

				// Don't want to show metadata system datasets, datatypes or indexes
				if (data[i]['DataverseName'] && data[i]['DataverseName'] !== "Metadata" )
				{
					// Counting dataverses to align the menu identifiers
					this.itemsCounter = this.itemsCounter + 1;
			    let dataverse = { id: 0, name:"", children:[] };
			    dataverse.id = this.itemsCounter;
			    dataverse.name = data[i]['DataverseName'];
					dataversesRoot.children.push(dataverse);

					// Adding the datasets to correspondent dataverse
					if (data[i]['Datasets'].length) {
						this.itemsCounter = this.itemsCounter + 1;
						let datasetRoot = { id: 0, name:"", children:[] };
						datasetRoot.id = this.itemsCounter;
						datasetRoot.name = "DATASETS";
						dataverse.children.push(datasetRoot);
						for (let j = 0; j < data[i]['Datasets'].length; j++) {
							this.itemsCounter = this.itemsCounter + 1;
							let dataset = { id: 0, name:"", children:[] };
							dataset.id = this.itemsCounter;
							dataset.name = data[i]['Datasets'][j]['DatasetName'];
							// Adding the datatype to correspondent dataset
							if (data[i]['Datasets'][j]['Datatype']) {
								this.itemsCounter = this.itemsCounter + 1;
								let datatypeRoot = { id: 0, name:"", children:[] };
								datatypeRoot.id = this.itemsCounter;
								datatypeRoot.name = "Datatype: " + data[i]['Datasets'][j]['Datatype']['DatatypeName'];
								dataset.children.push(datatypeRoot);
							}

							// Adding the indexes to correspondent dataset
							if (data[i]['Datasets'][j]['Indexes'].length) {
								this.itemsCounter = this.itemsCounter + 1;
								let datatypeRoot = { id: 0, name:"", children:[] };
								datatypeRoot.id = this.itemsCounter;
								datatypeRoot.name = "INDEXES";
								dataset.children.push(datatypeRoot);
								for (let k = 0; k < data[i]['Datasets'][j]['Indexes'].length; k++) {
									this.itemsCounter = this.itemsCounter + 1;
									let datatype = { id: 0, name:"", children:[] };
									datatype.id = this.itemsCounter;
									datatype.name = data[i]['Datasets'][j]['Indexes'][k]['IndexName'];
									datatypeRoot.children.push(datatype);
								}
							}
							datasetRoot.children.push(dataset)
						}
					}
				}
			}
			this.nodes.push(dataversesRoot);

			// Adding the datatypes available in the metadata
			this.itemsCounter = this.itemsCounter + 1;
			let indexesRoot = { id: 0, name:"", children:[] };
			indexesRoot.id = this.itemsCounter;
			indexesRoot.name = "DATATYPES";

			if (this.datatypes){
	      for (let l = 0; l < this.datatypes.length; l++) {
					let datatype = { id: 0, name:"", children:[] };
					// Don't want to show metadata system datatypes
					if (this.datatypes[l]['DataverseName'] !== "Metadata" ){
						this.itemsCounter = this.itemsCounter + 1;
						datatype.id = this.itemsCounter;
						datatype.name = this.datatypes[l]['DatatypeName'];
						indexesRoot.children.push(datatype);
					}
	     	}
			}
			this.nodes.push(indexesRoot);

			// Component View Refresh
			this.changeDetector.detectChanges();
		});
	}

	treeCalc() {
		this.store.dispatch(new metadataActions.UpdateMetadataTree());
	}
}
