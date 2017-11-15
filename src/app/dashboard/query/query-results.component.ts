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
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as sqlQueryActions from '../../shared/actions/query.actions'
/**
 * query component
 * has editor (codemirror) for writing some query
 */
@Component({
	moduleId: module.id,
	selector: 'awc-results',
	templateUrl:'query-results.component.html',
	styleUrls: ['query-results.component.scss']
})

export class QueryResultsComponent implements OnInit {

	treeOpen = false;
	rootClass = "root-closed";
	leafList = "leaf-list-closed";
	queryString: string;


	/**
	 * data, cols will be injected to the table
	 */
	data: any[];
	allData: any[];
	cols: any[];

	// query result message
	query_message: string;
	execution_time: number;

	/**
	 * expansion status
	 */
	expansions: any[] = Array(25); // must be the same with the number of rows in a page
	expanded: boolean = false;
	firstFetched: boolean;

	limit: number = 25; // maximum rows in one page
	pages: number[] = []; // page numbers
	isLoading: boolean = false;

	/* Codemirror configuration
	*/
	codemirrorConfig = 	{ 	mode: "asterix",
												//lineNumbers: true,
												lineWrapping: true,
												showCursorWhenSelecting: true
											}	;

			//								INSERT INTO ChirpUsers
	// ([
	// {"screenName":"NathanGiesen@211","lang":"en","friendsCount":18,"statusesCount":473,"name":"Nathan Giesen","followersCount":49416},
	// {"screenName":"ColineGeyer@63","lang":"en","friendsCount":121,"statusesCount":362,"name":"Coline Geyer","followersCount":17159},
	// {"screenName":"NilaMilliron_tw","lang":"en","friendsCount":445,"statusesCount":164,"name":"Nila Milliron","followersCount":22649},
	// {"screenName":"ChangEwing_573","lang":"en","friendsCount":182,"statusesCount":394,"name":"Chang Ewing","followersCount":32136}
	// ]);

	//queryString = "USE TinySocial; INSERT INTO ChirpUsers ({'screenName':'NathanGiesen@211', 'lang':'en', 'friendsCount':18, 'statusesCount':473, 'name':'Nathan Giesen', 'followersCount':49416});";

	//queryString2 = "USE TinySocial; SELECT VALUE screenName FROM ChirpUsers;"
	//printjob = "print-job=true"

	loaded$: Observable<any>

	nodes = [];
	preData: any[];

	constructor(private store: Store<any>) {
		this.loaded$ = this.store.select('sqlQuery');
		this.store.select("sqlQuery").subscribe((data: any) => {

			this.treeOpen = false;
			this.rootClass = "root-closed";
			this.leafList = "leaf-list-closed";

      //console.log(data.sqlQueryResult.results)
      this.data = undefined;
  		this.cols = [];
  		this.query_message = "";
      //if (result.status != "success"){
  		//	this.query_message = result.errors
  		//	return;
  		//}
  		this.preData = data.sqlQueryResult.results;
			this.allData = [];

			if (this.preData) {
  			this.pages = [];
  			// generate page numbers
	  		//for (let i = 0 ; i < this.allData.length / this.limit; i ++){
				for (let i = 0 ; i < this.preData.length; i ++){
					this.getKeys(this.preData[i])
					this.allData.push(this.nodes)
				}
			}
	  		//	this.pages.push(i + 1);
	  		//}

  			// Detect what kind of data it is array or JSON Object





				//for ( var i = 0; i < labels.length; i++ ) {
	  		//	this.cols.push(labels[i]);
	  		//}

	  		//this.getPageData(1);
			//}

  		this.isLoading = false;
      });
	}


	 getKeys(obj: Object) {
		this.nodes = []
		function get_internal(obj, nodes) {
  		var keys = Object.keys(obj);
  		var k_l = keys.length;
  		var value, key;
  		for (var i = 0; i < k_l; i++) {
	    	key = keys[i];
	    	value = obj[key];
	    	if (value instanceof Object) {
	      	get_internal(value, nodes);
	    	}
				else {
					var node = { 'key': '', 'value': ''}
					node.key = key;
					node.value = value;
					nodes.push(node)
				}
  		}
  	}
  	get_internal(obj, this.nodes);
	}


	/**
	 * when click the page number, slice this.allData into this.data
	 */
	getPageData(pageNum: number){
		this.data = []
		const offset = this.limit * (pageNum - 1);
		const limit = offset + this.limit;
		this.data = this.allData.slice(offset, limit);
	}

	/**
	 * click cell
	 * row : selected row index
	 * col : selected col indexj
	 */
	expandCell(row:number, col:number, off: boolean):void{
		if (off){
			this.expansions[row] = null;
			return;
		}

		const clickedData = this.data[row];
		const clickedColumn = this.cols[col];

		// if user clicked same cell
		if (this.expansions[row] == clickedData[clickedColumn]) {
			this.expansions[row] = null;
			return;
		}

		this.expansions[row] = clickedData[clickedColumn];
	}

	/**
	 * expand all
	 */
	expandAll(col: string): void{
		// if already expanded
		if (this.expanded){
			// make expansions array empty
			for (let i = 0 ; i < this.data.length; i++){
				this.expansions[i] = null;
			}
			this.expanded= false;
			return;
		}

		// expand all
		this.expanded= true;
		for (let i = 0 ; i < this.data.length; i++){
			this.expansions[i] = this.data[i][col];
		}
	}

	/*
	*
	*/
	ngOnInit(): void {
	}

  toggleTree(): void {
		if (this.treeOpen) {
			this.treeOpen = false;
			this.rootClass = "root-closed";
			this.leafList = "leaf-list-closed";
		}
		else {
			this.treeOpen = true;
			this.rootClass = "root-open";
			this.leafList = "leaf-list-open";
		}
  }
}
