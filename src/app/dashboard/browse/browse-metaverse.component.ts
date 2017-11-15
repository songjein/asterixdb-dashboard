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
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dataverse } from '../../shared/models/asterixDB.model'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as dataverseActions from '../../shared/actions/dataverse.actions'
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

@Component({
	moduleId: module.id,
	selector: 'awc-metaverse',
	templateUrl: 'browse-metaverse.component.html',
	styleUrls: ['browse-metaverse.component.scss']
})

export class MetaverseComponent implements OnInit {

	loaded$: Observable<any>

	constructor(private store: Store<any>) {
    this.loaded$ = this.store.select('dataverse.results');
	}

	ngOnInit(): void {}
}
