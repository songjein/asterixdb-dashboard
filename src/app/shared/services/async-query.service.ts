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
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

/*
* SQL query service using AsterixDB REST API /query/service
*/
@Injectable()
export class SQLService {

	/*
	* SQLQueryService constructor using
	* HttpClient from Angular 4
	*/
	constructor(private http: HttpClient) {}

 	/*
 	* sends a select sql++ query to return all the dataverses
	* from AsterixDB Metadata
 	*/
  selectDataverses() : Observable<any[]> {
		 let query = "SELECT VALUE dv FROM Metadata.`Dataverse` dv"
		 return this.executeSQLQuery(query);
  }

	/*
	* sends a select sql++ query to return all the datasets
	* from AsterixDB Metadata
	*/
  selectDatasets() : Observable<any[]> {
		  let query = "SELECT VALUE ds FROM Metadata.`Dataset` ds"
			return this.executeSQLQuery(query);
  }

	/*
	* sends a select sql++ query to return all the datatypes
	* from AsterixDB Metadata
	*/
  selectDatatypes() : Observable<any[]> {
     let query = "SELECT VALUE dt FROM Metadata.`Datatype` dt"
		 return this.executeSQLQuery(query);
  }

	/*
	* sends a select sql++ query to return all the indexes
	* from AsterixDB Metadata
	*/
  selectIndexes() : Observable<any[]> {
     let query = "SELECT VALUE ix FROM Metadata.`Index` ix"
		 return this.executeSQLQuery(query);
  }

	/*
	* Executes a sql++ query against AsterixDB
	* response is a JSON object with following structure:
		  metrics: Metrics;
		  requestId: string;
		  results: any[];
		  signature: string;
		  status: string;
	*/
	executeSQLQuery(query: string): Observable<any[]> {
		const apiUrl = '/query-service';
		return this.http.post(apiUrl, {statement: query})
			.map((response: Response) => { return response })
			.catch((error: any) => this.handleExecuteQueryError(error));
	}

	/*
	* AsterixDB query-service API raises HTTP errors if the sql++ query has some
	* syntax error, or some elements in the query are not found
	* this function extract the error JSON object with the relevant information
		response is a JSON object with following structure:
		  metrics: Metrics;
		  requestId: string;
		  errors: any[];
		  signature: string;
		  status: string;
	*/
	private handleExecuteQueryError(error: any): Promise<any> {
		return Promise.reject(error.error || error);
	}
}
