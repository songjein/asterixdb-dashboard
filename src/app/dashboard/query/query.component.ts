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
import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as sqlQueryActions from '../../shared/actions/query.actions'
import * as CodeMirror from 'codemirror';

/*
 * query component
 * has editor (codemirror) for writing some query
 */
@Component({
	moduleId: module.id,
	selector: 'awc-query',
	templateUrl:'query.component.html',
	styleUrls: ['query.component.scss']
})

export class QueryComponent {
	// Typed query
	queryString: string = "USE TinySocial; SELECT * FROM ChirpUsers;"
	queryMessage: string;
	execution_time: number;
	limit: number = 25; // maximum rows in one page
	pages: number[] = []; // page numbers
	isLoading: boolean = false;
	/* Codemirror configuration
	*/
	codemirrorConfig = 	{ 	mode: "asterix",
												//lineNumbers: true,
												lineWrapping: true,
												showCursorWhenSelecting: true,
												autofocus: true
											}	;

	loaded$: Observable<any>

	constructor(private store: Store<any>) {
		this.loaded$ = this.store.select('sqlQuery');
		this.store.select("sqlQuery").subscribe((data: any) => {
			if (data.sqlQueryError.errors){
				this.queryMessage = data.sqlQueryError.errors[0].msg
			}else{
				this.queryMessage = ""
			}
		})
	}

	getQueryResults(queryString: string) {
    this.store.dispatch(new sqlQueryActions.ExecuteQuery(queryString));
  }

	onClick() {
		this.getQueryResults(this.queryString.replace(/\n/g, " "));
	}


	/**
	 * process query result

	processQueryResult(result: any): void{

		if (result.status != "success"){
			this.query_message = result.errors
			return;
		}
		this.allData = result.results;

		this.pages = [];
		// generate page numbers
		for (let i = 0 ; i < this.allData.length / this.limit; i ++){
			this.pages.push(i + 1);
		}

		// make colums using first row
		const labels = Object.keys(this.allData[0]);
		for ( var i = 0; i < labels.length; i++ ) {
			this.cols.push(labels[i]);
		}

		this.getPageData(1);

		this.isLoading = false;
	}*/


	/**
	 * if click 'send query'
	 */

}
